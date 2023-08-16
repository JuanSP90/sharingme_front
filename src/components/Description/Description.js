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
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center' }}>
            <textarea
                type="text"
                placeholder="Descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '100px', width: '200px' }}
            />
            <button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)' }} type="submit">Agregar descripcion</button>
        </form>
    );
};

export default Description;