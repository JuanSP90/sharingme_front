import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '90%' }}>
            <input
                type="text"
                placeholder="Insert your City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ height: 'auto', width: 'auto', margin: '3px' }}
            />
            <button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)' }} type="submit">Add City</button>
        </form>
    );
};

export default Location;