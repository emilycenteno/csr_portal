import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api';

export default function DeleteCarModal({ carKey, open, onClose, initialData, setDeleteCarModalState }) {
    const navigate = useNavigate();
    const onSubmit = async () => {
        let newCars = initialData.cars.filter((_, index) => index !== carKey);

        let newCustomer = {
            ...initialData,
            cars: newCars
        };

        const res = await updateUserInfo(newCustomer, initialData);

        if (res.ok) {
            setDeleteCarModalState(false);
            navigate(0);
            
        } else {
            alert('Deletion failed');
            setDeleteCarModalState(false);
            navigate(0);
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