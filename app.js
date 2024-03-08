require("dotenv").config()

const claseServerBack = require('./UserService/models/serverBack')
const claseServerFront = require('./frontend/models/serverFront')
const claseServerProductos = require('./services/ProductService/models/serverProductos')

const serverBack = new claseServerBack();
const serverFront = new claseServerFront();
const serverProductos = new claseServerProductos();

serverFront.listen()
serverBack.listen()
serverProductos.listen()

