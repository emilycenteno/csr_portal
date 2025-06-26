export async function updateUserInfo(data, customer) {
    const res = await fetch(`http://localhost:4000/users/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res;
};



export async function customerLoader({ params }) {

    const res = await fetch(`http://localhost:4000/users/${params.userId}`);

    if (!res.ok) {
        throw new Response('Not Found', { status: res.status });
    }

    const user = await res.json();
    return user;
}

export async function allCustomersLoader() {
    const res = await fetch('http://localhost:4000/users');
    if (!res.ok) {
        throw new Response('Failed to load users', { status: res.status });
    }
    const data = await res.json();
    return data;
}

export async function deleteUser(customer) {
    const res = await fetch(`http://localhost:4000/users/${customer.id}`, {
        method: 'DELETE',
    });

    return res;
};