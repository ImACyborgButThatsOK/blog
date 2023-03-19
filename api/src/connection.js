import mysql2 from "mysql2";

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "blog",
});

export default connection;
