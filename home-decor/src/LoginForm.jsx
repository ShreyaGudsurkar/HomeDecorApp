import { useState } from 'react';
import { loginUser } from './services/login-service';
import './LoginForm.css'

function LoginForm({ onLoginSuccess, onClose, onRegisterClick }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials)
            .then(user => {
                onLoginSuccess(user);
                onClose();
            })
            .catch(() => setError('Invalid username or password'));
    };

    return (
        <div >
            {error && <p className="error">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="switch-link">
                Not a member?{' '}
                <button type="button" className="link-button" onClick={onRegisterClick}>
                    Register here
                </button>
            </p>
        </div>
    );
}

export default LoginForm;
