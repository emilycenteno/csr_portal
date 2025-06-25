import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
} from '@mui/material';

export default function PaymentInfoCard({ creditCard }) {
    return (
        <Card>
            <CardHeader
                title="Payment Information"
            />
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
            <CardContent>
                <Typography align='left' variant="body1" component="div">
                    <b>Card Type:</b> {creditCard.type} <br />
                    <b>Card Number: </b> {creditCard.number} <br />
                    <b>Billing Zip: </b> {creditCard.zip}
                </Typography>
            </CardContent>
        </Card>
    );
}