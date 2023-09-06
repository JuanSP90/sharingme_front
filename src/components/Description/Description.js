import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Description.css'

const Description = ({ addDescription, loggedIn }) => {

    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim() !== '') {
            const newDescription = description.trim()

            addDescription(newDescription);
            setDescription('');
        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
            width: '90%'
        }}>
            <input
                className='formulario'
                type="text"
                placeholder="Write ur description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: 'auto', width: '90%', margin: '10px' }}
            />
            <Button className='btn' style={{ height: 'auto', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)', color: 'black', fontWeight: 'bold' }} type="submit">Update Description</Button>
        </form>
    );
};

export default Description;