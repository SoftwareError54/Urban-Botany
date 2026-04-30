import pool from '../config/db.js' ;
import {query} from '../config/db.js';
import User from'../Entities/User.js';

class UserRepository {
    async findUserByEmail(email) {
        const result = await query('SELECT * FROM user WHERE email = ?', [email]);
        const rows = result.rows;
        console.log(rows);
        if (rows.length > 0) {
            const user = rows[0];
            return new User(
                user.userID,
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

    async findUserByEmailOrUsername(identifier) {
        const result = await query('SELECT * FROM user WHERE email = ? OR userName = ?', [identifier, identifier]);
        const rows = result.rows;
        if (rows.length > 0) {
            const user = rows[0];
            return new User(
                user.userID,
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

    async findUserByDetails(email, userName, phoneNum) {
        const result = await query('SELECT * FROM user WHERE email = ? OR userName = ? OR phoneNum = ?', [email, userName, phoneNum]);
        const rows = result.rows;
        console.log(rows);
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

    async createUser(userName, hashedPassword, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode) {
        const {rows} = await query(
            'INSERT INTO user (userName, password, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userName, hashedPassword, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode]
        );
        return rows.insertId;
    }
}
export default new UserRepository();