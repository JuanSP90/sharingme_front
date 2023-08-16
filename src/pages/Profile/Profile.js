import React, { useState, useEffect, useContext } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import axios from 'axios';
import './Profile.css';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import Description from '../../components/Description/Description';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Popup from '../../components/Popup/Popup';
import facebookIcon from '../../images/facebookIcon.png'
import instagramIcon from '../../images/instagramIcon.png'
import tiktokIcon from '../../images/tiktokIcon.png'
import twitterIcon from '../../images/twitterIcon.png'



const Profile = () => {
    const { userName } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const { profile: loggedInUser, reload, setReload, getMyProfile } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile(userName);
    }, [userName]);


    const fetchUserProfile = async (userName) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3001/users/${userName}`);
            setProfileData(response.data);
            setBackgroundColor(response.data.backgroundColor);
        } catch (error) {
            console.error('Error fetching user profile:', error);

        } finally { setIsLoading(false); }
    };

    const addLink = (newLink) => {
        setProfileData((prevData) => ({
            ...prevData,
            links: [...prevData.links, newLink],
        }));
    };

    const deleteLink = (linkId) => {
        setProfileData((prevData) => ({
            ...prevData,
            links: prevData.links.filter((link) => link._id !== linkId),
        }));
    };

    const addDescription = (newDescription) => {
        setProfileData((prevData) => ({
            ...prevData,
            description: newDescription,
        }));
    };

    const clearDescription = () => {
        setProfileData((prevData) => ({
            ...prevData,
            description: '',
        }));
    };

    const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    const toggleIconSelection = (socialMedia) => {
        setSelectedIcons((prevSelectedIcons) => ({
            ...prevSelectedIcons,
            [socialMedia]: !prevSelectedIcons[socialMedia],
        }));
    };

    const saveChanges = async () => {
        if (profileData._id) {
            try {
                await axios.patch(
                    `http://localhost:3001/users/updateUser/`,
                    {
                        links: profileData.links,
                        description: profileData.description,
                        backgroundColor,
                        icon: profileData.icon
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    }
                );
                setReload(!reload);
                getMyProfile();
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
    };

    const isProfileEditable = loggedInUser.userName === userName;

    const ProfileLinkEditable = ({ link }) => {
        const getIconBySocialMedia = (socialMedia) => {
            const isSelected = selectedIcons[socialMedia];
            switch (socialMedia) {
                case 'facebook':
                    return (
                        <img
                            src={facebookIcon}
                            alt="Facebook"
                            className={`socialIcon${isSelected ? ' selected' : ''}`}
                            onClick={() => toggleIconSelection('facebook')}
                        />
                    );
                case 'instagram':
                    return (
                        <img
                            src={instagramIcon}
                            alt="Instagram"
                            className={`socialIcon${isSelected ? ' selected' : ''}`}
                            onClick={() => toggleIconSelection('instagram')}
                        />
                    );
                case 'tiktok':
                    return (
                        <img
                            src={tiktokIcon}
                            alt="TikTok"
                            className={`socialIcon${isSelected ? ' selected' : ''}`}
                            onClick={() => toggleIconSelection('tiktok')}
                        />
                    );
                case 'twitter':
                    return (
                        <img
                            src={twitterIcon}
                            alt="Twitter"
                            className={`socialIcon${isSelected ? ' selected' : ''}`}
                            onClick={() => toggleIconSelection('twitter')}
                        />
                    );
                default:
                    return null;
            }
        }


        return (
            <li>
                <div className="linkItem">
                    <div className="linkIcon" onClick={() => toggleIconSelection(link.socialMedia)}>
                        {getIconBySocialMedia(link.socialMedia)}
                    </div>
                    <div className="linkInfo">
                        <h3>{link.title}</h3>
                        <p>{link.url}</p>
                    </div>
                    {isProfileEditable && <button onClick={() => deleteLink(link._id)}>Eliminar</button>}
                </div>
            </li>
        );



    };

    const ProfileLink = ({ link }) => {
        return (
            <li>
                <div className="linksBox">
                    <h3>{link.title}</h3>
                    <p>{link.url}</p>
                </div>
            </li>
        );
    };
    if (isLoading) {
        return <div>SPINNER</div>
    }



    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };
    return (
        <div className="App" style={{ backgroundColor }}>
            <Menu />
            {profileData ? (
                <div>
                    <h1>{profileData.userName}</h1>
                    <p>{`Descripción: ${profileData.description}`}</p>
                    {profileData.links.map((link) => (
                        <ProfileLink key={link._id} link={link} />
                    ))}
                    {isProfileEditable && (

                        <div className="configZone">

                            {showPopup && <Popup onClose={handlePopupClose} />}
                            <button className="btn" style={{ backgroundColor: 'grey' }} onClick={handlePopupOpen}>Configuracion interna del usuario</button>
                            <h1>Personaliza tu entorno publico</h1>
                            <div>
                                <label htmlFor="background-color">Color de fondo:</label>
                                <select id="background-color" value={backgroundColor} onChange={handleBackgroundColorChange}>
                                    <option value="#ffffff">Blanco</option>
                                    <option value="#ff0000">Rojo</option>
                                    <option value="#00ff00">Verde</option>
                                    <option value="#0000ff">Azul</option>
                                </select>
                            </div>

                            <LinkForm addLink={addLink} loggedIn={true} />
                            <ul>
                                {profileData.links.map((link) => (
                                    <ProfileLinkEditable key={link._id} link={link} />
                                ))}
                            </ul>
                            <Description addDescription={addDescription} loggedIn={true} />
                            <button className='btn' onClick={saveChanges}>Guardar cambios</button>
                        </div>

                    )}
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Profile;
