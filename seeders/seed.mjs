import dotenv from 'dotenv';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;

  bcrypt.hash(process.env.USER_PASSWORD, 10, (err, hashedPassword) => {
    if (err) throw err;

    const user = {
      username: process.env.USER_USERNAME,
      password: hashedPassword,
      status: 'active',
      balance: 10000,
    };
    const query = 'INSERT INTO user SET ?';

    connection.query(query, user, (err) => {
      if (err) throw err;

      console.log('User inserted into the database.');
      connection.end();
    });
  });
});
