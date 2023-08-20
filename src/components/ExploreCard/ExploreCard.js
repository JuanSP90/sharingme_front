import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ExploreCard.css'

const ExploreCard = (props) => {
    const navigate = useNavigate();
    const visit = () => {
        navigate(`/user/${props.userName}`);
    }

    return (
        <div class="ag-format-container">
            <div class="ag-courses_box" onClick={visit}>
                <div class="ag-courses_item" style={{ ':nth-child(6n)': { '.ag-courses-item_bg': { backgroundColor: props.backgroundColor } } }}>
                    <a href="#" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg" style={{ backgroundColor: props.backgroundColor }}></div>
                        <div class="ag-courses-item_title">
                            {props.userName}
                        </div>
                        <div class="ag-courses-item_date-box">
                            <h5>{props.tag1} | {props.tag2} | {props.tag3}</h5>
                        </div>
                        <div class="ag-courses-item_date">
                            From: {props.location}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ExploreCard

