// let users = [];

// export async function findUserByEmail(email) {
//     return users.find(user => user.email === email);
// }

// export async function createUser(user){
//     users.push(user);
//     return user;
// }


import connection from '../config/db' ;
import User from'../Entities/User';

class UserRepository {
    async findUserByEmail(email) {
        const db = await connection.getConnection();
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);    
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
        const db = await connection.getConnection();
        const [result] = await db.execute(
            'INSERT INTO users (username, password, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode]
        );
        return result.insertId;
    }
}
export default new UserRepository();