const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu jevha MySQL install kela tevha username 'root' asel
    password: 'admin1234',      // Password empty asel tar '' rhavar
    database: 'student112'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});


// API: Get Data (Read)
app.get('/students', (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) return res.json({ Message: "Server Error" });
        return res.json(results);
    });
});

// API: Insert Data (Create)
app.post('/students', (req, res) => {
    const sql = "INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.course
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: "Error inserting data" });
        return res.json({ success: "Student Added Successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});