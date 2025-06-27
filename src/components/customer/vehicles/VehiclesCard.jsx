import {
    Card,
    CardContent,
    Box,
    Typography,
    CardActions,
    Button,
    CardHeader,
    Container,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import SyncAltIcon from '@mui/icons-material/SyncAlt';


const CarInfo = ({ car, onEdit, onDelete, onTransfer }) => {
    return (
        <Container>
            <Box sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Car Make:</Typography>
                    <Typography align='left' sx={{ fontWeight: 500 }}>{car.make}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Car Model:</Typography>
                    <Typography align='left' sx={{ fontWeight: 500 }}>{car.model}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Car Year:</Typography>
                    <Typography align='left' sx={{ fontWeight: 500 }}>{car.year}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Car Vin:</Typography>
                    <Typography align='left' sx={{ fontWeight: 500 }}>{car.vin}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography color="text.secondary" align='left' sx={{ width: '110px' }}>Subscription:</Typography>
                    <Typography align='left' sx={{ fontWeight: 500 }}>{car.subscription}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>

                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={onEdit}
                        sx={{
                            minWidth: 'unset',
                            px: 0.75,
                            py: 0.5,
                            fontSize: '0.75rem'
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        startIcon={<SyncAltIcon />}
                        sx={{
                            minWidth: 'unset',
                            px: 0.75,
                            py: 0.5,
                            fontSize: '0.75rem'
                        }}
                        onClick={onTransfer}
                    >
                        Transfer
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        startIcon={<DeleteIcon />}
                        sx={{
                            minWidth: 'unset',
                            px: 0.75,
                            py: 0.5,
                            fontSize: '0.75rem'
                        }}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>

                </Box>
            </Box>


        </Container>
    );
}

const VehiclesCard = ({ customer, onCreate, onEdit, onDelete, onTransfer }) => {
    return (
        <Card>
            <CardHeader
                title="User Vehicles"
                action={
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={onCreate}
                        sx={{
                            minWidth: 'unset',
                            px: 0.75,
                            py: 0.5,
                            mt: 0.5,
                            mr: 0.5,
                            fontSize: '0.75rem'
                        }}
                    >
                        Add New Vehicle
                    </Button>
                }
            />
            <CardContent>
                {customer?.cars?.map((car, index) => (
                    <>
                        <CarInfo key={index} car={car} onEdit={() => onEdit(index)} onDelete={() => onDelete(index)} onTransfer={() => onTransfer(index)} />
                        <Divider />
                    </>))}
            </CardContent>
        </Card>
    );

}

export default VehiclesCard;