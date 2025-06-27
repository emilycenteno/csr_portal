import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../../../api';
import { useNavigate } from 'react-router-dom';

const EditPaymentModal = ({ open, initialData, onClose, setPaymentModalState }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData.credit_card
    });

    const submitHandler = async (data) => {
        const newData = {
            ...initialData,
            credit_card: {
                ...data
            }
        }
        const res = await updateUserInfo(newData, initialData)

        if (res.ok) {
            setPaymentModalState(false);
            navigate(0);
            // navigate(0); // Todo: replace with proper state handling 
        } else {
            alert('Update failed');
            setPaymentModalState(false);
            navigate(0);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Payment Information</DialogTitle>
            <DialogContent>
                <form id="edit-payment-form" onSubmit={handleSubmit(submitHandler)}>
                    <Typography>
                        Edit Payment Information
                    </Typography>
                    <TextField
                        label="Credit Card Number"
                        {...register('number', { required: true })}
                        error={!!errors.number}
                        helperText={errors.number && 'A credit card number is required.'}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Card Type"
                        {...register('type', { required: true })}
                        error={!!errors.type}
                        helperText={errors.type && 'Type of credit card is required.'}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Billing Zip Code"
                        {...register('zip', { required: true })}
                        error={!!errors.zip}
                        helperText={errors.zip && 'Billing zip code is required.'}
                        fullWidth
                        margin="dense"
                    />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="edit-payment-form">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditPaymentModal;