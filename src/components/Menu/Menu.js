import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";


const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="navGame">
            <div className="navlogo">Financial Challenge</div>
            <div className={`navitems ${isOpen && "open"}`}>
                <Link to={'/Profile'}>Profile</Link>
                <Link to={'/Explore'}>Explore</Link>
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
