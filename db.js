const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  connect: () => {
    db.connect((err) => {
      if (err) {
        console.error(`Error connecting to database: ${err.message}`);
        return;
      }
      console.log('Database connected');
    });
  },
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
};
