class Room {
    constructor(roomID, userID, decorationID, roomName, upperTemp, lowerTemp, lightLevel, humidity) {
        this.roomID = roomID;
        this.userID = userID;
        this.decorationID = decorationID;
        this.roomName = roomName;
        this.upperTemp = upperTemp;
        this.lowerTemp = lowerTemp;
        this.lightLevel = lightLevel;
        this.humidity = humidity;
    }
}

export default Room;
