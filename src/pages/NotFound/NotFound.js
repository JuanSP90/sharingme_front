import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';

const NotFound = () => {
    return (
        <div>
            <h1>Usuario no encontrado</h1>
            <p>El usuario que estás buscando no existe.</p>
            <Link to="/Explore">Siga buscando usuarios en nuestro explorador</Link>
        </div>
    );
};

export default NotFound;