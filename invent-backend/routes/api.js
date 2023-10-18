const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/shipmentsController");
const transportsController = require("../controllers/transportsController");
const userController = require("../controllers/userController");

// Middleware
const auth = require("../middleware/auth");

// Rutas
router.get("/shipments", auth, shipmentsController.getShipments);
router.post("/shipments", auth, shipmentsController.createShipment);
router.delete("/shipments/:id", auth, shipmentsController.deleteShipment);

router.get("/transports", auth, transportsController.getTransports);
router.delete("/transports/:id", auth, transportsController.deleteTransport);
router.post("/transports", auth, transportsController.createTransport);
router.put("/transports/:id", auth, transportsController.editTransport);

router.post("/login", userController.login);
router.get("/users", auth, userController.getUsers)

module.exports = router;
