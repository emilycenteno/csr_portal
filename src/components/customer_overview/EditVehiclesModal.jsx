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


export default function EditVehiclesModal({ initialData, onClose, onSubmit }) {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData,
    });

    const submitHandler = data => {
        onSubmit(data);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Vehicle Information</DialogTitle>
            <DialogContent>
                <form id="edit-vehicles-form" onSubmit={handleSubmit(submitHandler)}>
                            <Typography>
                                Edit Vehicle
                            </Typography>
                            <TextField
                                label="Make"
                                {...register('make', { required: true })}
                                error={!!errors.make}
                                helperText={errors.make && 'Vehicle make is required'}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Model" 
                                {...register('model', { required : true })}
                                error={!!errors.make}
                                helperText={errors.make && 'Vehicle make is required'}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Year"
                                {...register('year', { required: true })}
                                error={!!errors.make}
                                helperText={errors.make && 'Vehicle make is required'}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="VIN"
                                {...register('vin', { required: false })}
                                fullWidth
                                margin="dense"
                            />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="edit-vehicles-form">Save</Button>
            </DialogActions>
        </Dialog>
    );
}