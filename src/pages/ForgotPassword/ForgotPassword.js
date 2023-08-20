import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title'

const ForgotPasswordPopup = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${URLBACKEND}/users/forgotPassword/`, {
                email: email
            });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="divPopPrincipal">
            <Title />
            <div className="containerForgot">
                <h4>Por favor indique su email y le enviaremos un correo con el procedimiento de recuperación de contraseña.</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        className='inputForgot'
                        type="email"
                        placeholder="Ingrese su email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn" style={{ margin: '20px' }} type="submit">Enviar</button>
                </form>
                <button className="btn" style={{ backgroundColor: 'red' }}
                    onClick={() => {
                        navigate(`/`);
                    }}
                >Exit</button>
            </div>
        </div >
    );
};

export default ForgotPasswordPopup;
