import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FiLock, FiUser, FiLogIn } from 'react-icons/fi';
import './Admin.css';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { verifyAdmin } = useData();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (verifyAdmin(credentials.username, credentials.password)) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-icon">
                        <FiLock />
                    </div>
                    <h1>Admin Login</h1>
                    <p>Enter your credentials to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-icon">
                            <FiUser />
                            <input
                                type="text"
                                className="form-input"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-icon">
                            <FiLock />
                            <input
                                type="password"
                                className="form-input"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg login-btn">
                        <FiLogIn /> Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
