import React, { useState } from 'react';
import facebookIcon from '../../images/facebookIcon.png';
import instagramIcon from '../../images/instagramIcon.png';
import tiktokIcon from '../../images/tiktokIcon.png';
import twitterIcon from '../../images/twitterIcon.png';

const LinkForm = ({ addLink, loggedIn }) => {
    const [url, setUrl] = useState('');
    // const [selectedIcon, setSelectedIcon] = useState('facebook');

    // const icons = [
    //     { name: 'facebook', src: facebookIcon },
    //     { name: 'instagram', src: instagramIcon },
    //     { name: 'tiktok', src: tiktokIcon },
    //     { name: 'twitter', src: twitterIcon },
    // ];

    const handleSubmit = (e) => {

        e.preventDefault();
        if (url.trim() !== '') {
            const linkData = {
                url: url.trim(),
                // icon: selectedIcon
            };
            addLink(linkData);
            setUrl('');
            // setSelectedIcon('facebook');
        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: 'auto' }}>
            {/* <div className="icon-selector">
                {icons.map(icon => (
                    <img
                        key={icon.name}
                        src={icon.src}
                        alt={icon.name}
                        className={`socialIcon${selectedIcon === icon.name ? ' selected' : ''}`}
                        onClick={() => setSelectedIcon(icon.name)}
                        style={{ width: '30px', margin: '5px' }}
                    />
                ))}
            </div> */}
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ height: '30px', width: '200px', margin: '10px' }}
            />
            <button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)' }} type="submit">Add Link</button>
        </form>
    );
};

export default LinkForm;
