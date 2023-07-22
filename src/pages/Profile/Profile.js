import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Profile.css'

const Profile = () => {
    const { profile } = useContext(AuthContext);
    return (
        <div id="body">
            <Menu />
            <div className="principal">
                Cosas del profile
            </div>

        </div>
    )
}

export default Profile