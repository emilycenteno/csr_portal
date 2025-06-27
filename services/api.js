const protocol = 'http';
const host = 'localhost';
const port = '4000';
const path = 'users'

const url = `${protocol}://${host}:${port}/${path}`;

// Updates customer data with new data via PUT request - edit user info, add/remove cars, etc.
export async function updateUserInfo(data, customer) {
    const res = await fetch(`${url}/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res;
};

export async function getUser(customerId) {
    const res = await fetch(`${url}/${customerId}`);
    if (!res.ok) {
        throw new Response('Not Found', { status: res.status });
    }

    const user = await res.json();
    return user;
}

// Fetches and returns customer data based on id
export async function customerLoader({ params }) {
    const res = await fetch(`${url}/${params.userId}`);

    if (!res.ok) {
        throw new Response('Not Found', { status: res.status });
    }

    const user = await res.json();
    return user;
}

// Fetches all customer data from the API
export async function allCustomersLoader() {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Response('Failed to load users', { status: res.status });
    }
    const data = await res.json();
    return data;
}

// Deletes a customer by id via DELETE request
export async function deleteUser(customer) {
    const res = await fetch(`${url}/${customer.id}`, {
        method: 'DELETE',
    });

    return res;
};