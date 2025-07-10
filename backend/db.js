const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // your MySQL username
  password: 'Gayathri@24',           // your MySQL password
  database: 'medical_ai'  // your DB name
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

module.exports = db;
