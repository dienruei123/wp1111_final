import React from 'react'
import "../containers/css/homePage.css"
import { useNavigate } from 'react-router-dom'

const CardWrapper = ({ photo, name, id, index }) => {
    const navigate = useNavigate()
    const ToEvent = (id) => {
        console.log('current id', id)
        navigate("/event/" + id)
    }
    return (
        <div className="event-card"
            style={{ left: `calc((-50% + ${index} * 50%)` }}
            onClick={() => ToEvent(id)}
        >
            <div className="event-card_wrapper">
                <img src={photo} alt="infoPicture" width="100%" height="100%"></img>
            </div>
            <div className="event-card_info">
                {name}
            </div>
        </div>
    )
}
export default CardWrapper