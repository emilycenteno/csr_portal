import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { updateUserInfo } from '../../../../services/api';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { getUser } from '../../../../services/api';

const EditVehiclesModal = ({ activeCustomer, setActiveCustomer, carKey, initialData, onClose, setVehicleModalState }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData.cars[carKey],
    });

    const refreshUser = async (id) => {
        const newCustomerData = await getUser(id);
        console.log(newCustomerData)
        setActiveCustomer(newCustomerData);
    }

    const submitHandler = async (data) => {
        let newCars = [...initialData.cars];
        newCars[carKey] = data;
        let newCustomer = {
            ...initialData,
            cars: newCars
        }
        const res = await updateUserInfo(newCustomer, initialData)

        if (res.ok) {
            setVehicleModalState(false);
            await refreshUser(newCustomer.id);
        } else {
            alert('Update failed');
            setVehicleModalState(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Vehicle Information</DialogTitle>
            <DialogContent>
                <form id="edit-vehicles-form" onSubmit={handleSubmit(submitHandler)}>
                    <Controller
                        name="subscription"
                        control={control}
                        rules={{ required: 'Subscription tier is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="dense" error={!!errors.subscription}>
                                <InputLabel id="subscription-input-label">Subscription</InputLabel>
                                <Select labelId="subscription-select-label" label="Subscription" {...field}>
                                    <MenuItem value="Basic">Basic</MenuItem>
                                    <MenuItem value="Premium">Premium</MenuItem>
                                    <MenuItem value="Premium Plus">Premium Plus</MenuItem>
                                </Select>
                                <FormHelperText>{errors.subscription?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
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
                        {...register('model', { required: true })}
                        error={!!errors.make}
                        helperText={errors.make && 'Vehicle model is required'}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Year"
                        {...register('year', { required: true })}
                        error={!!errors.make}
                        helperText={errors.make && 'Vehicle year is required'}
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

export default EditVehiclesModal;