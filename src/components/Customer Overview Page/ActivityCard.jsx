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

export default function ActivityCard({ transactions }) {
    return (
        <Card sx={{ minHeight: 374 }}>
            <CardHeader
                title="Transaction History"
            />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Activity</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Payment Method</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.date}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell  sx = {{fontStyle: 'italic'}}>{transaction.name}</TableCell>
                                    <TableCell>{transaction.payment_amount}</TableCell>
                                    <TableCell>{transaction.payment_location}</TableCell>
                                    <TableCell sx = {{fontStyle: 'italic'}}>{transaction.payment_method}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}