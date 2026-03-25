import { query } from '../config/db.js';
import UserPlant from '../Entities/UserPlant.js';

class UserPlantRepository {
    async getPlantsByRoomId(roomId) {
        const result = await query('SELECT * FROM user_plants WHERE roomID = ?', [roomId]);
        const rows = result.rows;
        return rows.map(p => new UserPlant(p.userPlantID, p.plantID, p.userID, p.roomID, p.plantName, p.lastWatered, p.lastFed, p.lastPotted, p.nextWatering, p.nextFeeding, p.nextPotting, p.dateAdded));
    }

    async getUserPlantById(userPlantID) {
        const result = await query('SELECT * FROM user_plants WHERE userPlantID = ?', [userPlantID]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const p = rows[0];
        return new UserPlant(p.userPlantID, p.plantID, p.userID, p.roomID, p.plantName, p.recommendedLoc, p.lastWatered, p.lastFed, p.lastPotted, p.nextWatering, p.nextFeeding, p.nextPotting, p.dateAdded);
    }

    async createUserPlant(plantID, userID, roomID, plantName, recommendedLoc) {
        const now = new Date();
        console.log(userID, plantID, roomID, plantName, recommendedLoc);
        const { rows } = await query(
            'INSERT INTO user_plants (plantID, userID, roomID, plantName, recommendedLoc, lastWatered, lastFed, lastPotted, nextWatering, nextFeeding, nextPotting, dateAdded) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [plantID, userID, roomID, plantName, recommendedLoc, now, now, now, now, now, now, now]
        );
        return rows.insertId;
    }

    async updateUserPlant(userPlantID, userID, updates = {}) {
        const allowed = new Set(['plantName', 'roomID', 'lastWatered', 'lastFed', 'lastPotted', 'nextWatering', 'nextFeeding', 'nextPotting']);
        const keys = Object.keys(updates).filter(k => allowed.has(k));
        if (keys.length === 0) throw new Error('No valid fields to update');
        const assignments = keys.map(k => `${k} = ?`).join(', ');
        const values = keys.map(k => updates[k]);
        const sql = `UPDATE user_plants SET ${assignments} WHERE userPlantID = ? AND userID = ?`;
        const { rows } = await query(sql, [...values, userPlantID, userID]);
        return rows;
    }

    async deleteUserPlant(userPlantID, userID) {
        const { rows } = await query('DELETE FROM user_plants WHERE userPlantID = ? AND userID = ?', [userPlantID, userID]);
        return rows;
    }

    async getUserPlantsByUserId(userId) {
        const result = await query('SELECT * FROM user_plants WHERE userID = ?', [userId]);
        const rows = result.rows;
        return rows.map(p => new UserPlant(p.userPlantID, p.plantID, p.userID, p.roomID, p.plantName, p.lastWatered, p.lastFed, p.lastPotted, p.nextWatering, p.nextFeeding, p.nextPotting, p.dateAdded));
    }
}

export default new UserPlantRepository();
