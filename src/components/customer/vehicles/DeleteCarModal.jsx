import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { updateUserInfo } from '../../../../services/api';

const DeleteCarModal = ({ carKey, open, onClose, initialData, setDeleteCarModalState }) => {
    const onSubmit = async () => {
        let newCars = initialData.cars.filter((_, index) => index !== carKey);

        let newCustomer = {
            ...initialData,
            cars: newCars
        };

        const res = await updateUserInfo(newCustomer, initialData);

        if (res.ok) {
            setDeleteCarModalState(false);
        } else {
            alert('Deletion failed');
            setDeleteCarModalState(false);
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Delete ${initialData.cars[carKey].year} ${initialData.cars[carKey].make} ${initialData.cars[carKey].model}?`}</DialogTitle>             <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCarModal;