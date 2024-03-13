const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traveling_guide_web'
});

console.log('MySQL connected...');

class DbService {

    async query(sql, values) {
        try {
            const [rows] = await mysqlPool.query(sql, values);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to execute query');
        }
    }

    async getAllData() {
        try {
            const [rows] = await mysqlPool.query("SELECT * FROM users;");
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch data from database');
        }
    }

    async insertData(signup_username, fullName, email, signUp_password) {
        try {
            const [rows] = await mysqlPool.query(
                "INSERT INTO users (username, fullName, email, password) VALUES (?, ?, ?, ?);",
                [signup_username, fullName, email, signUp_password]
            );
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to insert data into database');
        }
    }

    async getUserByUsername(username, password) {
        try {
            const [rows] = await mysqlPool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
            return rows[0];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch user by username');
        }
    }
}

  
module.exports = DbService;

