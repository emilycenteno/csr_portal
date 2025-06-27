import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
    IconButton,
    Collapse,
    Stack,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import EditPaymentModal from '../billing/EditPaymentModal';

const PaymentInfoCard = ({ activeCustomer, creditCard }) => {
    const [expand, setExpand] = useState();
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader
                    title="Payment Method Details"
                    action={
                        <IconButton onClick={() => setExpand(!expand)}>
                            <ArrowDropDown />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Collapse in={expand}>
                        <Box sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Provider:</Typography>
                                <Typography align='left' sx={{ fontWeight: 500 }}>{creditCard?.type}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Number:</Typography>
                                <Typography align='left' sx={{ fontWeight: 500 }}>{creditCard?.number}</Typography>
                            </Box><Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Billing Zip:</Typography>
                                <Typography align='left' sx={{ fontWeight: 500 }}>{creditCard?.zip}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>

                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onClick={() => { setPaymentModalOpen(true) }}
                                    sx={{
                                        minWidth: 'unset',
                                        px: 0.75,
                                        py: 0.5,
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>

            {
                isPaymentModalOpen && < EditPaymentModal
                    open={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)}
                    initialData={activeCustomer}
                    setPaymentModalState={setPaymentModalOpen} />

            }
        </>
    );
}

export default PaymentInfoCard;