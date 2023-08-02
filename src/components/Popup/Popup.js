

import React from 'react';
import ProfileUpdate from '../../components/ProfileUpdate/ProfileUpdate';
import './Popup.css'

const Popup = ({ onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <ProfileUpdate />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;