const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '58915281', 
  database: 'ecommerce_db',
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER, 
  // password: process.env.DB_PASSWORD, 
  // database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error in Connect wiht Database:', err.stack);
    return;
  }
  console.log('Connected with Database With ID ' + connection.threadId);
});


module.exports = connection;
