import {
    Card,
    CardContent,
    CardHeader,
} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


export default function TicketsList({ customers }) {
    const navigate = useNavigate();

    const openTickets = customers.flatMap(customer =>
        customer.tickets.filter(ticket => ticket.ticket_status !== "Resolved").map(
            ticket => ({
                ...ticket,
                customer_first_name: customer.first_name,
                customer_last_name: customer.last_name,
                customer_id: customer.id
            })
        )
    );
    return (
        <Card sx={{ mt: 2 }}>
            <CardHeader
                title="Active Tickets"
            />
            <CardContent>
                <TableContainer sx={{ width: '100%', overflowX: 'auto', p: 2 }} >
                    <Table sx={{
                        width: '100%',
                        tableLayout: 'fixed',
                    }}>
                        <TableHead>
                            <TableRow >
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Customer</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Status</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {openTickets.map((ticket) => (
                                <TableRow key={ticket.ref_id} hover
                                    onClick={() => navigate(`/users/${ticket.customer_id}`)}
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                    <TableCell >{ticket.ref_id}</TableCell>
                                    <TableCell align="left" >{`${ticket.customer_first_name} ${ticket.customer_last_name}`}</TableCell>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell align="right">{ticket.ticket_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}