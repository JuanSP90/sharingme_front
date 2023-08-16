import React, { useState } from 'react';

const LinkForm = ({ addLink, loggedIn }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() !== '' && url.trim() !== '') {
            const newLink = {
                title: title.trim(),
                url: url.trim(),
            };
            addLink(newLink);
            setTitle('');
            setUrl('');
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
                style={{ height: '30px', width: '50px', margin: '10px' }}
            //aqui vamos a cambiarlo por los iconos
            />
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ height: '30px', width: '200px', margin: '10px' }}
            />
            <button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)' }} type="submit">Agregar enlace</button>
        </form>
    );
};

export default LinkForm;
