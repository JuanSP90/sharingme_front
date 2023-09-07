import React, { useEffect, useState } from 'react';
import './HomePage.css';
import fotomovil1 from '../../images/movil1.png';
import fotomovil2 from '../../images/movil2.png';
import fotomovil3 from '../../images/movil3.png';
import Loginform from '../../components/Loginform/Loginform'
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const navigate = useNavigate();
    const visit = () => {
        navigate('/Explore');
    }

    const [userCount, setUserCount] = useState(0);
    const [uniqueLocationCount, setUniqueLocationCount] = useState(0);
    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const response = await axios.get(`${URLBACKEND}/users/usersMap`);
                console.log('soy response', response)
                const { userCount, uniqueLocationCount } = response.data;
                setUserCount(userCount);
                setUniqueLocationCount(uniqueLocationCount);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        }

        getUserCount();
    }, []);

    const RandomImage = () => {
        const [randomNumber, setRandomNumber] = useState(null);

        useEffect(() => {
            const generateRandomNumber = () => {
                const random = Math.floor(Math.random() * 3) + 1;
                setRandomNumber(random);
            };

            generateRandomNumber();
        }, []);

        return (
            <div>
                {randomNumber === 1 && <img src={fotomovil1} alt="Imagen 1" className='imagenHome' />}
                {randomNumber === 2 && <img src={fotomovil2} alt="Imagen 2" className='imagenHome' />}
                {randomNumber === 3 && <img src={fotomovil3} alt="Imagen 3" className='imagenHome' />}
            </div>
        );
    };

    return (
        <div id="bodyHome">
            <Title />
            <div id="mainHome">
                <div id="imagenContainerHome">
                    <RandomImage />
                </div>
                <div id='loginformHome'>
                    <Loginform />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '2%'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button className='botonXplore' onClick={() => {
                        navigate('/Explore');
                    }} style={{ padding: '2%', color: 'rgb(125, 239, 125)', backgroundColor: 'rgb(88, 175, 221)' }}>Explore the community</Button>
                    <h1 className='contador'> <span style={{ color: 'rgb(125, 239, 125)' }}>{uniqueLocationCount}</span> Locations, <span style={{ color: 'rgb(88, 175, 221)' }}>{userCount}</span> Users</h1>
                </div>
                <Map />
            </div>
        </div>
    );
};

export default HomePage;
