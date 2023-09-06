import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Profile.css';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import PublicConfig from '../../components/PublicConfig/PublicConfig';
import SpinnerLoad from '../../components/Spinner/Spinner';
import ProfileUpdate from '../../components/ProfileUpdate/ProfileUpdate';
import ProfileZone from '../../components/ProfileZone/ProfileZone';
import { Badge, Container, Row, Col } from 'react-bootstrap';


const Profile = () => {
	const { userName } = useParams();
	const [profileData, setProfileData] = useState(null);
	const [backgroundColor, setBackgroundColor] = useState('#ffffff');
	const { profile: loggedInUser, reload, setReload } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
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

	const isProfileEditable = loggedInUser.userName === userName;

	const ProfileLink = ({ link }) => {
		const openLinkInNewTab = () => {
			window.open(`https://${link.url}`, '_blank');
		};

		return (
			<li className='listadeenlaces'>
				<div className="linksBox">
					<button onClick={openLinkInNewTab}>
						{link.url}
					</button>
				</div>
			</li>
		);
	};


	if (isLoading) {
		return <SpinnerLoad />
	}

	return (
		<div className="App">
			<Menu />
			{profileData ? (
				<div className="profilezone">
					{/* <h1 >{profileData.userName}</h1>
					<h4>{profileData.tag1} | {profileData.tag2} | {profileData.tag3}</h4>
					<h5>From: <span>{profileData.location}</span></h5>
					<div style={{ width: '50vw', height: 'auto', backgroundColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<p>{profileData.description}</p>
					</div>


					{profileData.links.map((link) => (
						<ProfileLink key={link._id} link={link}
						/>
					))} */}
					<Container>
						<Row>
							<Col style={{ display: 'flex', justifyContent: ' center', alignItems: 'center', flexDirection: 'column' }}>
								<h1 className='letras'>{profileData.userName}</h1>

								<h4>
									<Badge variant="primary">{profileData.tag1}</Badge>{" "}
									<Badge variant="secondary">{profileData.tag2}</Badge>{" "}
									<Badge variant="success">{profileData.tag3}</Badge>
								</h4>
								<h5>From: <span>{profileData.location}</span></h5>
							</Col>
						</Row>
						<Row>
							<Col>
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', padding: '30px', width: 'auto', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)', backgroundColor }}>
									<p className='descripcionP'>{profileData.description}</p>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="page-container">
									<h2>Visitame en:</h2>
									<div className="links-container">
										{profileData.links.map((link) => (
											<a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer" className='linksFinales'>
												{link.url}
											</a>
										))}
									</div>
								</div>


							</Col>
						</Row>
					</Container>
					{isProfileEditable && (

						<div className='configZone'>
							<PublicConfig />
							<ProfileUpdate />

						</div>

					)}
				</div>
			) : (
				<NotFound />
			)
			}
		</div >
	);
};

export default Profile;
