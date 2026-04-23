import { query } from '../config/db.js';

class ShopRepository {
    async getUserPoints(userId) {
        const { rows } = await query('SELECT points FROM user WHERE userID = ?', [userId]);
        if (!rows || rows.length === 0) throw new Error('User not found');
        return rows[0].points;
    }

    async deductPoints(userId, amount) {
        const { rows } = await query(
            'UPDATE user SET points = points - ? WHERE userID = ? AND points >= ?',
            [amount, userId, amount]
        );
        if (rows.affectedRows === 0) throw new Error('Insufficient points');
        return true;
    }

    async getPlantDecorationCost(decorationId) {
        const { rows } = await query('SELECT cost FROM plant_decoration WHERE plantDecorationID = ?', [decorationId]);
        if (!rows || rows.length === 0) throw new Error('Decoration not found');
        return rows[0].cost;
    }

    async getRoomDecorationCost(decorationId) {
        const { rows } = await query('SELECT cost FROM room_decoration WHERE roomDecorationID = ?', [decorationId]);
        if (!rows || rows.length === 0) throw new Error('Decoration not found');
        return rows[0].cost;
    }

    async assignPlantDecoration(userPlantId, decorationId) {
        // Get decoration colours
        const { rows: decRows } = await query(
            'SELECT colour1, colour2 FROM plant_decoration WHERE plantDecorationID = ?',
            [decorationId]
        );
        if (!decRows || decRows.length === 0) throw new Error('Decoration not found');
        const { colour1, colour2 } = decRows[0];

        // Upsert: insert new ownership row (toggled=0), or update colours if already owned
        await query(
            `INSERT INTO user_plant_decoration (userPlantID, plantDecorationID, colour1, colour2, toggled)
             VALUES (?, ?, ?, ?, 0)
             ON DUPLICATE KEY UPDATE colour1 = VALUES(colour1), colour2 = VALUES(colour2)`,
            [userPlantId, decorationId, colour1 ?? '', colour2 ?? '']
        );
    }

    async assignRoomDecoration(roomId, decorationId) {
        // Get the layer of this decoration
        const { rows: decRows } = await query(
            'SELECT layer, colour1, colour2 FROM room_decoration WHERE roomDecorationID = ?',
            [decorationId]
        );
        if (!decRows || decRows.length === 0) throw new Error('Decoration not found');
        const { layer, colour1, colour2 } = decRows[0];

        // Un-toggle all decorations on the same layer for this room
        const { rows: sameLayer } = await query(
            'SELECT roomDecorationID FROM room_decoration WHERE layer = ?',
            [layer]
        );
        for (const row of sameLayer) {
            await query(
                'UPDATE user_room_decoration SET toggled = 0 WHERE roomID = ? AND roomDecorationID = ?',
                [roomId, row.roomDecorationID]
            );
        }

        // Upsert the chosen decoration as toggled = 1
        const { rows: existing } = await query(
            'SELECT * FROM user_room_decoration WHERE roomID = ? AND roomDecorationID = ?',
            [roomId, decorationId]
        );
        if (existing && existing.length > 0) {
            await query(
                'UPDATE user_room_decoration SET toggled = 1, colour1 = ?, colour2 = ? WHERE roomID = ? AND roomDecorationID = ?',
                [colour1 ?? '', colour2 ?? '', roomId, decorationId]
            );
        } else {
            await query(
                'INSERT INTO user_room_decoration (roomID, roomDecorationID, colour1, colour2, toggled) VALUES (?, ?, ?, ?, 1)',
                [roomId, decorationId, colour1 ?? '', colour2 ?? '']
            );
        }
    }
}

export default new ShopRepository();
