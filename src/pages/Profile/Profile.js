import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
    const { profile } = useContext(AuthContext);
    return (
        <div className="body">
            <Menu />
            <div className="principal">
                Cosas del profile
            </div>

        </div>
    )
}

export default Profile