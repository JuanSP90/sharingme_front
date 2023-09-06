import React, { useState, useContext, useEffect } from 'react'
import './ProfileUpdate.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const { reload, setReload, getMyProfile } = useContext(AuthContext);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setEmailError(!isValidEmail(inputValue));
    };

    const EmailChange = async () => {
        try {
            await axios.patch(`${URLBACKEND}/users/updateUser`, { email: email }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })

            toast.success('Email cambiado con exito', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setReload(!reload)
            hideModal()

        } catch (error) {

            console.error('Error al actualizar el email', error);
            toast.error(`El email ya esta en uso`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const PasswordChange = async () => {
        try {
            await axios.patch(`${URLBACKEND}/users/updateUser`, { password: password }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })


            await toast.success('Npmbre de usuario cambiado con exito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setReload(!reload)
            hideModal()

        } catch (error) {

            console.error('Error al actualizar la contraseña', error);
            toast.error(`${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const NameChange = async () => {
        try {
            await axios.patch(`${URLBACKEND}/users/updateUser`, { userName: username }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })

            toast.success(`El nombre de usuario cambiado con exito`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate(`/user/${username}`);
            getMyProfile();
            hideModal()

        } catch (error) {
            console.error('Error al actualizar el userName', error);
            toast.error(`El nombre de usuario ya esta en uso`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }


    }


    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    return (
        <div>
            <Button onClick={showModal} style={{ backgroundColor: 'red', color: 'black', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Private User Config</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg"  >
                <Modal.Header>
                    <Modal.Title style={{ fontSize: 'larger', fontWeight: 'bold' }}>Private settings</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }}
                >
                    <div>
                        <input type="text" value={username} placeholder="Insert new Username" onChange={handleUsernameChange}
                            className='formulario2'
                        />
                        <Button className='btn'
                            style={{ height: 'auto', width: 'auto', margin: '10px', }}
                            onClick={NameChange}>Submit New Username</Button>
                    </div>

                    <div>
                        <input className='formulario2' type="text" value={email} onChange={handleEmailChange} placeholder="Insert new Email" />
                        <Button className='btn'
                            style={{ height: 'auto', width: 'auto', margin: '10px' }}
                            onClick={EmailChange}>Submit New Email </Button>
                    </div>

                    <div>
                        <input className='formulario2' type="password" value={password} onChange={handlePasswordChange} placeholder="Insert new Password" />
                        <Button className='btn'
                            style={{ height: 'auto', width: 'auto', margin: '10px' }}
                            onClick={PasswordChange}>Submit New Password</Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ height: 'auto', width: 'auto', fontWeight: 'bold', color: 'black', margin: '10px', backgroundColor: 'grey' }} onClick={hideModal}>Cancel</Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>

        </div>
    )
}

export default ProfileUpdate