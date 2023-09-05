import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Logout from '../../images/logout.png'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import explore from '../../images/explore.png'
import share from '../../images/share.png'
import profileFoto from '../../images/profile.png'
import { Helmet } from 'react-helmet';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Menu = () => {
    const { logout, profile } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <Navbar
                expand="lg" style={{
                    backgroundColor: 'white',
                    width: '100%'
                }}>

                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    />
                </Helmet>
                <Container style={{
                    backgroundColor: 'white', display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                    <Navbar.Brand id="title"
                        style={{ marginRight: '40%' }}
                    >Sharing <span className="me">Me</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <button onClick={() => { navigate(`/user/${profile.userName}`) }}><div id="imgBoton"><img src={profileFoto} alt="profile" className="img" /> <span className="text">Profile</span></div></button>
                            <button onClick={() => { navigate("/Share") }}><div id="imgBoton"><img src={share} alt="share" className="img" /> <span className="text">Share</span></div></button>
                            <button onClick={() => { navigate("/Explore") }}><div id="imgBoton"><img src={explore} alt="explore" className="img" /> <span className="text">Explore</span></div></button>
                            <button onClick={() => { navigate("/") }}><div id="imgBoton" onClick={logout}><img src={Logout} alt="logout" className="img" /> <span className="text" >LogOut</span></div></button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default Menu;  