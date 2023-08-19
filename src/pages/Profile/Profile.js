import React, { useState, useEffect, useContext } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import axios from 'axios';
import './Profile.css';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import Description from '../../components/Description/Description';
import Location from '../../components/Location/Location';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Popup from '../../components/Popup/Popup';
import { ChromePicker } from 'react-color';

const Profile = () => {
    const { userName } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const { profile: loggedInUser, reload, setReload, getMyProfile } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    // const [selectedIcons, setSelectedIcons] = useState({});

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

    const addLink = (newLink,
        // newIcon
    ) => {
        setProfileData((prevData) => ({
            ...prevData,
            links: [...prevData.links, {
                url: newLink
                // , icon: newIcon 
            }],
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

    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color.hex);
    };

    const addLocation = (newLocation) => {
        setProfileData((prevData) => ({
            ...prevData,
            location: newLocation,
        }));
    };

    // const toggleIconSelection = (socialMedia) => {
    //     setSelectedIcons((prevSelectedIcons) => ({
    //         ...prevSelectedIcons,
    //         [socialMedia]: !prevSelectedIcons[socialMedia],
    //     }));
    // };

    const saveChanges = async () => {
        if (profileData._id) {
            try {
                await axios.patch(
                    `http://localhost:3001/users/updateUser/`,
                    {
                        links: profileData.links,
                        description: profileData.description,
                        backgroundColor,
                        location: profileData.location
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    }
                );
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setReload(!reload);
                getMyProfile();
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
    };

    const isProfileEditable = loggedInUser.userName === userName;

    // const ProfileLinkEditable = ({ link }) => {
    //     // const { url
    //     //     // , icon 
    //     // } = link;
    //     const { url } = link;
    //     return (

    //         <li>
    //             <div className="linkItem">
    //                 {/* <div className="linkIcon">
    //                     <img
    //                         src={profileData.icon}
    //                         alt={icon}
    //                         className={`socialIcon${selectedIcons[icon] ? ' selected' : ''}`}
    //                         onClick={() => toggleIconSelection(icon)}
    //                     />
    //                 </div> */}
    //                 <div className="linkInfo">
    //                     <p className="linkInfo">{url}</p>
    //                     {isProfileEditable && <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'red', height: 'auto', padding: '5px' }} className='btn' onClick={() => deleteLink(link._id)}>Delete</button>}
    //                 </div>
    //             </div>
    //         </li>
    //     );
    // };
    const ProfileLinkEditable = ({ link }) => {
        const { url } = link; // Extrae la propiedad 'url' del objeto 'link'
        return (
            <li>
                <div className="linkItem">
                    <div className="linkInfo">
                        <p className="linkInfo">{url}</p>
                        {isProfileEditable && (
                            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'red', height: 'auto', padding: '5px' }} className='btn' onClick={() => deleteLink(link._id)}>Delete</button>
                        )}
                    </div>
                </div>
            </li>
        );
    };

    const ProfileLink = ({ link }) => {
        return (
            <li>
                <div className="linksBox">
                    <a href={link.url}>
                        {link.url}
                    </a>
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
                <div className="profilezone">
                    <h1>{profileData.userName}</h1>
                    <p>{profileData.description}</p>
                    <p>City: {profileData.location}</p>
                    {profileData.links.map((link) => (
                        <ProfileLink key={link._id} link={link}
                        />
                    ))}
                    {isProfileEditable && (

                        <div className="configZone" >

                            {showPopup && <Popup onClose={handlePopupClose} />}
                            <button className="btn" style={{ backgroundColor: 'grey' }} onClick={handlePopupOpen}>internal user configuration</button>
                            <h1>Customize your public environment</h1>
                            <button className='btn' style={{ marginBottom: '10px' }} onClick={saveChanges}>Save changes</button>
                            <div style={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "90%",
                                flexDirection: 'column'
                            }}
                            >
                                <div style={{
                                    display: "flex",
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    width: "90%",
                                    flexDirection: 'row'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '40%', height: '45vh' }}>
                                        <label htmlFor="background-color" style={{ fontSize: 'larger', marginBottom: '10px', fontWeight: 'bold' }}>Select the desired background color </label>
                                        <ChromePicker
                                            color={backgroundColor}
                                            onChangeComplete={handleBackgroundColorChange}
                                            style={{ width: '100%', zIndex: 2 }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '60%', height: '45vh' }}>
                                        <Description addDescription={addDescription} loggedIn={true} />
                                        <Location addLocation={addLocation} loggedIn={true} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '90%' }}>
                                    <LinkForm addLink={addLink} loggedIn={true} />
                                    <ul>
                                        {profileData.links.map((link) => (
                                            <ProfileLinkEditable key={link._id} link={link} />))}
                                        {/* {profileData.links.map((link) => (
                                            <ProfileLinkEditable key={link._id} link={link} />
                                        ))} */}
                                    </ul>
                                </div>
                            </div>
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
