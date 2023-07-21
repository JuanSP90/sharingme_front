
import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';


const Register = () => {
    const navigate = useNavigate();
    const { login } = React.useContext(AuthContext);
    const [emailError, setEmailError] = React.useState(false); // Estado para controlar el error de email

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (emailError) {
            return; // No enviar el formulario si el email es inválido
        }
        const data = new FormData(event.currentTarget);
        const newUser = {
            userName: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
        };

        try {
            await axios.post("http://localhost:3001/users", newUser);
            login(newUser.password, newUser.email);
            navigate("/Profile");
        } catch (error) {
            console.log("error al registrarme", error);
        }
    };

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmailError(!isValidEmail(inputValue)); // Actualizar el estado de error del email
    };

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    return (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: 1, backgroundColor: 'green', padding: '16px', borderRadius: '50%' }}>
            </div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} noValidate style={{ marginTop: 3 }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="firstName">User Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="userName"
                        autoComplete="given-name"
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
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
                        autoComplete="new-password"
                        required
                    />
                </div>
                <button type="submit" style={{ backgroundColor: 'green', color: '#fff', padding: '8px 16px' }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;