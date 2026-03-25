import {query} from '../config/db.js';
import Plant from '../Entities/Plant.js';
import UserPlantDecoration from '../Entities/UserPlantDecoration.js';
import PlantDecoration from '../Entities/PlantDecoration.js'
import UserPlant from '../Entities/UserPlant.js'

class PlantRepository {

    async getAllPlants() {
        const result = await query('SELECT * FROM plant');
        const rows = result.rows;
        return rows.map(p => new Plant(p.plantID, p.latinName, p.commonName, p.upperTemp, p.lowerTemp, p.soilType, p.lowerHumidity, p.upperHumidity, p.careDifficulty, p.feedingFreq, p.wateringFreq, p.pottingFreq, p.family, p.lowerLight, p.upperLight));
    }

    async getPlantById(plantId) {
        const result = await query('SELECT * FROM plant WHERE plantID = ?', [plantId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0];
        const plant = new Plant(p.plantID, p.latinName, p.commonName, p.upperTemp, p.lowerTemp, p.soilType, p.lowerHumidity, p.upperHumidity, p.careDifficulty, p.feedingFreq, p.wateringFreq, p.pottingFreq, p.family, p.lowerLight, p.upperLight);
        // attach image pointer if present in the DB row
        if (p.imagePointer) plant.imagePointer = p.imagePointer;
        console.log(plant);
        return plant;
    }

    async getPlantByLatinName(latinName){
        const name = (latinName || '').trim();
        if(!name) return null;
        const pattern = `%${name}%`;
        console.log(name)
        const result = await query(
            'SELECT * FROM plant WHERE LOWER(latinName) = LOWER(?) OR LOWER(latinName) LIKE LOWER(?) LIMIT 1',
            [name, pattern]
        );
        const rows = result.rows;
        if(rows.length === 0) return null;
        const p = rows[0];
        const plant = new Plant(p.plantID, p.latinName, p.commonName, p.upperTemp, p.lowerTemp, p.soilType, p.lowerHumidity, p.upperHumidity, p.careDifficulty, p.feedingFreq, p.wateringFreq, p.pottingFreq, p.family, p.lowerLight, p.upperLight);
        if(p.imagePointer) plant.imagePointer = p.imagePointer;
        return plant;
    }

    async getAllPlantDecorations(){
        const result = await query('SELECT * FROM plant_decoration');
        console.log(result)
        const rows = result.rows;
        console.log(rows);
        return rows.map(p => new PlantDecoration (p.plantDecorationID, p.imagePointer, p.isStatic, p.type, p.cost, p.colour1, p.colour2));
    }

    async getPlantDecorationById(decorationId){
        const result = await query('SELECT * FROM plant_decoration WHERE plantDecorationID = ?', [decorationId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0];
        return new UserPlantDecoration(p.plantDecorationID, p.imagePointer, p.static, p.type, p.cost, p.colour1, p.colour2);

    }

    async getDecorationByPlantId(plantId){
        const result = await query('SELECT * FROM user_plant_decoration JOIN user_plants USING (userPlantID) WHERE userPlantID = ?', [plantId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0]
        return new UserPlantDecoration(p.plantDecorationID, p.imagePointer, p.static, p.type, p.cost, p.colour1, p.colour2)
    }

    async addDecorationByPlantId(plantId, decorationId){
        const decoration = await this.getPlantDecorationById(decorationId);
        if (!decoration) return null;
        await query('INSERT INTO user_plant_decoration (userPlantId, plantDecorationID, colour1, colour2) VALUES (?,?,?,?)',
            [plantId, decorationId, decoration.colour1, decoration.colour2]
        );
        // Return the decoration that was applied (could also return the inserted row if needed)
        return decoration;
    }

    async getMyPlants(userId){
        console.log(userId);
        const result = await query('SELECT * FROM user_plants WHERE userID = ?', [userId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0];
        console.log(p);
        return rows.map(p => new UserPlant(p.userPlantID, p.plantID, p.userId, p.roomID, p.plantName, p.recommendedLoc, p.lastWatered, p.lastFed, p.lastPotted, p.nextWatering, p.nextFeeding, p.nextPotting, p.dateAdded));
    }

    async getPlantsByRoomId(roomId){
        console.log('getPlantsByRoomId', roomId);
        const result = await query(
            `SELECT up.userPlantID, up.plantID, up.roomID, up.plantName, p.imagePointer
             FROM user_plants up
             JOIN plant p ON up.plantID = p.plantID
             WHERE up.roomID = ?`,
            [roomId]
        );
        const rows = result.rows;
        return rows.map(r => ({
            userPlantID: r.userPlantID,
            plantID: r.plantID,
            roomID: r.roomID,
            name: r.plantName,
            imagePointer: r.imagePointer
        }));
        }
        


}

export default new PlantRepository();