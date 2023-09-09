import React from 'react';
import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

    const getMyProfile = async () => {
        // if (!window.localStorage.getItem('token')) {
        //     return navigate('/')
        // };
        try {
            const response = await axios.get(`${URLBACKEND}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            setProfile(response.data);
            return response.data.userName

        } catch (error) {
            return navigate('/')
        };

    };

    const login = async (password, email) => {
        const response = await axios.post(`${URLBACKEND}/users/login`, {
            password: password,
            email: email,
        });
        window.localStorage.setItem('token', response.data.token)
        if (response.status === 200) {
            return await getMyProfile()
        }
    }

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