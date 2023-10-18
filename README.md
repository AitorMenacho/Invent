
# Invent

Gestión de envios.

##  Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener las siguientes dependencias instaladas:

- Node.js y npm
- Angular CLI
- Mysql configurada (Ver `Conexion.js` para detalles)
## Despliegue

### Configuración de la base de datos

Primero, crea la base de datos y agrega datos inciales ejecutando:

```bash
  node seed.js
```

### Backend

Iniciar el servidor backend con el siguiente comando:

```bash
    node index.js
```

Si necesitas cambiar la configuración de acceso a la base de datos, puedes hacerlo en el archivo `Conexion.js`

### Front-end

Para el front-end, primero debes instalar las dependencias:

```bash
    npm install
```

Luego, inicia el proyecto:

```bash
    ng s -o
```


## Tecnologías utilizadas

**Client:** Angular, Angular Material

**Server:** Node, Express


## Authors

- [@AitorMenacho](https://github.com/AitorMenacho)

