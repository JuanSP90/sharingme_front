import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);

    const { login, reload, setReload } = React.useContext(AuthContext);

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setEmailError(!isValidEmail(inputValue));
    };

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value
        setPassword(inputValue);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!isValidEmail(email)) {
            console.log('Email incorrecto');
            return;
        }

        login(password, email);
        navigate("/Profile");
    };



    return (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: 1, backgroundColor: `green`, padding: '16px', borderRadius: '50%' }}>

            </div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} noValidate style={{ marginTop: 1 }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                        className={emailError ? 'error-underline' : ''}
                    />
                    {emailError && <span className="error-text">Email incorrecto</span>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" style={{ backgroundColor: 'green', color: '#fff', padding: '8px 16px' }}>
                    Log In
                </button>
                <div>
                    <a href="#">Forgot password?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
