import React from 'react';
import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    console.log('soy profile', profile)
    const [reload, setReload] = useState(false);

    const getMyProfile = async () => {
        if (!window.localStorage.getItem('token')) {
            return navigate('/')
        };
        try {
            const response = await axios.get("http://localhost:3001/users/me", {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            console.log('vengo del backend', response.data)
            setProfile(response.data);
            console.log('getmy', response.data.userName)
            return response.data.userName

        } catch (error) {
            return navigate('/')
        };

    };

    const login = async (password, email) => {
        // try {

        const response = await axios.post("http://localhost:3001/users/login", {
            password: password,
            email: email,
        });
        window.localStorage.setItem('token', response.data.token)
        if (response.status === 200) {
            return await getMyProfile()
        }
    }
    // catch (error) {
    //     console.log("error al hacer login", error);
    //     console.log('pruebas de error', error.response.data)
    //     toast.error(error.response.data, { autoClose: 5000 });
    // }
    // };

    const logout = async () => {
        window.localStorage.removeItem('token');
    }

    useEffect(() => {
        getMyProfile()
    }, [reload]);

    return (

        <AuthContext.Provider value={{ profile, login, getMyProfile, setReload, reload, logout }}>{children}</AuthContext.Provider>

    )
};