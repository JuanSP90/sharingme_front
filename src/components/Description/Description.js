import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '90%' }}>
            <textarea
                type="text"
                placeholder="Escriba la descripción para mostrar en su perfil"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '100px', width: '90%', margin: '3px' }}
            />
            <button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)' }} type="submit">Add Description</button>
        </form>
    );
};

export default Description;