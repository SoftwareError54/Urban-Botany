import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/roomForm.css';
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
        <div className="room-form-page">
            <form onSubmit={handleSubmit} className="room-form-card">
                <h2>Add a Room</h2>
                <p className="room-form-subtitle">Set environmental targets so plants can be matched to the best space.</p>

                <div className="room-form-grid">
                    <div className="room-form-field">
                        <label htmlFor="roomName">Room Name</label>
                        <input type="text" id="roomName" name="roomName" placeholder="e.g. Sunroom" required />
                    </div>

                    <div className="room-form-field">
                        <label htmlFor="upperTemp">Upper Temperature (C)</label>
                        <input type="number" id="upperTemp" name="upperTemp" placeholder="e.g. 25" required />
                    </div>

                    <div className="room-form-field">
                        <label htmlFor="lowerTemp">Lower Temperature (C)</label>
                        <input type="number" id="lowerTemp" name="lowerTemp" placeholder="e.g. 18" required />
                    </div>

                    <div className="room-form-field">
                        <label htmlFor="lightLevel">Light Level</label>
                        <input type="number" id="lightLevel" name="lightLevel" min="1" max="8" placeholder="1 to 8" required />
                    </div>

                    <div className="room-form-field room-form-field--full">
                        <label htmlFor="humidity">Humidity (%)</label>
                        <input type="number" id="humidity" name="humidity" min="0" max="100" placeholder="e.g. 55" required />
                    </div>
                </div>

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
        </div>
    )
}
export default RoomForm;