import React from 'react';

const LinkList = ({ links, deleteLink, loggedIn }) => {
    if (!loggedIn) {
        // Mostrar la lista de enlaces como un visitante si no está autenticado
        return (
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <h3>{link.title}</h3>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.url}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul>
            {links.map((link, index) => (
                <li key={index}>
                    <h3>{link.title}</h3>
                    <p>{link.url}</p>
                    <button onClick={() => deleteLink(index)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default LinkList;
