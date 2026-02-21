import {query} from '../config/db.js';
import Plant from '../Entities/Plant.js';

class PlantRepository {

    async getAllPlants() {
        const result = await query('SELECT * FROM plant');
        const rows = result.rows;
        return rows.map(p => new Plant(p.plantID, p.latinName, p.commonName, p.upperTemp, p.lowerTemp, p.soilType, p.humidity, p.careDifficulty, p.recommendedLoc, p.heightSpread, p.feedingFreq, p.wateringFreq, p.pottingFreq, p.family, p.lightLevel));
    }

    async getPlantById(plantId) {
        const result = await query('SELECT * FROM plant WHERE plantID = ?', [plantId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0];
        return new Plant(p.plantID, p.latinName, p.commonName, p.upperTemp, p.lowerTemp, p.soilType, p.humidity, p.careDifficulty, p.recommendedLoc, p.heightSpread, p.feedingFreq, p.wateringFreq, p.pottingFreq, p.family, p.lightLevel);
    }
}

export default new PlantRepository();