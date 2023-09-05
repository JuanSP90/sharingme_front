import React, { useState, useEffect, useContext } from 'react';
import LinkForm from '../LinkForm/LinkForm';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Description from '../Description/Description';
import Location from '../Location/Location';
import { useParams } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import TagForm from '../TagForm/TagForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PublicConfig = () => {
    const { userName } = useParams();
    const [profileData, setProfileData] = useState({});
    const { profile: loggedInUser, getMyProfile } = useContext(AuthContext);
    const { reload, setReload } = useContext(AuthContext)
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isOpen, setIsOpen] = useState(false);
    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const fetchUserProfile = async (userName) => {
        try {

            const response = await axios.get(`${URLBACKEND}/users/${userName}`);
            setProfileData(response.data);
            setBackgroundColor(response.data.backgroundColor);
        } catch (error) {
            console.error('Error fetching user profile:', error);

        }
    };

    useEffect(() => {
        fetchUserProfile(userName);
    }, [userName]);

    useEffect(() => {
        if (reload) {
            window.location.reload();
            setReload(false);
        }
    }, [reload, setReload]);

    const addLink = (newLink
    ) => {
        setProfileData((prevData) => ({
            ...prevData,
            links: [...prevData.links, {
                url: newLink
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

    const updateTags = (updatedTag1, updatedTag2, updatedTag3) => {
        setProfileData((prevData) => ({
            ...prevData,
            tag1: updatedTag1 !== null ? updatedTag1 : prevData.tag1,
            tag2: updatedTag2 !== null ? updatedTag2 : prevData.tag2,
            tag3: updatedTag3 !== null ? updatedTag3 : prevData.tag3,
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


    const saveChanges = async () => {
        if (profileData._id) {
            try {
                await axios.patch(
                    `${URLBACKEND}/users/updateUser/`,
                    {
                        links: profileData.links,
                        description: profileData.description,
                        backgroundColor,
                        location: profileData.location,
                        tag1: profileData.tag1,
                        tag2: profileData.tag2,
                        tag3: profileData.tag3
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    }
                );
                setReload(!reload);
                getMyProfile();
                hideModal()
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
    };

    const isProfileEditable = loggedInUser.userName === userName;

    const ProfileLinkEditable = ({ link }) => {
        return (
            <li>
                <div className="linkItem">
                    <div className="linkInfo">
                        <p className="linkInfo">{link.url}</p>
                        {isProfileEditable && (
                            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'red', height: 'auto', padding: '5px' }} className='btn' onClick={() => deleteLink(link._id)}>Delete</Button>
                        )}
                    </div>
                </div>
            </li>
        );
    };




    return (
        <div style={{}}>
            <Button onClick={showModal} style={{ backgroundColor: 'rgb(88, 175, 221)', color: 'black' }}>Public User Config</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg" >
                <Modal.Header>
                    <Modal.Title>Customize your public environment</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '40%', height: '50vh' }}>
                        <label htmlFor="background-color" style={{ fontSize: 'larger', marginBottom: '10px', fontWeight: 'bold' }}>Select the desired background color </label>
                        <ChromePicker
                            color={backgroundColor}
                            onChangeComplete={handleBackgroundColorChange}
                            style={{ width: '100%', zIndex: 2 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '60%', height: '50vh' }}>
                        <Description addDescription={addDescription} loggedIn={true} />
                        <TagForm updateTags={updateTags} />
                        <Location addLocation={addLocation} loggedIn={true} />
                    </div>

                    <div style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '90%' }}>
                        <LinkForm addLink={addLink} loggedIn={true} />
                        <ul>
                            {profileData && profileData.links && profileData.links.map((link) => (
                                <ProfileLinkEditable key={link._id} link={link} />
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'grey' }} onClick={hideModal}>Cancel</Button>
                    <Button className='btn' style={{ backgroundColor: 'rgb(125, 239, 125)', color: 'black' }} onClick={saveChanges}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PublicConfig