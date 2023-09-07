import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Location.css'

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '90%' }}>
            <input
                className='formulario'
                type="text"
                placeholder="Insert your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ height: '50px', width: '80%', margin: '10px' }}
            />
            <Button className='btn' style={{ height: 'auto', width: 'auto', backgroundColor: 'rgb(88, 175, 221)', fontWeight: 'bold', color: 'black', margin: '10px' }} type="submit">Update City</Button>
        </form>
    );
};

export default Location;