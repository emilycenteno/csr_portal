import customerData from '../tests/MOCK_DATA.json';



export default function CustomerCard({ customer }) {
    console.log(customerData);

    return (
        <div className="customer">
            <h2>{customer.last_name + ', ' + customer.first_name}</h2>
            <h3>Contact Info:</h3>
            <p><b>Email:</b> {customer.email}</p>
            <p><b>Phone number:</b> {customer.phone_number}</p>
            <h3>Address:</h3>
            <Address address={customer.address} />
            <h3>Cars</h3>
            {customer.cars.map((car, index) => (<CarInfo key = {index} car = {car} />))}
            <h3>Payment Info</h3>
            <PaymentInfo creditCard={customer.credit_card} />
            
        </div>
    )
}

function Address({ address }) {
    return (
            <p>
                {address.street} < br />
                {address.line_2 ? address.line_2 : null } 
                {address.line_2 && < br />}
                {address.city + ' ' + address.state + ', ' + address.postal_code}
            </p>
    )
}
function CarInfo({car}) {
    return (
        <p>
            <b>Car Make:</b> {car.make} <br />
            <b>Car Model:</b> {car.model} <br />
            <b>Car Year:</b> {car.year} <br />
            <b>Car Vin: </b> {car.vin} <br />
        </p>
    )
}
function PaymentInfo({creditCard}) {
    return (
        <p>
            <b>Card Type:</b> {creditCard.type} <br />
            <b>Card Number: </b> {creditCard.number} <br />
            <b>Billing Zip: </b> {creditCard.zip}
        </p>
    )
}