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
import Paper from '@mui/material/Paper';

export default function TicketCard({ tickets }) {
    return (
        <Card sx={{ minHeight: 374 }}>
            <CardHeader
                title="Tickets"
            />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.RefID}>
                                    <TableCell>{ticket.RefID}</TableCell>
                                    <TableCell>{ticket.Title}</TableCell>
                                    <TableCell>{ticket.Status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}