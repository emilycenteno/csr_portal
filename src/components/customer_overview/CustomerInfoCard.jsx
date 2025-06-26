import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
} from '@mui/material';


export default function CustomerInfoCard({ customer, onEdit }) {
    return (
        <Card sx={{ minHeight: 374 }}>
            <CardHeader
                title="Contact Information"
            />
            <CardActions>
                <Button size="small" onClick={onEdit}>Edit</Button>
            </CardActions>
            <CardContent>
                <Typography align='left' variant='body1' component="div">
                    <b>Name:</b> {customer?.first_name + ' ' + customer?.last_name}
                </Typography>
                <Typography align='left' variant='body1' component="div">
                    <b>Phone Number:</b> {customer?.phone_number}
                </Typography>
                <Typography align='left' variant='body1' component="div">
                    <b>Email:</b> {customer?.email}
                </Typography >
                < Address address={customer?.address} />
            </CardContent>

        </Card>
    );
}

function Address({ address }) {
    return (
        <Typography align='left' variant="body1" component="div">
            <b>Address:</b><br />
            {address?.street} < br />
            {address?.line_2 ? address?.line_2 : null}
            {address?.line_2 && < br />}
            {address?.city + ' ' + address?.state + ', ' + address?.postal_code}
        </Typography>
    )
}

function PaymentInfo({ creditCard }) {
    return (
        <p>
            <b>Card Type:</b> {creditCard.type} <br />
            <b>Card Number: </b> {creditCard.number} <br />
            <b>Billing Zip: </b> {creditCard.zip}
        </p>
    )
}