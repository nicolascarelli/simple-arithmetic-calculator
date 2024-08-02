import dotenv from 'dotenv';
import mysql from 'mysql';
import bcrypt from 'bcryptjs';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      status ENUM('active', 'inactive') DEFAULT 'active',
      balance DECIMAL(10, 2) DEFAULT 70000.00
    )
  `;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }

  console.log('hashing password');
  bcrypt.hash(process.env.USER_PASSWORD, 10, (err, hashedPassword) => {
    if (err) {
      console.error('An error occurred:', err);
      process.exit(1);
    }

    const user = {
      username: process.env.USER_USERNAME,
      password: hashedPassword,
      status: 'active',
      balance: process.env.USER_BALANCE,
    };
    const query = 'INSERT INTO user SET ?';

    connection.query(query, user, (err) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('User inserted into the database.');
      }
      connection.end();
    });
  });
});
