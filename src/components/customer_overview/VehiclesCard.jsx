import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
} from '@mui/material';

export default function VehiclesCard({ customer, onEdit }) {
    return (
        <Card>
            <CardHeader
                title="Vehicles on file"
            />
            <CardActions>
            </CardActions>
            {customer?.cars?.map((car, index) => (<CarInfo key={index} car={car} onEdit={() => onEdit(index)}/>))}
            <CardContent>
            </CardContent>

        </Card>
    );
}

function CarInfo({ car, onEdit }) {
    return (<>
        <Button size="small" onClick={onEdit}>Edit</Button>
        <Typography align='left' variant="body1" component="div">
            <b>Car Make:</b> {car.make} <br />
            <b>Car Model:</b> {car.model} <br />
            <b>Car Year:</b> {car.year} <br />
            <b>Car Vin: </b> {car.vin} <br />
            <br />
        </Typography>
    </>
    )
}