import React, { useEffect, useState } from 'react';
import './HomePage.css';
import fotomovil from '../../images/movil2.png'
import Loginform from '../../components/Loginform/Loginform'
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';
import axios from 'axios';

const HomePage = () => {

    const [userCount, setUserCount] = useState(0);
    const [uniqueLocationCount, setUniqueLocationCount] = useState(0);

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/usersMap');
                const { userCount, uniqueLocationCount } = response.data;
                setUserCount(userCount);
                setUniqueLocationCount(uniqueLocationCount);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        }

        getUserCount();
    }, []);

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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '20px'
                }}
            >
                <h3>{uniqueLocationCount} Cities, {userCount} Users</h3>
                <Map />
            </div>
        </div>
    );
};

export default HomePage;
