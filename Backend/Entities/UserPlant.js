class UserPlant {
    constructor(userPlantID, plantID, userID, roomID, plantName, recommendedLoc, lastWatered, lastFed, lastPotted, nextWatering, nextFeeding, nextPotting, dateAdded) {
        this.userPlantID = userPlantID;
        this.plantID = plantID;
        this.userID = userID;
        this.roomID = roomID;
        this.plantName = plantName;
        this.recommendedLoc = recommendedLoc;
        this.lastWatered = lastWatered;
        this.lastFed = lastFed;
        this.lastPotted = lastPotted;
        this.nextWatering = nextWatering;
        this.nextFeeding = nextFeeding;
        this.nextPotting = nextPotting;
        this.dateAdded = dateAdded;
    }
}

export default UserPlant;
