import React, { useState } from 'react';
import facebookIcon from '../../images/facebookIcon.png';
import instagramIcon from '../../images/instagramIcon.png';
import tiktokIcon from '../../images/tiktokIcon.png';
import twitterIcon from '../../images/twitterIcon.png';

const IconSelector = ({ selectedIcon, onSelectIcon }) => {
    const icons = [
        { name: 'facebook', src: facebookIcon },
        { name: 'instagram', src: instagramIcon },
        { name: 'tiktok', src: tiktokIcon },
        { name: 'twitter', src: twitterIcon },
    ];

    return (
        <div className="icon-selector">
            {icons.map(icon => (
                <img
                    key={icon.name}
                    src={icon.src}
                    alt={icon.name}
                    className={`socialIcon${selectedIcon === icon.name ? ' selected' : ''}`}
                    onClick={() => onSelectIcon(icon.name)}
                />
            ))}
        </div>
    );
};

export default IconSelector;
