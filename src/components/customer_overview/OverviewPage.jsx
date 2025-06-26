import CustomerInfoCard from './CustomerInfoCard';
import EditContactModal from './EditContactModal';
import VehiclesCard from './VehiclesCard';
import TicketCard from './TicketCard';
import ticketData from '../../tests/faux_ticket_data.json';
import transactionData from '../../tests/mock_activity_data.json';
import { Grid } from "@mui/material";
import ActivityCard from './ActivityCard';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api';
import EditVehiclesModal from './EditVehiclesModal';
import PaymentInfoCard from './PaymentInfoCard';



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


    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(-1);

    const openCarModal = (index) => {
        setVehicleModalOpen(true);
        setSelectedCar(index);
    }
    return (
        <>
            <Grid container spacing={2} >
                <Grid size={{ xs: 6, md: 5 }}>
                    <CustomerInfoCard key={customer?.id} customer={customer} onEdit={() => setContactModalOpen(true)} />
                </Grid>
                {/* <Grid size={{ xs: 6, md: 7 }}>
                    <TicketCard tickets={ticketData} />
                </Grid> */}
                <Grid size={{
                    xs: 6, md: 7
                }}>
                    <PaymentInfoCard key = {customer?.id} creditCard = {customer.credit_card} />
                </Grid>
                <Grid size={{ xs: 6, md: 5 }}>
                    <VehiclesCard key={customer?.id} customer={customer} onEdit={openCarModal} />
                </Grid>
                <Grid size={{ xs: 6, md: 7 }}>
                    <ActivityCard transactions={transactionData} />
                </Grid>

            </Grid>
            {isContactModalOpen && <EditContactModal
                open={isContactModalOpen}
                onClose={() => setContactModalOpen(false)}
                initialData={customer}
                onSubmit={handleSubmit}
            />}
            {isVehicleModalOpen && <EditVehiclesModal
                open={isVehicleModalOpen}
                onClose={() => setVehicleModalOpen(false)}
                initialData={customer.cars[selectedCar]}
                onSubmit={handleSubmit}
            />}


        </>
    );
}