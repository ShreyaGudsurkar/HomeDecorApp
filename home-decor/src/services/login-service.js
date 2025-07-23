export function loginUser(credentials) {
    return fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then(async res => {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    });
}

export function registerUser(userData) {
    return fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    }).then(res => {
        if (!res.ok) throw new Error();
        return res.json().catch(() => ({}));
    });
}
