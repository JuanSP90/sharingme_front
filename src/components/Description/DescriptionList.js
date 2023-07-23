import React from 'react';

const DescriptionList = ({ description, deleteDescription, loggedIn }) => {
    const handleDelete = () => {
        deleteDescription(description);
    };

    if (!loggedIn) {
        return (
            <div>
                <h3>{description.title}</h3>
                <p>{description.description}</p>
            </div>
        );
    }

    return (
        <div>
            <h3>{description.title}</h3>
            <p>{description.text}</p>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default DescriptionList;
