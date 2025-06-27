import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    TableHead,
    Box, InputAdornment, TableContainer, Table, TableBody, TableCell, TableRow
} from '@mui/material';
import { updateUserInfo, allCustomersLoader } from '../../../../services/api';
import { useState, useEffect } from 'react';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { getUser } from '../../../../services/api';

// Do not split into seperate component - this is not used anywhere else 
const UsersTable = ({ users, setSelectedUser }) => {
    const [searchPrompt, setSearchPrompt] = React.useState('');
    const [selectedCell, setSelectedCell] = React.useState(null);

    const visibleRows = React.useMemo(() => {
        const filtered = users.filter((user) => {
            const firstName = user.first_name.toLowerCase();
            const lastName = user.last_name.toLowerCase();
            const email = user.email.toLowerCase().trim();
            const phone = user.phone_number.replace(/-/g, '').trim();
            const query = searchPrompt.toLowerCase().trim();

            return (
                firstName.includes(query) ||
                lastName.includes(query) ||
                email.includes(query) ||
                phone.startsWith(query.replace(/-/g, ''))
            );
        });

        return filtered;
    }, [searchPrompt, users]);

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <TextField
                sx={{
                    width: '95%',
                    mb: 2
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    },
                }}
                label="Search by name, email, or phone"
                variant="outlined"
                value={searchPrompt}

                onChange={(e) => setSearchPrompt(e.target.value)}
            />
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                <Table
                    sx={{
                        minWidth: 750,
                        tableLayout: 'fixed',
                        '& td, & th': {
                            px: 2,
                        },
                    }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <TableHead>
                        <TableCell>Last Name</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            return (
                                <TableRow key={row.id}
                                    selected={row.id === selectedCell}
                                    hover
                                    onClick={() => {
                                        setSelectedCell(row.id);
                                        setSelectedUser(row);
                                    }
                                    }
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' }, }}
                                >
                                    <TableCell
                                        component="th"
                                        id={index}
                                        scope="row"


                                    >
                                        {row.last_name}
                                    </TableCell>
                                    <TableCell sx={{ py: 0.75, px: 1.5 }} align="left">{row.first_name}</TableCell>
                                    <TableCell sx={{ py: 0.75, px: 1.5 }} align="left">{row.phone_number}</TableCell>
                                    <TableCell sx={{ py: 0.75, px: 1.5 }} align="left">{row.email}</TableCell>
                                </TableRow>
                            );
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}

const TransferVehicleModal = ({ open, onClose, carKey, initialData, setTransferVehicleModalState, activeCustomer, setActiveCustomer }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const refreshUser = async (id) => {
        const newCustomerData = await getUser(id);
        setActiveCustomer(newCustomerData);
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await allCustomersLoader();
                setAllUsers(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    }, []);

    const removeCar = async () => {
        let newCars = initialData.cars.filter((_, index) => index !== carKey);

        let newCustomer = {
            ...initialData,
            cars: newCars
        };

        const res = await updateUserInfo(newCustomer, initialData);
        await refreshUser(newCustomer.id);

        if (!res.ok) {
            alert('Transfer failed.');
            setTransferVehicleModalState(false);
        }
    };

    const addCar = async () => {
        let newCustomer = {
            ...selectedUser,
            cars: [
                ...selectedUser.cars,
                initialData.cars[carKey]
            ]
        };
        const res = await updateUserInfo(newCustomer, selectedUser);
        if (!res.ok) {
            alert('Transfer failed');
        }
    }

    const handleTransfer = async () => {
        addCar()
            .then(() => removeCar())
            .then(() => setTransferVehicleModalState(false))
            .catch(error => alert(error));
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '400px' } }}
        >
            <DialogTitle>{`Transfer ${initialData.cars[carKey].year} ${initialData.cars[carKey].make} ${initialData.cars[carKey].model}?`}</DialogTitle>
            <DialogContent>

                <UsersTable users={allUsers} setSelectedUser={setSelectedUser} />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    disabled={!selectedUser}
                    onClick={handleTransfer}
                >
                    Confirm Transfer
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default TransferVehicleModal;
