class Plant{
    constructor(plantID, latinName, commonName, upperTemp, lowerTemp, soilType, humidity, careDifficulty, recommendedLoc, heightSpread, feedingFreq, wateringFreq, pottingFreq, family, lightLevel){
        this.plantID = plantID;
        this.latinName = latinName;
        this.commonName = commonName;
        this.upperTemp = upperTemp;
        this.lowerTemp = lowerTemp;
        this.soilType = soilType;
        this.humidity = humidity;
        this.careDifficulty = careDifficulty;
        this.recommendedLoc = recommendedLoc;
        this.heightSpread = heightSpread;
        this.feedingFreq = feedingFreq;
        this.wateringFreq = wateringFreq;
        this.pottingFreq = pottingFreq;
        this.family = family;
        this.lightLevel = lightLevel;
    }
}

export default Plant;