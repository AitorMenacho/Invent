const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Configuramos express para que entienda peticiones con el body codificado en JSON
app.use(express.json());

// Configuramos CORS para que no nos bloqueen las peticiones desde el frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

// Configuramos las rutas
app.use("/", require("./routes/api"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
