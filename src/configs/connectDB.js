import mysql from "mysql2/promise"
let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: 'test'
});
export default pool;