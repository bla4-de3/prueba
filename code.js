const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Configuración del middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// Vulnerabilidad de Inyección SQL
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Vulnerabilidad XSS
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  const response = `<p>New comment: ${comment}</p>`;
  res.send(response);
});

// Vulnerabilidad de exposición de datos sensibles
app.get('/config', (req, res) => {
  const config = {
    dbHost: 'localhost',
    dbUser: 'root',
    dbPassword: 'password'
  };
  res.send(config);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
