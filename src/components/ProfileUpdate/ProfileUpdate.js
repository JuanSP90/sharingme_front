import React, { useState, useContext } from 'react'
import './ProfileUpdate.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'

const ProfileUpdate = () => {
    const { reload, setReload } = useContext(AuthContext);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setEmailError(!isValidEmail(inputValue));
    };

    const EmailChange = async () => {
        try {
            await axios.patch('http://localhost:3001/users/updateUser', { email: email }, {
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
            await axios.patch('http://localhost:3001/users/updateUser', { password: password }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })
            setReload(!reload)

            toast.success('Npmbre de usuario cambiado con exito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });

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
            await axios.patch('http://localhost:3001/users/updateUser', { userName: username }, {
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
        setReload(!reload)
    }


    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    return (
        <div>
            <div>
                <input type="text" value={username} placeholder="Insert new Username" onChange={handleUsernameChange} />
                <button className='btn'
                    style={{ height: '30px', width: 'auto', margin: '10px', }}
                    onClick={NameChange}>Submit New Username</button>
            </div>
            <div>
                <input type="text" value={email} onChange={handleEmailChange} placeholder="Insert new Email" />
                <button className='btn'
                    style={{ height: '30px', width: 'auto', margin: '10px' }}
                    onClick={EmailChange}>Submit New Email</button>
            </div>
            <div>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Insert new Password" />
                <button className='btn'
                    style={{ height: '30px', width: 'auto', margin: '10px' }}
                    onClick={PasswordChange}>Submit New Password</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfileUpdate