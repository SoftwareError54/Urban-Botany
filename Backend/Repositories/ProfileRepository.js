import {query} from '../config/db.js';
import User from '../Entities/User.js';


class ProfileRepository {
    constructor() {
        this.allowedUpdateFields = new Set([
            'userName',
            'email',
            'DoB',
            'FName',
            'SName',
            'phoneNum',
            'addressLine1',
            'addressLine2',
            'city',
            'region',
            'postalCode',
            'countryCode'
        ]);
    }

    async getProfileByUserId(userId) {
        const result = await query('SELECT userName, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode FROM user WHERE userID = ?', [userId]);
        const rows = result.rows;
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    async getUserByID(userId){
        const result = await query('SELECT * FROM user WHERE id = ?', [userId]);
        const rows = result.rows;
        if (rows.length > 0) {
            const user = rows[0];
            return new User(
                user.id,
                user.userName,
                user.password,
                user.email,
                user.DoB,
                user.FName,
                user.SName,
                user.phoneNum,
                user.points,
                user.addressLine1,
                user.addressLine2,
                user.city,
                user.region,
                user.postalCode,
                user.countryCode
            );
        }
        return null;
    };

    async updateUser(userId, userName, email, DoB, FName, SName, phoneNum, addressLine1, addressLine2, city, region, postalCode, countryCode) {
        const {rows} = await query(
            'UPDATE user SET userName = ?, email = ?, DoB = ?, FName = ?, SName = ?, phoneNum = ?, addressLine1 = ?, addressLine2 = ?, city = ?, region = ?, postalCode = ?, countryCode = ? WHERE id = ?',
            [userName, email, DoB, FName, SName, phoneNum, addressLine1, addressLine2, city, region, postalCode, countryCode, userId]
        );
        return rows;
    }

    async updateField(userId, field, value) {
        if (!this.allowedUpdateFields.has(field)) {
            throw new Error('Invalid or disallowed field for update');
        }
        const sql = `UPDATE user SET ${field} = ? WHERE id = ?`;
        const { rows } = await query(sql, [value, userId]);
        return rows;
    }

    async updateFields(userId, updates = {}) {
        const keys = Object.keys(updates).filter(k => this.allowedUpdateFields.has(k));
        if (keys.length === 0) {
            throw new Error('No valid fields provided for update');
        }
        const assignments = keys.map(k => `${k} = ?`).join(', ');
        const values = keys.map(k => updates[k]);
        const sql = `UPDATE user SET ${assignments} WHERE id = ?`;
        const { rows } = await query(sql, [...values, userId]);
        return rows;
    }

    // For security: this expects the caller to pass a hashed password
    async updatePassword(userId, hashedPassword) {
        if (!hashedPassword) throw new Error('Password must be provided');
        const { rows } = await query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, userId]);
        return rows;
    }

    async addPoints(userId, points) {
        if (!userId) throw new Error('userId is required');
        if (!points || points <= 0) throw new Error('points must be a positive number');
        const { rows } = await query('UPDATE user SET points = points + ? WHERE userID = ?', [points, userId]);
        return rows;
    }
}

export default new ProfileRepository();
