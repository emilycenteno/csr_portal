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
import { getUser } from '../../../../services/api';

const DeleteCarModal = ({ carKey, open, onClose, initialData, setDeleteCarModalState, activeCustomer, setActiveCustomer }) => {
    const refreshUser = async (id) => {
        const newCustomerData = await getUser(id);
        console.log(newCustomerData)
        setActiveCustomer(newCustomerData);
    }

    const onSubmit = async () => {
        let newCars = initialData.cars.filter((_, index) => index !== carKey);

        let newCustomer = {
            ...initialData,
            cars: newCars
        };

        const res = await updateUserInfo(newCustomer, initialData);

        if (res.ok) {
            setDeleteCarModalState(false);
            await refreshUser(newCustomer.id);
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