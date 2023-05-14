// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'calistreetics'
});

// Inicializar la aplicación de Express
const app = express();

// Configurar bodyParser para analizar solicitudes JSON
app.use(bodyParser.json());

// Definir ruta para registro de usuarios
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validar que se proporcionaron todos los campos necesarios
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor proporcione todos los campos requeridos.' });
  }

  // Verificar si el usuario ya existe en la base de datos
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al verificar si el usuario ya existe.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese correo electrónico.' });
    }

    // Cifrar la contraseña del usuario antes de almacenarla en la base de datos
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al cifrar la contraseña.' });
      }

      // Insertar el nuevo usuario en la base de datos
      connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error al insertar el usuario en la base de datos.' });
        }

        // Generar un token de autenticación para el nuevo usuario
        const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });

        // Enviar la respuesta con el token
        res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
      });
    });
  });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}.`);
});
