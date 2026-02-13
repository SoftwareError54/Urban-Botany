// let users = [];

// export async function findUserByEmail(email) {
//     return users.find(user => user.email === email);
// }

// export async function createUser(user){
//     users.push(user);
//     return user;
// }


import pool from '../config/db.js' ;
import query from '../config'
import User from'../Entities/User.js';

class UserRepository {
    async findUserByEmail(email) {
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);    
        if (rows.length > 0) {
            const user = rows[0];
            return new User(
                user.id,
                user.username,
                user.password,
                user.email,
                user.DoB,
                user.FName,
                user.SName,
                user.PhoneNumber,
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

    async createUser(username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode) {
        const [result] = await query(
            'INSERT INTO users (username, password, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode]
        );
        return result.insertId;
    }
}
export default new UserRepository();