import React, { useState } from 'react';

const Description = ({ addDescription, loggedIn }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() !== '' && description.trim() !== '') {
            const newDescription = {
                title: title.trim(),
                description: description.trim(),
            };
            addDescription(newDescription);
            setTitle('');
            setDescription('');
        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
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