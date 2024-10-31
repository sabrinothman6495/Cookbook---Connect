import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', credentials);
            login(response.data); // Assuming the response contains user data and token
            navigate('/profile'); // Redirect to profile after login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                value={credentials.username} 
                onChange={handleChange} 
                placeholder="Username" 
            />
            <input 
                type="password" 
                name="password" 
                value={credentials.password} 
                onChange={handleChange} 
                placeholder="Password" 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;






