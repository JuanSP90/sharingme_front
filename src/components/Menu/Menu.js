import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import Logout from '../../images/logout.png'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';



const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    return (
        <div className="navGame">
            <div className="title">Sharing <span className="me">Me</span></div>
            <div className={`navitems ${isOpen && "open"}`}>
                <Link to={'/Profile'}>Profile</Link>
                <Link to={'/Share'}>Share</Link>
                <Link to={'/Explore'}>Explore</Link>
                <img src={Logout} alt="logout" className="logout" onClick={logout} />
            </div>
            <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Menu;
