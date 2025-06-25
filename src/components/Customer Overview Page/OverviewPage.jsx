import CustomerInfoCard from './CustomerInfoCard';
import VehiclesCard from './VehiclesCard'
import TicketCard from './TicketCard'
import ticketData from '../../tests/faux_ticket_data.json'
import customerData from '../../tests/MOCK_DATA.json';
import transactionData from '../../tests/mock_activity_data.json'
import { Grid } from "@mui/material"
import ActivityCard from './ActivityCard';

export default function CustomerOverviewPage() {
    return (
        <Grid container spacing={2} >
            <Grid item size={{ xs: 6, md: 5 }}>
                <CustomerInfoCard key={customerData[0].id} customer={customerData[0]} />
            </Grid>
            <Grid item size={{ xs: 6, md: 7 }}>
                <TicketCard tickets={ticketData} />
            </Grid>
            <Grid item size={{ xs: 6, md: 4 }}>
                <VehiclesCard key={customerData[0].id} customer={customerData[0]} />
            </Grid>
            <Grid item size={{ xs: 6, md: 8 }}>
                <ActivityCard transactions={transactionData} />
            </Grid>

        </Grid>
    );
}