const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("database.db");

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

    db.run(
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

app.get("/", (req, res) => {
    res.send("Ejecución correcta.");
  });

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
