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
            {/* en un futuro meter aqui algo de TAGS */}
            <button onClick={visit}>Visitar</button>
        </div>
    )
}

export default ExploreCard