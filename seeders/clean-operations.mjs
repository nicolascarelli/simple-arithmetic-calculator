import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;

  const query = 'DELETE FROM record';

  connection.query(query, (err, result) => {
    if (err) throw err;

    console.log(`Deleted ${result.affectedRows} row(s).`);
    connection.end();
  });
});