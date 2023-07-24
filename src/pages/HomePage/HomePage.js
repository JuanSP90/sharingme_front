import React from 'react';
import './HomePage.css';
import fotomovil from '../../images/movil2.png'
import Loginform from '../../components/Loginform/Loginform'
import Title from '../../components/Title/Title';


const HomePage = () => {
    return (
        <div id="bodyHome">
            <Title />
            <div id="mainHome">
                <div id="imagenContainerHome">
                    <img src={fotomovil} alt="" id="imagenHome" />
                </div>
                <div id='loginformHome'>
                    <Loginform />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
