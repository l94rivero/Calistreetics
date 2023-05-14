const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error(`Error al conectar a la base de datos: ${error.stack}`);
        return;
    }
    console.log(`Conexión a la base de datos establecida con ID: ${connection.threadId}`);
});

// Configuración de cors y body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validar si el usuario ya existe en la base de datos
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(selectQuery, [email], (error, result) => {
        if (error) {
            console.error(`Error al consultar la base de datos: ${error.stack}`);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (result.length > 0) {
            return res.status(409).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Cifrar la contraseña del usuario antes de almacenarla en la base de datos
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                console.error(`Error al cifrar la contraseña: ${error.stack}`);
                return res.status(500).json({ message: 'Error interno del servidor' });
            }

            // Insertar al usuario en la base de datos
            const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            connection.query(insertQuery, [username, email, hash], (error) => {
                if (error) {
                    console.error(`Error al insertar al usuario en la base de datos: ${error.stack}`);
                    return res.status(500).json({ message: 'Error interno del servidor' });
                }

                // Generar un token de acceso para el usuario recién registrado
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.status(201).json({ token });
            });
        });
    });
});


// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Buscar usuario en la base de datos
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = jwt.sign({ email: user.email }, 'secret');
            res.json({ message: 'Inicio de sesión correcto', token });
        } else {
            res.json({ message: 'Credenciales incorrectas' });
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});
