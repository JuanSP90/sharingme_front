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
        <form onSubmit={handleSubmit}>
            <textarea
                type="text"
                placeholder="Descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Agregar descripcion</button>
        </form>
    );
};

export default Description;