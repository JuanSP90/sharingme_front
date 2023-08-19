import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ExploreCard.css'

const ExploreCard = (props) => {
    const navigate = useNavigate();
    const visit = () => {
        navigate(`/user/${props.userName}`);
    }

    return (
        <div className="userCard" style={{ backgroundColor: props.backgroundColor }}>
            <h2>{props.userName}</h2>
            <p>{props.description}</p>
            <p>From: {props.location}</p>
            <button className='btn' style={{ fontSize: 'smaller' }} onClick={visit}>Visit</button>
        </div>
    )
}

export default ExploreCard