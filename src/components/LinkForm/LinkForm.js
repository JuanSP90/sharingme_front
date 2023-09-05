import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './LinkForm.css'

const LinkForm = ({ addLink, loggedIn }) => {
    const [url, setUrl] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim() !== '') {

            addLink(url)

            setUrl('');


        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: 'auto' }}>
            <input
                className='formulario'
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ height: '50px', width: '90%' }}
            />
            <Button className='btn' style={{ height: 'auto', width: 'auto', backgroundColor: 'rgb(88, 175, 221)', fontWeight: 'bold', color: 'black', margin: '10px' }} type="submit">Add Link</Button>
        </form>
    );
};

export default LinkForm;
