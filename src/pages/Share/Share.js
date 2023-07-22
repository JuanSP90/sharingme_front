import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Share.css'


const Share = () => {
    return (
        <div>
            <Menu />
            <div>Share</div>

        </div>
    )
}

export default Share