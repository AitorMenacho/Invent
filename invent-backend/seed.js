const mysql = require("mysql2/promise"); // Importa la versión basada en promesas de mysql2

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  try {
    // Creamos la base de datos si no existe
    await connection.query("CREATE DATABASE IF NOT EXISTS invent");

    // Usamos la base de datos
    await connection.query("USE invent");

    // Creamos las tablas de forma secuencial
    await createTable(
      connection,
      "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), email VARCHAR(255), password VARCHAR(255), rol VARCHAR(30))"
    );

    await createTable(
      connection,
      "CREATE TABLE IF NOT EXISTS transport (id INT AUTO_INCREMENT PRIMARY KEY, company VARCHAR(30), zip VARCHAR(255))"
    );

    await createTable(
      connection,
      "CREATE TABLE IF NOT EXISTS shipments (id INT AUTO_INCREMENT PRIMARY KEY, destiny VARCHAR(255), zip VARCHAR(5), destinationName VARCHAR(255), senderName VARCHAR(255), weight DECIMAL(10,2), transport VARCHAR(255), price DECIMAL(10,2))"
    );

    // Creamos los usuarios
    const users = [
      {
        name: "Manuel Cano Barragan",
        email: "prueba@gmail.com",
        password: "123456",
        rol: "Repartidor",
      },
      {
        name: "Juan Perez Sola",
        email: "juan@gmail.com",
        password: "123456",
        rol: "Repartidor",
      },
      {
        name: "Aitor Menacho Vega",
        email: "aitor@gmail.com",
        password: "123456",
        rol: "Administrador",
      },
    ];

    await insertData(connection, "user", users);

    // Creamos el transporte
    const transport = [
      {
        company: "Correos",
        zip: "15,16,17,18,19",
      },
      {
        company: "Seur",
        zip: "20,21,22,23,24,25",
      },
      {
        company: "Planet Express",
        zip: "31,32,33,34,35",
      },
    ];

    await insertData(connection, "transport", transport);

    // Creamos los envíos
    const shipments = [
      {
        destiny: "Calle de la piruleta 1, Madrid",
        zip: "28001",
        destinationName: "Manuel Cano Barragan",
        senderName: "Juan Perez Sola",
        weight: 10,
        transport: "Invent",
        price: 135,
      },
      {
        destiny: "Sector Nueva, 36",
        zip: "34316",
        destinationName: "Manuel Cano Barragan",
        senderName: "Juan Perez Sola",
        weight: 3.5,
        transport: "Planet Express",
        price: 35,
      },
      {
        destiny: "Ronda Nueva, 72",
        zip: "18230",
        destinationName: "Manuel Cano Barragan",
        senderName: "Juan Perez Sola",
        weight: 5.5,
        transport: "Correos",
        price: 108,
      },
    ];

    await insertData(connection, "shipments", shipments);
  } catch (err) {
    console.error("Error al crear la base de datos y las tablas:", err);
  } finally {
    await connection.end();
  }
}

async function createTable(connection, sql) {
  const [rows, fields] = await connection.query(sql);
  console.log("Tabla creada con éxito:", fields);
}

async function insertData(connection, table, data) {
  const columns = Object.keys(data[0]).join(", ");
  const values = data
    .map((item) => {
      const itemValues = Object.values(item).map((value) => {
        if (typeof value === "string") {
          return `"${value}"`;
        } else {
          return value;
        }
      });
      return `(${itemValues.join(", ")})`;
    })
    .join(", ");
  const insertQuery = `INSERT INTO ${table} (${columns}) VALUES ${values}`;
  const [result] = await connection.query(insertQuery);
  console.log(`Datos insertados en la tabla ${table}: ${result.affectedRows}`);
}

seedDatabase();
