import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../PublicConfig/PublicConfig.css'

const Location = ({ addLocation, loggedIn }) => {

    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim() !== '') {
            const newlocation = location.trim()
            addLocation(newlocation);
            setLocation('');
        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}
            // className='containerformulario'
            style={{ display: 'flex', margin: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '90%' }}
        >
            <input
                className='formulario'
                type="text"
                placeholder="Insert your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <Button className='botonPublic' style={{ height: 'auto', width: 'auto', backgroundColor: 'rgb(88, 175, 221)', fontWeight: 'bold', color: 'black', margin: '2%' }} type="submit">Update <br /> City</Button>
        </form>
    );
};

export default Location;