import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import Logout from '../../images/logout.png'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import explore from '../../images/explore.png'
import share from '../../images/share.png'
import profile from '../../images/profile.png'



const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();


    return (
        <div className="navGame">
            <div id="title">Sharing <span className="me">Me</span></div>
            <div className={`navitems ${isOpen && "open"}`}>
                <button onClick={() => { navigate("/Profile") }}> <div id="imgBoton"><img src={profile} alt="profile" className="img" /> <span className="text">Profile</span></div></button>
                <button onClick={() => { navigate("/Share") }}><div id="imgBoton"><img src={share} alt="share" className="img" /> <span className="text">Share</span></div></button>
                <button onClick={() => { navigate("/Explore") }}><div id="imgBoton"><img src={explore} alt="explore" className="img" /> <span className="text">Explore</span></div></button>
                <button onClick={() => { navigate("/") }}><div id="imgBoton"><img src={Logout} alt="logout" className="img" onClick={logout} /> <span className="text">LogOut</span></div></button>
            </div>
            <div className="fondoNavToggle">
                <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

    );
};

export default Menu;
