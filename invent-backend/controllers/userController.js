const connection = require("../conexion");
const jwt = require("jsonwebtoken");

const claveScreta = "claveSecreta";

// Hacemos un login
const login = (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al hacer login" });
        return;
      }

      if (result.length === 0) {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        return;
      }

      // Generamos un token
      const token = jwt.sign({ name: result[0].name }, claveScreta, {
        expiresIn: "30d",
      });

      res.json({ token, name: result[0].name, lastName: result[0].lastName });
    }
  );
};

// Sacamos todos los usuarios
const getUsers = (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta: ", err);
      res.status(500).json({ error: "Error al hacer login" });
      return;
    }

    res.json(result);
  });
};

module.exports = {
  login,
  getUsers,
};
