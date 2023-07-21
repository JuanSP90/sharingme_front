import React from 'react';
import './HomePage.css';
import fotomovil from '../../images/movil2.png'
import Loginform from '../../components/Loginform/Loginform'
import Title from '../../components/Title/Title';


const HomePage = () => {
    return (
        <div className="body">
            <Title />
            <div className="main">
                <div className="imagenContainer">
                    <img src={fotomovil} alt="" className="imagen" />
                </div>
                <div className='loginform'>
                    <Loginform />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
