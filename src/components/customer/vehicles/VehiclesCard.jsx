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
import EditVehiclesModal from './EditVehiclesModal';
import TransferVehicleModal from './TransferVehicleModal';
import DeleteCarModal from './DeleteCarModal';
import AddNewVehicleModal from './AddNewVehicleModal';


import { useState } from 'react';


const CarInfo = ({ car, activeCustomer, setActiveCustomer, carKey }) => {

    const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [isTransferVehicleModalOpen, setTransferVehicleModalOpen] = useState(false);
    const [isDeleteCarModalOpen, setDeleteCarModalOpen] = useState(false);

    const openCarModalData = () => {
        setVehicleModalOpen(true);
    }

    const deleteCarModalData = () => {
        setDeleteCarModalOpen(true);

    }

    const transferCarModalData = () => {
        setTransferVehicleModalOpen(true);
    }

    return (
        <>
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
                            onClick={openCarModalData}
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
                            onClick={transferCarModalData}
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
                            onClick={deleteCarModalData}
                        >
                            Delete
                        </Button>

                    </Box>
                </Box>


            </Container>
            {
                isVehicleModalOpen && <EditVehiclesModal
                    open={isVehicleModalOpen}
                    onClose={() => setVehicleModalOpen(false)}
                    initialData={activeCustomer}
                    carKey={carKey}
                    setVehicleModalState={setVehicleModalOpen}
                />
            }
            {
                isDeleteCarModalOpen && <DeleteCarModal
                    open={isDeleteCarModalOpen}
                    onClose={() => setDeleteCarModalOpen(false)}
                    initialData={activeCustomer}
                    carKey={carKey}
                    setDeleteCarModalState={setDeleteCarModalOpen}
                    aciveCustomer={activeCustomer}
                    setActiveCustomer={setActiveCustomer}

                />
            }
            {
                isTransferVehicleModalOpen && <TransferVehicleModal
                    open={isTransferVehicleModalOpen}
                    onClose={() => setTransferVehicleModalOpen(false)}
                    initialData={activeCustomer}
                    carKey={carKey}
                    setTransferVehicleModalState={setTransferVehicleModalOpen}
                    aciveCustomer={activeCustomer}
                    setActiveCustomer={setActiveCustomer}
                />
            }
        </>
    );
}

const VehiclesCard = ({ activeCustomer, setActiveCustomer }) => {
    const [isAddNewCarModalOpen, setAddNewCarModalOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader
                    title="User Vehicles"
                    action={
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => setAddNewCarModalOpen(true)}
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
                    {activeCustomer?.cars?.map((car, index) => (
                        <>
                            <CarInfo key={index} car={car} carKey={index} activeCustomer={activeCustomer} setActiveCustomer={setActiveCustomer} />
                            <Divider />
                        </>))}
                </CardContent>
            </Card>

            {
                isAddNewCarModalOpen && <AddNewVehicleModal
                    open={isAddNewCarModalOpen}
                    onClose={() => setAddNewCarModalOpen(false)}
                    initialData={activeCustomer}
                    setAddNewVehicleState={setAddNewCarModalOpen}
                    setActiveCustomer={setActiveCustomer}
                />
            }
        </>
    );

}

export default VehiclesCard;