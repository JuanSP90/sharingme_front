import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Share.css'
import QRCode from "react-qr-code";


const Share = () => {
    const { profile } = useContext(AuthContext);
    // poner un boton de submit y un input donde poner el userName, que te navege hasta él
    return (
        <div>
            <Menu />
            <div>Share</div>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: "60vw", width: "60vw" }}>
                <QRCode
                    // size={256}
                    // style={{ height: "auto", maxWidth: "80%", width: "80%" }}
                    value={`http://localhost:3001/users/${profile.userName}`}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    )
}

export default Share