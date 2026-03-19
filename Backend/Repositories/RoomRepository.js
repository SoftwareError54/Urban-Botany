import { query } from '../config/db.js';
import Room from '../Entities/Room.js';
import RoomDecoration from '../Entities/RoomDecoration.js';

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
        const result = await query("SELECT * FROM plant_decoration");
        const rows = result.rows;
        return rows.map(d => new RoomDecoration(d.plantDecorationID, d.imagePointer, d.isStatic, d.type, d.cost, d.colour1, d.colour2));
    }

    async getRoomDecorationById(decorationId){
        const result = await query("SELECT * FROM plant_decoration WHERE plantDecorationID = ?", [decorationId]);
        const rows = result.rows;
        if (rows===0){
            return null;
        }
        const d = rows[0];
        return new RoomDecoration(d.roomDecorationID, d.imagePointer, d.isStatic, d.type, d.cost, d.colour1, d.colour2);
    }

    async getDecorationsByRoomId(roomId){
        const result = await query("SELECT roomDecorationID, imagePointer, isStatic, type, cost, colour1, colour2 FROM user_room_decoration JOIN user_rooms USING (userRoomID) WHERE userRoomID = ?", [roomId]);
        const rows = result.rows;
        if (rows === 0){
            return null;
        }
        return rows.map(d => new PlantDecoration(d.roomDecorationID, d.imagePointer, d.isStatic, d.type, d.cost, d.colour1, d.colour2));
    }

    async getRoomDecorationById(decorationId){
        const result = await query("SELECT * FROM room_decoration where roomDecorationID = ?", [decorationId]);
        const rows = result.rows;
        if (rows === 0){
            return null;
        }
        const d = rows[0];
        return new RoomDecoration(d.roomDecorationID, d.imagePointer, d.isStatic, d.type, d.cost, d.colour1, d.colour2);
    }

    async addDecoration(decorationId, roomId){
        const decoration = await this.getDecorationByID;
        if (!decoration){
            return null;
        }
        await query("INSERT INTO user_room_decoration")
        
        const result = await query("INSERT INTO user_room_decoration VALUES [?,?,?,?,?,?,?]",
            [roomId, decorationId, decoration.colour1, decoration.colour2]);
        return decoration;   
    }

}
export default new RoomRepository();
