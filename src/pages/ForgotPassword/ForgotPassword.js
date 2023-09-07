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
            <div className="containerForgot" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20%', padding: '3%', width: 'auto', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)' }}>
                <h4>Please indicate your email and we will send you an email with the password recovery procedure.</h4>
                <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <input
                        className='inputForgot'
                        type="email"
                        placeholder="Insert your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn" style={{ margin: '2%' }} type="submit">Submit</button>
                    <button className="btn" style={{ backgroundColor: 'red' }}
                        onClick={() => {
                            navigate(`/`);
                        }}
                    >Exit</button>
                </form>

            </div>
        </div >
    );
};

export default ForgotPasswordPopup;
