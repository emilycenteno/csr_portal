import CustomerInfoCard from './CustomerInfoCard';
import VehiclesCard from './VehiclesCard'
import TicketCard from './TicketCard'
import ticketData from '../../tests/faux_ticket_data.json'
import transactionData from '../../tests/mock_activity_data.json'
import { Grid } from "@mui/material"
import ActivityCard from './ActivityCard';
import { useLoaderData } from 'react-router-dom';

export default function CustomerOverviewPage() {
    const customer = useLoaderData(); 
    return (
        <Grid container spacing={2} >
            <Grid item size={{ xs: 6, md: 5 }}>
                <CustomerInfoCard key={customer.id} customer={customer} />
            </Grid>
            <Grid item size={{ xs: 6, md: 7 }}>
                <TicketCard tickets={ticketData} />
            </Grid>
            <Grid item size={{ xs: 6, md: 5 }}>
                <VehiclesCard key={customer.id} customer={customer} />
            </Grid>
            <Grid item size={{ xs: 6, md: 7 }}>
                <ActivityCard transactions={transactionData} />
            </Grid>

        </Grid>
    );
}