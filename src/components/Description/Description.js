import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../PublicConfig/PublicConfig.css'

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
        <form onSubmit={handleSubmit}
        //  className='containerformulario' 
        >
            <input
                className='formulario'
                type="text"
                placeholder="Write ur description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button className='botonPublic' style={{ height: 'auto', width: 'auto', margin: '2%', backgroundColor: 'rgb(88, 175, 221)', color: 'black', fontWeight: 'bold' }} type="submit">Update <br />Description</Button>
        </form>
    );
};

export default Description;