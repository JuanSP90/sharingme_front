import React, { useState, useContext } from 'react'
import './ProfileUpdate.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'

//aqui voy a hacer la configuracion del usuario
const ProfileUpdate = () => {
    const [location, setLocation] = useState(null);
    const { profile, reload, setReload } = useContext(AuthContext);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleGetLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setLocation(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error.message);
                }
            );
        } else {
            console.error('La geolocalización no está soportada en este navegador.');
        }

        try {

            await axios.patch('http://localhost:3001/users/updateUser', { geolocation: location }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }

            })

            toast.success('Localizacion cambiada con exito', {
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
            console.log('soy location', location)

        } catch (error) {

            console.error('Error al actualizar la ubicacion', error);
            toast.error(`Error al actualizar la ubicacion`, {
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

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setEmailError(!isValidEmail(inputValue)); // Actualizar el estado de error del email
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
                <label>Username:</label>
                <input type="text" value={username} onChange={handleUsernameChange} />
                <button onClick={NameChange}>Submit Username</button>
            </div>

            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange} />
                <button onClick={EmailChange}>Submit Email</button>
            </div>

            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <button onClick={PasswordChange}>Submit Password</button>
            </div>

            <div>
                <label>Location:</label>
                <button onClick={handleGetLocation}>Get Location</button>
                {location && (
                    <div>
                        <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.longitude}</p>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfileUpdate