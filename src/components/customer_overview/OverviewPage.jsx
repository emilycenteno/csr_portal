import CustomerInfoCard from './CustomerInfoCard';
import EditContactModal from './EditContactModal';
import VehiclesCard from './VehiclesCard';
import TicketCard from './TicketCard';
import ticketData from '../../tests/faux_ticket_data.json';
import transactionData from '../../tests/mock_activity_data.json';
import {
    Grid, Box, Typography, Chip, Stack, Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import ActivityCard from './ActivityCard';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUser } from '../../api';
import EditVehiclesModal from './EditVehiclesModal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteUserModal from './DeleteUserModal';




export default function CustomerOverviewPage() {

    const customer = useLoaderData();
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        const res = await updateUserInfo(data, customer)

        if (res.ok) {
            setContactModalOpen(false);
            navigate(0); // Todo: replace with proper state handling 
        } else {
            alert('Update failed');
            setContactModalOpen(false);
        }
    };
    const handleDeletion = async () => {
        const res = await deleteUser(customer);
        if (res.ok) {
            setDeleteUserOpen(false); 
            alert('User has been deleted') // Change these to dialogs 
            navigate('/') // home redirect
        }
        else {
            alert('Failed to delete user'); // change these to dialogs 
            setDeleteUserOpen(false);
        }
    }


    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(-1);
    const [isDeleteUserOpen, setDeleteUserOpen] = useState(false);

    const openCarModal = (index) => {
        setVehicleModalOpen(true);
        setSelectedCar(index);
    }
    return (
        <>
            <Box sx={{ mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Typography sx={{ ml: 2 }} align='left' variant="h4">{customer.first_name + ' ' + customer.last_name}</Typography>
                    <Chip
                        label={true ? <b>Active</b> : <b>Inactive</b>}
                        size="small"
                        sx={{
                            bgcolor: true ? 'success.main' : 'error.main',
                            color: 'white',
                            borderRadius: '8px',
                        }}
                    /> {
                        true && <Chip
                            label="Open Tickets"
                            size="small"
                            sx={{
                                bgcolor: 'orange', // change this to be a mui color 
                                color: 'white',
                                borderRadius: '8px',
                            }}
                        />
                    }
                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={() => setDeleteUserOpen(true)
                    } >
                        <DeleteOutlinedIcon />
                        DELETE USER
                    </Button>


                    {/* if users have an open ticket or 
                        an account is frozen then I can put those
                        icons here too  */}
                </Stack>
            </Box >
            <Grid container spacing={2} sx={{ pt: 1 }} >
                <Grid size={{ xs: 6, md: 5 }}>
                    <CustomerInfoCard key={customer?.id} customer={customer} onEdit={() => setContactModalOpen(true)} />
                </Grid>
                <Grid size={{ xs: 6, md: 7 }}>
                    <TicketCard tickets={ticketData} />
                </Grid>
                <Grid size={{ xs: 6, md: 5 }}>
                    <VehiclesCard key={customer?.id} customer={customer} onEdit={openCarModal} />
                </Grid>
                <Grid size={{ xs: 6, md: 7 }}>
                    <ActivityCard transactions={transactionData} />
                </Grid>

            </Grid>
            {
                isContactModalOpen && <EditContactModal
                    open={isContactModalOpen}
                    onClose={() => setContactModalOpen(false)}
                    initialData={customer}
                    onSubmit={handleSubmit}
                />
            }
            {
                isVehicleModalOpen && <EditVehiclesModal
                    open={isVehicleModalOpen}
                    onClose={() => setVehicleModalOpen(false)}
                    initialData={customer.cars[selectedCar]}
                    onSubmit={handleSubmit}
                />
            }
            {
                isDeleteUserOpen && < DeleteUserModal
                    open={isDeleteUserOpen}
                    onClose={() => setDeleteUserOpen(false)}
                    initialData={customer}
                    onSubmit={handleDeletion} />
            }



        </>
    );
}
