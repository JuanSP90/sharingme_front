import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useState, useEffect } from 'react';
import './Explore.css'
import axios from 'axios';
import ExploreCard from '../../components/ExploreCard/ExploreCard'
import MapWithMarkers from '../../components/Map/Map';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const Explore = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios", error);
        }
    };

    return (
        <div className="ExplorePage">
            <Menu />
            {/* <MapWithMarkers users={users} /> */}
            <div className="ExploreCardContainer">
                {/* aqui hay que poner algo de PAGINAS */}
                {users.map((user) => (
                    <ExploreCard userName={user.userName} backgroundColor={user.backgroundColor} />
                ))}
            </div>

        </div>
    )
}

export default Explore