import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Share.css'


const Share = () => {

    // poner un boton de submit y un input donde poner el userName, que te navege hasta él
    return (
        <div>
            <Menu />
            <div>Share</div>


        </div>
    )
}

export default Share