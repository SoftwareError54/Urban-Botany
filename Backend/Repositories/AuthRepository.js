// let users = [];

// export async function findUserByEmail(email) {
//     return users.find(user => user.email === email);
// }

// export async function createUser(user){
//     users.push(user);
//     return user;
// }


const connection = await import('../Database/Database.js');
const User = require('../Entities/User.js');

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
                user.address
            );
        }
        return null;
    };

    async createUser(username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, address
    ) {
        const db = await connection.getConnection();
        const [result] = await db.execute(
            'INSERT INTO users (username, password, email, DoB, FName, SName, PhoneNumber, points, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, address]
        );
        return result.insertId;
    }
}