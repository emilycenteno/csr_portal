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


export default function TicketsList({ tickets }) {
    return (
        <Card>
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