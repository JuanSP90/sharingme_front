import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useState, useEffect } from 'react';
import './Explore.css'
import axios from 'axios';
import ExploreCard from '../../components/ExploreCard/ExploreCard'


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
        <div>
            <Menu />
            <div>Explore</div>
            {/* aqui debe de ir un boton que me enseñe el mapa del mundo y con la api de google me enseñe de donde son esta gente o donde tenemos a los usuarios, para ellohay que meter en el model user la propiedad de tags y de coiuntry */}
            <div>
                {/* aqui hay que poner algo de PAGINAS */}
                {users.map((user) => (
                    <ExploreCard userName={user.userName} backgroundColor={user.backgroundColor} />
                ))}
            </div>

        </div>
    )
}

export default Explore