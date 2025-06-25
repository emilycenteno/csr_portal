import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
} from '@mui/material';

export default function VehiclesCard({ customer }) {
    return (
        <Card>
            <CardHeader
                title="Vehicles on file"
            />
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
                {customer.cars.map((car, index) => ( <CarInfo key = {index} car = {car}/>))}
            <CardContent>
            </CardContent>

        </Card>
    );
}

function CarInfo({ car }) {
    return (
        <Typography align = 'left' variant="body1" component="div">
            <b>Car Make:</b> {car.make} <br />
            <b>Car Model:</b> {car.model} <br />
            <b>Car Year:</b> {car.year} <br />
            <b>Car Vin: </b> {car.vin} <br />
            <br /> 
        </Typography>
    )
}