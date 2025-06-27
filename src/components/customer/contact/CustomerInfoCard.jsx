import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
    Box,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomerInfoCard = ({ customer, onEdit }) => {

    const Address = ({ address }) => {
        return (
            <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Address:</Typography>
                <Typography align='left' sx={{ fontWeight: 500 }}>
                    {address?.street} < br />
                    {address?.line_2 ? address?.line_2 : null}
                    {address?.line_2 && < br />}
                    {address?.city + ' ' + address?.state + ', ' + address?.postal_code}
                </Typography>
            </Box>
        )
    }

    const PaymentInfo = ({ creditCard }) => {
        return (
            <p>
                <b>Card Type:</b> {creditCard.type} <br />
                <b>Card Number: </b> {creditCard.number} <br />
                <b>Billing Zip: </b> {creditCard.zip}
            </p>
        )
    }

    return (
        <Card sx={{ minHeight: 374 }}>
            <CardHeader
                title="Contact Information"
                action={
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={onEdit}
                        sx={{
                            minWidth: 'unset',
                            px: 0.75,
                            py: 0.5,
                            mt: 0.5,
                            mr: 0.5,
                            fontSize: '0.75rem'
                        }}
                    >
                        Edit
                    </Button>
                }
            />
            <CardContent>
                <Box sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Name:</Typography>
                        <Typography align='left' sx={{ fontWeight: 500 }}>{customer?.first_name + ' ' + customer?.last_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Phone:</Typography>
                        <Typography align='left' sx={{ fontWeight: 500 }}>{customer?.phone_number}</Typography>
                    </Box><Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Email:</Typography>
                        <Typography align='left' sx={{ fontWeight: 500 }}>{customer?.email}</Typography>
                    </Box>
                    <Address address={customer?.address} />
                </Box>


            </CardContent>

        </Card>
    );
}

export default CustomerInfoCard;