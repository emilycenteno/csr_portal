
import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Chip, Stack, Button,

} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import PaymentInfoCard from '../components/customer/billing/PaymentInfoCard';
import CustomerInfoCard from '../components/customer/contact/CustomerInfoCard';
import VehiclesCard from '../components/customer/vehicles/VehiclesCard';
import TicketCard from '../components/customer/overview/TicketCard';
import ActivityCard from '../components/customer/billing/ActivityCard';
import DeleteUserModal from '../components/customer/overview/DeleteUserModal';
import { deleteUser } from '../../services/api';

export default function CustomerOverviewPage() {
    const customer = useLoaderData();
    const navigate = useNavigate();

    const [activeCustomer, setActiveCustomer] = useState(customer);
    const [isDeleteUserOpen, setDeleteUserOpen] = useState(false);

    const handleUserDeletion = async () => {
        const res = await deleteUser(activeCustomer);
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

    const statusDisplay = () => {
        let chipColor = '';
        if (activeCustomer.account_status === 'Active') {
            chipColor = 'success.main'
        }
        else if (activeCustomer.account_status === 'Inactive') {
            chipColor = 'grey.500'
        }
        else {
            chipColor = 'error.main'
        }
        return chipColor;
    };

    const openTickets = activeCustomer.tickets.filter((ticket) => ticket.ticket_status !== 'Resolved');

    return (
        <>
            <Box sx={{ mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Typography sx={{ ml: 2 }} align='left' variant="h4">{activeCustomer.first_name + ' ' + activeCustomer.last_name}</Typography>
                    <Chip
                        label=<b>{activeCustomer.account_status}</b>
                        size="small"
                        sx={{
                            bgcolor: statusDisplay(activeCustomer),
                            color: 'white',
                            borderRadius: '8px',
                        }}
                    /> {
                        openTickets.length > 0 && <Chip
                            label=<b>Open Tickets</b>
                            size="small"
                            sx={{
                                bgcolor: 'secondary.main',
                                color: 'white',
                                borderRadius: '8px',
                            }}
                        />
                    }
                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="warning" onClick={() => setDeleteUserOpen(true)
                    } >
                        <DeleteOutlinedIcon />
                        DELETE USER
                    </Button>

                </Stack>
            </Box >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr', // Left side is wider
                    gap: 4,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <CustomerInfoCard key={activeCustomer?.id} activeCustomer={activeCustomer} setActiveCustomer={setActiveCustomer} />
                    <VehiclesCard key={activeCustomer?.id} activeCustomer={activeCustomer} setActiveCustomer={setActiveCustomer} />
                    <PaymentInfoCard creditCard={activeCustomer.credit_card} activeCustomer={activeCustomer} />

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {
                        activeCustomer.tickets.length > 0 && <TicketCard customer={activeCustomer} />
                    }                    <ActivityCard transactions={activeCustomer.transaction_history} />

                </Box>
            </Box>
            {
                isDeleteUserOpen && < DeleteUserModal
                    open={isDeleteUserOpen}
                    onClose={() => setDeleteUserOpen(false)}
                    initialData={activeCustomer}
                    onSubmit={handleUserDeletion} />
            }

        </>
    );
}
