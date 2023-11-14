const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

// Crear una única instancia de la base de datos
const db = new sqlite3.Database("database.db");

// Middleware para proporcionar la instancia de la base de datos en las rutas
app.use((req, res, next) => {
  req.db = db;
  next();
});

db.run(
  "CREATE TABLE IF NOT EXISTS registros (DNI TEXT, nombre TEXT, apellido TEXT, telefono TEXT, email TEXT, contraseña TEXT)",
  (err) => {
    if (err) {
      console.error("Error al crear la tabla:", err);
    }
  }
);

app.post("/registrar", (req, res) => {
  const { DNI, nombre, apellido, telefono, email, contraseña } = req.body;

  req.db.run(
    "INSERT INTO registros (DNI, nombre, apellido, telefono, email, contraseña) VALUES (?, ?, ?, ?, ?, ?)",
    [DNI, nombre, apellido, telefono, email, contraseña],
    (err) => {
      if (err) {
        console.error("Error al registrar:", err);
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  req.db.get(
    "SELECT email, contraseña FROM registros WHERE email = ? AND contraseña = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error("Error al iniciar sesión:", err);
        res.json({ success: false });
      } else if (row) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.post("/verificarCorreo", (req, res) => {
    const { correo } = req.body;
  
    req.db.get(
      "SELECT COUNT(*) as count FROM registros WHERE email = ?",
      [correo],
      (err, row) => {
        if (err) {
          console.error("Error al verificar el correo electrónico:", err);
          res.status(500).json({ correoRepetido: false });
        } else {
          const correoRepetido = row.count > 0;
          res.json({ correoRepetido });
        }
      }
    );
  });
  

app.get("/", (req, res) => {
  res.send("Ejecución correcta.");
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
