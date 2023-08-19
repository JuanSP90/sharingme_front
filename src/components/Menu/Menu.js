import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Logout from '../../images/logout.png'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import explore from '../../images/explore.png'
import share from '../../images/share.png'
import profileFoto from '../../images/profile.png'



const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, profile } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className="navGame">
            <div className="divMenuP">
                <div id="title">Sharing <span className="me">Me</span></div>
                <div className={`navitems ${isOpen && "open"}`}>
                    <button onClick={() => { navigate(`/user/${profile.userName}`) }}> <div id="imgBoton"><img src={profileFoto} alt="profile" className="img" /> <span className="text">Profile</span></div></button>
                    <button onClick={() => { navigate("/Share") }}><div id="imgBoton"><img src={share} alt="share" className="img" /> <span className="text">Share</span></div></button>
                    <button onClick={() => { navigate("/Explore") }}><div id="imgBoton"><img src={explore} alt="explore" className="img" /> <span className="text">Explore</span></div></button>
                    <button onClick={() => { navigate("/") }}><div id="imgBoton" onClick={logout}><img src={Logout} alt="logout" className="img" /> <span className="text" >LogOut</span></div></button>
                </div>
            </div>
            <div className="fondoNavToggle">
                <div
                    className={`navtoggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

    );
};

export default Menu;
