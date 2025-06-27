import CustomerInfoCard from './CustomerInfoCard';
import EditContactModal from './EditContactModal';
import VehiclesCard from './VehiclesCard';
import TicketCard from './TicketCard';
import ticketData from '../../tests/faux_ticket_data.json';
import transactionData from '../../tests/mock_activity_data.json';
import {
    Box, Typography, Chip, Stack, Button,

} from "@mui/material";
import ActivityCard from './ActivityCard';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUser } from '../../api';
import EditVehiclesModal from './EditVehiclesModal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteUserModal from './DeleteUserModal';
import PaymentInfoCard from './PaymentInfoCard';
import EditPaymentModal from './EditPaymentModal';
import DeleteCarModal from './DeleteCarModal';
import TransferVehicleModal from './TransferVehicleModal';
import AddNewVehicleModal from './AddNewVehicleModal';



export default function CustomerOverviewPage() {

    const customer = useLoaderData();
    const navigate = useNavigate();


    const handleSubmit = async (data) => {
        //
        const res = await updateUserInfo(data, customer)

        if (res.ok) {
            setContactModalOpen(false);
            navigate(0); // Todo: replace with proper state handling 
        } else {
            alert('Update failed');
            setContactModalOpen(false);
        }
    };
    const handleUserDeletion = async () => {
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
    // const handleCarDeletion = async() => {
    // }


    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(-1);
    const [isDeleteUserOpen, setDeleteUserOpen] = useState(false);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [isDeleteCarModalOpen, setDeleteCarModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState(-1);
    const [carToTransfer, setCarToTransfer] = useState(-1);
    const [isTransferVehicleModalOpen, setTransferVehicleModalOpen] = useState(false);
    const [isAddNewCarModalOpen, setAddNewCarModalOpen] = useState(false);

    const openCarModalData = (index) => {
        setVehicleModalOpen(true);
        setSelectedCar(index);
    }

    const deleteCarModalData = (index) => {
        setDeleteCarModalOpen(true);
        setCarToDelete(index);

    }

    const transferCarModalData = (index) => {
        setTransferVehicleModalOpen(true);
        setCarToTransfer(index);
    }

    const statusDisplay = () => {
        let chipColor = '';
        if (customer.account_status === 'Active') {
            chipColor = 'success.main'
        }
        else if (customer.account_status === 'Inactive') {
            chipColor = 'grey.500'
        }
        else {
            chipColor = 'error.main'
        }
        return chipColor;
    };
    const openTickets = customer.tickets.filter((ticket) => ticket.ticket_status !== 'Resolved');

    return (
        <>
            <Box sx={{ mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Typography sx={{ ml: 2 }} align='left' variant="h4">{customer.first_name + ' ' + customer.last_name}</Typography>
                    <Chip
                        label=<b>{customer.account_status}</b>
                        size="small"
                        sx={{
                            bgcolor: statusDisplay(customer),
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
                    <CustomerInfoCard key={customer?.id} customer={customer} onEdit={() => setContactModalOpen(true)} />
                    <VehiclesCard key={customer?.id} customer={customer} onEdit={openCarModalData} onDelete={deleteCarModalData} onTransfer={transferCarModalData} onCreate={() => setAddNewCarModalOpen(true)} />
                    <PaymentInfoCard creditCard={customer.credit_card} onEdit={() => setPaymentModalOpen(true)} />

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {
                        customer.tickets.length > 0 && <TicketCard customer={customer} />
                    }                    <ActivityCard transactions={customer.transaction_history} />

                </Box>
            </Box>

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
                    initialData={customer}
                    carKey={selectedCar}
                    setVehicleModalState={setVehicleModalOpen}
                />
            }
            {
                isDeleteUserOpen && < DeleteUserModal
                    open={isDeleteUserOpen}
                    onClose={() => setDeleteUserOpen(false)}
                    initialData={customer}
                    onSubmit={handleUserDeletion} />
            }
            {
                isPaymentModalOpen && < EditPaymentModal
                    open={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)}
                    initialData={customer}
                    setPaymentModalState={setPaymentModalOpen} />

            }
            {
                isDeleteCarModalOpen && <DeleteCarModal
                    open={isDeleteCarModalOpen}
                    onClose={() => setDeleteCarModalOpen(false)}
                    initialData={customer}
                    carKey={carToDelete}
                    setDeleteCarModalState={setDeleteCarModalOpen} />
            }
            {
                isTransferVehicleModalOpen && <TransferVehicleModal
                    open={isTransferVehicleModalOpen}
                    onClose={() => setTransferVehicleModalOpen(false)}
                    initialData={customer}
                    carKey={carToTransfer}
                    setTransferVehicleModalState={setTransferVehicleModalOpen} />
            }
            {
                isAddNewCarModalOpen && <AddNewVehicleModal
                    open={isAddNewCarModalOpen}
                    onClose={() => setAddNewCarModalOpen(false)}
                    initialData={customer}
                    setAddNewVehicleState={setAddNewCarModalOpen} />
            }




        </>
    );
}
