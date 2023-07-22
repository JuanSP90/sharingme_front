import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Explore.css'


const Explore = () => {
    return (
        <div>
            <Menu />
            <div>Explore</div>

        </div>
    )
}

export default Explore