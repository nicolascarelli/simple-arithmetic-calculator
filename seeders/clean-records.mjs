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
  if (err) {
    console.error('Error connecting to db:', err);
    return;
  }

  const checkTableQuery = "SHOW TABLES LIKE 'record'";

  connection.query(checkTableQuery, (err, result) => {
    if (err) {
      console.error('Error checking table existence:', err);
      connection.end();
      return;
    }

    if (result.length > 0) {
      const deleteQuery = 'DELETE FROM record';

      connection.query(deleteQuery, (err, result) => {
        if (err) {
          console.error('Error executing delete query:', err);
        } else {
          console.log(`Deleted ${result.affectedRows} row(s).`);
        }
        connection.end();
      });
    } else {
      console.log('Table "record" does not exist.');
      connection.end();
    }
  });
});
