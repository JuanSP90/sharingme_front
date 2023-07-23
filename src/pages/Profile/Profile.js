import React, { useState, useEffect, useContext } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import LinkList from '../../components/LinkList/LinkList';
import axios from 'axios';
import './Profile.css';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import Description from '../../components/Description/Description';
import DescriptionList from '../../components/Description/DescriptionList';

const Profile = () => {
    const [links, setLinks] = useState([]);
    const [description, setDescription] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const { profile, reload, setReload, getMyProfile } = useContext(AuthContext);

    useEffect(() => {
        fetchUserProfile(profile.userName);
        setBackgroundColor(profile.backgroundColor);
    }, [profile.userName, profile.backgroundColor]);

    const fetchUserProfile = async (userName) => {
        await axios
            .get(`http://localhost:3001/users/${userName}`)
            .then((response) => {
                setLinks(response.data.links);
                setDescription(response.data.description);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    };

    const addLink = (newLink) => {
        setLinks([...links, newLink]);
    };

    const deleteLink = (linkId) => {
        setLinks(links.filter((link) => link._id !== linkId));
    };

    const addDescription = (newDescription) => {
        setDescription(newDescription);
    };

    const clearDescription = () => {
        setDescription('');
    };

    const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    const saveChanges = async () => {
        if (profile._id) {
            try {
                await axios.patch(
                    `http://localhost:3001/users/updateUser/`,
                    {
                        links,
                        description,
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

    const isProfileEditable = profile._id;

    // ProfileLink component defined inside the Profile component
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
            <div>
                <h1>{profile.userName}</h1>
                <p>Descripción: {profile.description}</p>
                {links.map((link) => (
                    <ProfileLink key={link._id} link={link} />
                ))}

            </div>
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
                        {links.map((link) => (
                            <ProfileLinkEditable key={link._id} link={link} />
                        ))}
                    </ul>
                    <Description addDescription={addDescription} loggedIn={true} />
                    <DescriptionList description={description} deleteDescription={clearDescription} loggedIn={true} />
                    <button onClick={saveChanges}>Guardar cambios</button>
                </>
            )}
        </div>
    );
};

export default Profile;
