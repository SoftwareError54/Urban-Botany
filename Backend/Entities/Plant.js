class Plant{
    constructor(plantID, latinName, commonName, upperTemp, lowerTemp, soilType, lowerHumidity, upperHumidity, careDifficulty, feedingFreq, wateringFreq, pottingFreq, family, lowerLight, upperLight){
        this.plantID = plantID;
        this.latinName = latinName;
        this.commonName = commonName;
        this.upperTemp = upperTemp;
        this.lowerTemp = lowerTemp;
        this.soilType = soilType;
        this.lowerHumidity = lowerHumidity;
        this.upperHumidity = upperHumidity;
        this.careDifficulty = careDifficulty;
        this.feedingFreq = feedingFreq;
        this.wateringFreq = wateringFreq;
        this.pottingFreq = pottingFreq;
        this.family = family;
        this.lowerLight = lowerLight;
        this.upperLight = upperLight;
    }
}

export default Plant;