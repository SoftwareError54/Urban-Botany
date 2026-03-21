function RoomForm(){
    async function handleSubmit(e){
        try{
            const payload={
                userID,
                roomName,
                upperTemp,
                lowerTemp,
                lightLevel,
                humidity
            };

            const res = await addRoom(payload);
            console.log('room created successfully', res);
            Navigate('/rooms');
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="roomName">Room Name:</label>
            <input type="text" id="roomName" name="roomName" required />
            <br />
            <label htmlFor="upperTemp">Upper Temp: </label>
            <input type="int" id="upperTemp" name="upperTemp" required/>
            <br/>
            <label htmlFor="lowerTemp">Lower Temp: </label>
            <input type ="int" id="lowerTemp" name="lowerTemp" required/>
            <br/>
            <label htmlFor="humidity">Humidity: </label>
            <input tpye="text" id="humidity" name="humidity" required/>
        </form>
    )
}
export default RoomForm;