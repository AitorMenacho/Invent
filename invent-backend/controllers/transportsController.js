const connection = require("../conexion");

// Traemos los datos de la tabla de transportes
const getTransports = (req, res) => {
  connection.query("SELECT * FROM transport", (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta: ", err);
      res.status(500).json({ error: "Error al obtener los transportes" });
      return;
    }

    res.json(result);
  });
};

// Creamos un nuevo transporte
const createTransport = (req, res) => {
  const { companny, zip } = req.body;

  connection.query(
    "INSERT INTO transport (companny, zip) VALUES (?, ?)",
    [companny, zip],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al crear el transporte" });
        return;
      }

      res.json(result);
    }
  );
};

// Editamos un transporte
const editTransport = (req, res) => {
  const { companny, zip } = req.body;
  const { id } = req.params;

  connection.query(
    "UPDATE transport SET companny = ?, zip = ? WHERE id = ?",
    [companny, zip, id],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al editar el transporte" });
        return;
      }

      res.json(result);
    }
  );
};

// Eliminamos un transporte
const deleteTransport = (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM transport WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al eliminar el transporte" });
        return;
      }

      res.json(result);
    }
  );
};

module.exports = {
  getTransports,
  createTransport,
  editTransport,
  deleteTransport
};
