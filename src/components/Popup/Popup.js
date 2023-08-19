import React from 'react';
import ProfileUpdate from '../../components/ProfileUpdate/ProfileUpdate';
import './Popup.css'

const Popup = ({ onClose }) => {
    return (
        <div className="popup" style={{ zIndex: '9999' }}>
            <div className="popup-content" >
                <ProfileUpdate />
                <button className='btn' style={{ backgroundColor: 'red' }} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;