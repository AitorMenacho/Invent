const connection = require("../conexion");

// Traemos los datos de la tabla de envíos
const getShipments = (req, res) => {
  connection.query("SELECT * FROM shipments", (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta: ", err);
      res.status(500).json({ error: "Error al obtener los envíos" });
      return;
    }

    res.json(result);
  });
};

// Creamos un nuevo envío
const createShipment = (req, res) => {
  const {
    destiny,
    zip,
    destinationName,
    senderName,
    weight,
    transport,
    price,
  } = req.body;

  connection.query(
    "INSERT INTO shipments (destiny, zip, destinationName, senderName, weight, transport, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [destiny, zip, destinationName, senderName, weight, transport, price],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al crear el envío" });
        return;
      }

      // Devolvemos true si se ha creado correctamente
      const created = result.affectedRows === 1;
      res.json(created);
    }
  );
};

// Eliminar un envío
const deleteShipment = (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM shipments WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta: ", err);
        res.status(500).json({ error: "Error al eliminar el envío" });
        return;
      }

      // Devolvemos true si se ha eliminado correctamente
      const deleted = result.affectedRows === 1;
      res.json(deleted);
    }
  );
};

module.exports = {
  getShipments,
  createShipment,
  deleteShipment,
};
