import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title'

const ForgotPasswordPopup = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = 
            await axios.post('http://localhost:3001/users/forgotPassword/', {
                email: email
            });

            // console.log(response.data);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="divPopPrincipal">
            <Title />
            <div className="containerForgot">
                <h4>Porfavor indique su email y le enviaremos el procedimiento de recuperacion de contraseña</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Ingrese su email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                </form>
                <button
                    onClick={() => {
                        navigate(`/`);
                    }}
                >Exit</button>
            </div>
        </div>
    );
};

export default ForgotPasswordPopup;
