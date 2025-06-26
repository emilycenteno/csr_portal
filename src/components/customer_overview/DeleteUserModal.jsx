import {
    Grid, Box, Typography, Chip, Stack, Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

import { useState } from 'react';


export default function DeleteUserModal({ open, initialData, onClose, onSubmit }) {
    const [verification, setVerification] = useState('');
    const fullName = `${initialData.first_name} ${initialData.last_name}`;
    const handleSubmit = () => verification === fullName ? onSubmit() : alert("ERROR!");
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Delete ${fullName}`}</DialogTitle>
            <DialogContent>
                <Typography>
                    To delete user, please type first and last name in the field below.
                </Typography>
                <TextField
                    fullWidth
                    margin="dense"
                    value={verification}
                    onChange={(e) => setVerification(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )

}