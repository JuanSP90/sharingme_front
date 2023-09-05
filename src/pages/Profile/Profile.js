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
import TagForm from '../../components/TagForm/TagForm';


const Profile = () => {
	const { userName } = useParams();
	const [profileData, setProfileData] = useState(null);
	const [backgroundColor, setBackgroundColor] = useState('#ffffff');
	const { profile: loggedInUser, reload, setReload, getMyProfile } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const URLBACKEND = process.env.REACT_APP_URL_BACKEND;


	useEffect(() => {
		fetchUserProfile(userName);
	}, [userName]);


	const fetchUserProfile = async (userName) => {
		try {
			setIsLoading(true);
			const response = await axios.get(`${URLBACKEND}/users/${userName}`);
			setProfileData(response.data);
			setBackgroundColor(response.data.backgroundColor);
		} catch (error) {
			console.error('Error fetching user profile:', error);

		} finally { setIsLoading(false); }
	};

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

	const ProfileLinkEditable = ({ link }) => {
		return (
			<li>
				<div className="linkItem">
					<div className="linkInfo">
						<p className="linkInfo">{link.url}</p>
						{isProfileEditable && (
							<button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'red', height: 'auto', padding: '5px' }} className='btn' onClick={() => deleteLink(link._id)}>Delete</button>
						)}
					</div>
				</div>
			</li>
		);
	};

	const ProfileLink = ({ link }) => {
		const openLinkInNewTab = () => {
			window.open(`https://${link.url}`, '_blank');
		};

		return (
			<li>
				<div className="linksBox">
					<button onClick={openLinkInNewTab}>
						{link.url}
					</button>
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
					<div style={{ width: '80vw' }}>
						<p>{profileData.description}</p>
					</div>
					<h4>{profileData.tag1} | {profileData.tag2} | {profileData.tag3}</h4>
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
								</div>
								<div style={{ display: 'flex', margin: '15px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', width: '90%' }}>
									<LinkForm addLink={addLink} loggedIn={true} />
									<ul>
										{profileData.links.map((link) => (
											<ProfileLinkEditable key={link._id} link={link} />))}
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
