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
import { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditContactModal from '../contact/EditContactModal';
import { updateUserInfo } from '../../../../services/api';
import { getUser } from '../../../../services/api';


const CustomerInfoCard = ({ activeCustomer, setActiveCustomer }) => {

    const [isContactModalOpen, setContactModalOpen] = useState(false);

    const refreshUser = async () => {
        const newCustomerData = await getUser(activeCustomer.id);
        console.log(newCustomerData)
        setActiveCustomer(newCustomerData);
    }

    const handleSubmit = async (data) => {
        const res = await updateUserInfo(data, activeCustomer)

        if (res.ok) {
            setContactModalOpen(false);
            await refreshUser();
        } else {
            alert('Update failed');
            setContactModalOpen(false);
        }
    };



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

    return (
        <>
            <Card sx={{ minHeight: 374 }}>
                <CardHeader
                    title="Contact Information"
                    action={
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => setContactModalOpen(true)}
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
                            <Typography align='left' sx={{ fontWeight: 500 }}>{activeCustomer?.first_name + ' ' + activeCustomer?.last_name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Phone:</Typography>
                            <Typography align='left' sx={{ fontWeight: 500 }}>{activeCustomer?.phone_number}</Typography>
                        </Box><Box sx={{ display: 'flex', mb: 1 }}>
                            <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Email:</Typography>
                            <Typography align='left' sx={{ fontWeight: 500 }}>{activeCustomer?.email}</Typography>
                        </Box>
                        <Address address={activeCustomer?.address} />
                    </Box>


                </CardContent>
            </Card>
            {
                isContactModalOpen && <EditContactModal
                    open={isContactModalOpen}
                    onClose={() => setContactModalOpen(false)}
                    initialData={activeCustomer}
                    onSubmit={handleSubmit}
                />
            }

        </>
    );
}

export default CustomerInfoCard;