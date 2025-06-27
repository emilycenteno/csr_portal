import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import { Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    { id: 'last_name', label: 'Last Name', alignment: 'left', sortable: 'true' },
    { id: 'first_name', label: 'First Name', alignment: 'left', sortable: 'true' },
    { id: 'phone', label: 'Phone Number', alignment: 'left' },
    { id: 'email', label: 'Email Address', alignment: 'left', sortable: 'true' },
    { id: 'status', label: 'Status', alignment: 'center' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignment}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ py: 0.75, px: 1.5 }}

                    >
                        {headCell.sortable ? (<TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                        ) : (
                            headCell.label
                        )}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,

};

function EnhancedTableToolbar() {
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }
            ]}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h5"
                id="tableTitle"
                component="div"
            >
                User Information
            </Typography>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function UsersList({ usersData }) {
    if (!Array.isArray(usersData)) {
        return <div>Loading or no users found</div>;
    }


    const navigate = useNavigate();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(33);
    const [searchPrompt, setSearchPrompt] = React.useState('');

    const filteredCustomers = usersData.filter((customer) => {
        const query = searchPrompt.toLowerCase();
        return (
            customer.first_name.toLowerCase().includes(query) ||
            customer.last_name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.phone_number.replace(/-/g, '').includes(query.replace(/-/g, ''))
        );
    });


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersData.length) : 0;

    const visibleRows = React.useMemo(() => {
        const filtered = usersData.filter((user) => {
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

        return filtered
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [searchPrompt, usersData, order, orderBy, page, rowsPerPage]);
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
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
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            <RenderTableBody visibleRows={visibleRows}/>
                            {
                                emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[33, 66, 99]}
                    component="div"
                    count={usersData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export function RenderTableBody({visibleRows}) {
    const navigate = useNavigate();
    return visibleRows.map((row, index) => {

        const statusDisplay = () => {
            let chipColor = '';
            if (row.account_status === 'Active') {
                chipColor = 'success.main'
            }
            else if (row.account_status === 'Inactive') {
                chipColor = 'grey.500'
            }
            else {
                chipColor = 'error.main'
            }
            return chipColor;
        };

        return (
            <TableRow key={row.id}
                hover
                onClick={() => navigate(`/users/${row.id}`)}
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
                <TableCell sx={{ py: 0.75, px: 1.5 }} align="center">
                    <Chip
                        label=<b>{row.account_status}</b>
                        size="small"
                        sx={{
                            bgcolor: statusDisplay(row),
                            color: 'white',
                            borderRadius: '8px',
                            width: '64px'
                        }}
                    />
                </TableCell>


            </TableRow>
        );
    })
}
