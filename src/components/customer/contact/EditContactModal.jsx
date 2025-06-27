import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { useForm } from 'react-hook-form';


const EditContactModal = ({ initialData, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const submitHandler = data => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Contact Information</DialogTitle>
      <DialogContent>
        <form id="edit-contact-form" onSubmit={handleSubmit(submitHandler)}>

          <TextField
            label="First Name"
            {...register('first_name', { required: true })}
            error={!!errors.first_name}
            helperText={errors.first_name && 'First name is required'}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            {...register('last_name')}
            fullWidth
            margin="dense"

          />
          <TextField
            label="Phone Number"
            {...register('phone_number')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Phone Email"
            {...register('email')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Street"
            {...register('address.street')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Line 2"
            {...register('address.line_2')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="City"
            {...register('address.city')}
            fullWidth
            margin="dense"

          />
          <TextField
            label="State"
            {...register('address.state')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Postal Code"
            {...register('address.postal_code')}
            fullWidth
            margin="dense"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="edit-contact-form">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditContactModal;