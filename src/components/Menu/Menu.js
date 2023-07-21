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
        // <div className="navGame">
        //     <div className="title">Sharing <span className="me">Me</span></div>
        //     <div className={`navitems ${isOpen && "open"}`}>
        //         <Link to={'/Profile'}>Profile</Link>
        //         <Link to={'/Share'}>Share</Link>
        //         <Link to={'/Explore'}>Explore</Link>
        //         <img src={Logout} alt="logout" className="logout" onClick={logout} />
        //     </div>
        //     <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
        //         <span></span>
        //         <span></span>
        //         <span></span>
        //     </div>
        // </div>
        <nav className="navbar">
            <div id="trapezoid">
                <Link to="#" className="sub-home">Profile</Link>
                <Link to="#About" className="expandHome">Share</Link>
                <div className="subnav">
                    <button className="subnavbtn">
                        Clients<i className="fa fa-caret-down"></i>
                    </button>
                    <div className="subnav-content">
                        {/* Contenido del submenú de Clients */}
                    </div>
                </div>
                <div className="subnav">
                    <button className="subnavbtn">
                        Services<i className="fa fa-caret-down"></i>
                    </button>
                    <div className="subnav-content">
                        <div className="subnav-trapezoid">
                            <a href="#Services">Print Design</a>
                            <a href="#Services">Web Design</a>
                            <a href="#Services">Mobile App Development</a>
                        </div>
                    </div>
                </div>
                <a href="https://codepen.io/pec-man" className="expandHome">Contact</a>
            </div>
            {/* Tu componente Menu */}
            <Menu />
        </nav>
    );
};

export default Menu;
