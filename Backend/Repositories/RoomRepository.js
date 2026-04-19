import { query } from '../config/db.js';
import Room from '../Entities/Room.js';
import RoomDecoration from '../Entities/RoomDecoration.js';
import PlantDecoration from '../Entities/PlantDecoration.js';

class RoomRepository {
    async getRoomsByUserId(userId) {
        const result = await query('SELECT * FROM room WHERE userID = ?', [userId]);
        const rows = result.rows;
        return rows.map(r => new Room(r.roomID, r.userID, r.decorationID, r.roomName, r.upperTemp, r.lowerTemp, r.lightLevel, r.humidity));
    }

    async getRoomById(roomId) {
        const result = await query('SELECT * FROM room WHERE roomID = ?', [roomId]);
        const rows = result.rows;
        if (rows.length === 0) return null;
        const r = rows[0];
        return new Room(r.roomID, r.userID, r.decorationID, r.roomName, r.upperTemp, r.lowerTemp, r.lightLevel, r.humidity);
    }

    async createRoom(userID, roomName, decorationID = null, upperTemp = null, lowerTemp = null, lightLevel = null, humidity = null) {
        const { rows } = await query(
            'INSERT INTO room (userID, decorationID, roomName, upperTemp, lowerTemp, lightLevel, humidity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userID, decorationID, roomName, upperTemp, lowerTemp, lightLevel, humidity]
        );
        return rows.insertId;
    }

    async updateRoomFields(roomId, userId, updates = {}) {
        const allowed = new Set(['decorationID', 'roomName', 'upperTemp', 'lowerTemp', 'lightLevel', 'humidity']);
        const keys = Object.keys(updates).filter(k => allowed.has(k));
        if (keys.length === 0) throw new Error('No valid fields to update');
        const assignments = keys.map(k => `${k} = ?`).join(', ');
        const values = keys.map(k => updates[k]);
        const sql = `UPDATE room SET ${assignments} WHERE roomID = ? AND userID = ?`;
        const { rows } = await query(sql, [...values, roomId, userId]);
        return rows;
    }

    async deleteRoom(roomId, userId) {
        const { rows } = await query('DELETE FROM room WHERE roomID = ? AND userID = ?', [roomId, userId]);
        return rows;
    }

    async getAllRoomDecorations(){
        const result = await query("SELECT * FROM room_decoration");
        const rows = result.rows;
        return rows.map(d => new RoomDecoration(d.roomDecorationID, d.decorationName, d.imagePointer, d.isStatic, d.layer, d.cost, d.colour1, d.colour2));
    }

    // fetch a plant decoration by its id
    async getPlantDecorationById(decorationId){
        const result = await query("SELECT * FROM plant_decoration WHERE plantDecorationID = ?", [decorationId]);
        const rows = result.rows;
        if (!rows || rows.length === 0){
            return null;
        }
        const d = rows[0];
        return new PlantDecoration(d.plantDecorationID, d.decorationName, d.imagePointer, d.isStatic, d.layer, d.cost, d.colour1, d.colour2);
    }

    async getDecorationsByRoomId(roomId){
        const result = await query(`
            SELECT rd.*
            FROM room_decoration rd
            JOIN user_room_decoration urd
            ON rd.roomDecorationID = urd.roomDecorationID
            WHERE urd.roomID = ?`, [roomId]);
        const rows = result.rows;
        if (!rows || rows.length === 0){
            return [];
        }
        return rows.map(d => new RoomDecoration(d.roomDecorationID, d.decorationName, d.imagePointer, d.isStatic, d.layer, d.cost, d.colour1, d.colour2));
    }

    async getRoomDecorationById(decorationId){
        const result = await query("SELECT * FROM room_decoration where roomDecorationID = ?", [decorationId]);
        const rows = result.rows;
        if (!rows || rows.length === 0){
            return null;
        }
        const d = rows[0];
        return new RoomDecoration(d.roomDecorationID, d.imagePointer, d.isStatic, d.layer, d.cost, d.colour1, d.colour2);
    }

    async addDecoration(decorationId, roomId){
        // Basic safe implementation: validate inputs and insert mapping row.
        if (!decorationId) throw new Error('DecorationId is required');
        if (!roomId) throw new Error('RoomId is required');
        // Adjust columns and SQL to match your schema for user_room_decoration
        const { rows } = await query(
            'INSERT INTO user_room_decoration (userRoomID, roomDecorationID) VALUES (?, ?)',
            [roomId, decorationId]
        );
        return { insertedId: rows.insertId };
    }

    async updateDecorationByLayer(roomId, decorationId){
        if (!decorationId) throw new Error('DecorationId is required');
        if (!roomId) throw new Error('RoomId is required');
        // Get the layer of the new decoration
        const decResult = await query('SELECT layer FROM room_decoration WHERE roomDecorationID = ?', [decorationId]);
        if (!decResult.rows || decResult.rows.length === 0) throw new Error('Decoration not found');
        const layer = decResult.rows[0].layer;
        // Remove existing decoration(s) for this layer on this room
        await query(
            `DELETE urd FROM user_room_decoration urd
             JOIN room_decoration rd ON rd.roomDecorationID = urd.roomDecorationID
             WHERE urd.roomID = ? AND rd.layer = ?`,
            [roomId, layer]
        );
        // Insert the new decoration
        const { rows } = await query(
            'INSERT INTO user_room_decoration (roomID, roomDecorationID) VALUES (?, ?)',
            [roomId, decorationId]
        );
        return { insertedId: rows.insertId };
    }

    async addRoom(userID, roomName, upperTemp, lowerTemp, lightLevel, humidity){
        const { rows } = await query(
            'INSERT INTO room (userID, roomName, upperTemp, lowerTemp, lightLevel, humidity) VALUES (?, ?, ?, ?, ?, ?)',
            [userID, roomName, upperTemp, lowerTemp, lightLevel, humidity]
        );
        return rows.insertId;
    }

}
export default new RoomRepository();
