import React from 'react';
import { useNavigate } from 'react-router-dom';
import {addRoom} from '../services/roomService';

function RoomForm(){
    const navigate = useNavigate();

    function getUserIdFromToken(token){
        try{
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return decoded.userId || decoded.user_id || decoded.id || null;
        } catch(e){
            return null;
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;

        const roomName = form.roomName.value;
        const upperTemp = parseFloat(form.upperTemp.value);
        const lowerTemp = parseFloat(form.lowerTemp.value);
        const humidity = parseFloat(form.humidity.value);
        const lightLevel = form.lightLevel ? form.lightLevel.value : null;

        let userID = localStorage.getItem('userId');
        if(!userID){
            const token = localStorage.getItem('token');
            if(token) userID = getUserIdFromToken(token);
        }

        const payload = {
            userID,
            roomName,
            upperTemp,
            lowerTemp,
            lightLevel,
            humidity
        };

        try{
            const res = await addRoom(payload);
            console.log('room created successfully', res);
            navigate('/rooms');
        } catch(err){
            console.error('Failed to create room', err);
            alert(err.message || 'Failed to create room');
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="roomName">Room Name:</label>
            <input type="text" id="roomName" name="roomName" required />
            <br />
            <label htmlFor="upperTemp">Upper Temp: </label>
            <input type="number" id="upperTemp" name="upperTemp" required/>
            <br/>
            <label htmlFor="lowerTemp">Lower Temp: </label>
            <input type ="number" id="lowerTemp" name="lowerTemp" required/>
            <br/>
            <label htmlFor="lightLevel">Light Level: </label>
            <input type="number" id="lightLevel" name="lightLevel" required/>          
            <br/>
            <label htmlFor="humidity">Humidity: </label>
            <input type="text" id="humidity" name="humidity" required/>
            <br/>

            <div className="add-room-confirm">
                <div className="add-room-prompt">
                    <p>Add Room?</p>
                </div>
                <div className="confirm-actions">
                    <button type="submit" className="confirm-icon-button" aria-label="Confirm add room">
                        <img src="/Icons/tick.png" alt="Add room" className="action-icon" />
                    </button>
                    <button type="button" className="confirm-icon-button" aria-label="Cancel" onClick={() => navigate('/rooms')}>
                        <img src="/Icons/red_cross.png" alt="Cancel" className="action-icon" />
                    </button>
                </div>
            </div>
        </form>
    )
}
export default RoomForm;