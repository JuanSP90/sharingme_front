import React, { useState, useEffect, useContext } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import axios from 'axios';
import './Profile.css';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import Description from '../../components/Description/Description';
import DescriptionList from '../../components/Description/DescriptionList';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

const Profile = () => {
    const { userName } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const { profile: loggedInUser, reload, setReload, getMyProfile } = useContext(AuthContext);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile(userName);
    }, [userName]);


    const fetchUserProfile = async (userName) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userName}`);
            setProfileData(response.data);
            setBackgroundColor(response.data.backgroundColor);
            setProfileLoaded(true);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setProfileLoaded(false);
        }
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

    const saveChanges = async () => {
        if (profileData._id) {
            try {
                await axios.patch(
                    `http://localhost:3001/users/updateUser/`,
                    {
                        links: profileData.links,
                        description: profileData.description,
                        backgroundColor,
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
        return (
            <li>
                <h3>{link.title}</h3>
                <p>{link.url}</p>
                {isProfileEditable && <button onClick={() => deleteLink(link._id)}>Eliminar</button>}
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

    return (
        <div className="App" style={{ backgroundColor }}>
            <Menu />
            {profileLoaded ? (
                <div>
                    <h1>{profileData.userName}</h1>
                    <p>Descripción: {profileData.description}</p>
                    {profileData.links.map((link) => (
                        <ProfileLink key={link._id} link={link} />
                    ))}
                    {isProfileEditable && (
                        <>
                            <h1>Personaliza tu entorno</h1>
                            <div>
                                <label htmlFor="background-color">Color de fondo:</label>
                                <select id="background-color" value={backgroundColor} onChange={handleBackgroundColorChange}>
                                    <option value="#ffffff">Blanco</option>
                                    <option value="#ff0000">Rojo</option>
                                    <option value="#00ff00">Verde</option>
                                    <option value="#0000ff">Azul</option>
                                </select>
                            </div>

                            <h2>Links:</h2>
                            <LinkForm addLink={addLink} loggedIn={true} />
                            <ul>
                                {profileData.links.map((link) => (
                                    <ProfileLinkEditable key={link._id} link={link} />
                                ))}
                            </ul>
                            <Description addDescription={addDescription} loggedIn={true} />
                            <DescriptionList description={profileData.description} deleteDescription={clearDescription} loggedIn={true} />
                            <button onClick={saveChanges}>Guardar cambios</button>
                        </>
                    )}
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Profile;
