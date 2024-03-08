const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require('cors');
const path = require("path");

class Server {
  constructor() {
    this.port = process.env.PORT_FRONT
    this.app = express();
    this.RoutePathUsers = "/"

    //middlewares
    this.middlewares()

    //rutas app 
    this.routes();

  }

  middlewares(){
    
    this.app.use(cors());
    
    // Middleware para parsear datos codificados en URL en el cuerpo de la solicitud
    this.app.use(express.urlencoded({ extended: true }));

    //parceo y lectura de body
    this.app.use(express.json()) 
    this.app.use(express.text())


    //fileupload 
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }))

    //plantillas
    this.app.set("view engine", "hbs")

    this.app.set("views", path.join(__dirname, "../public/views"));

    //directorio publico
    this.app.use(express.static(path.join(__dirname, '../public')))
    this.app.use(express.static(path.join(__dirname, '../../services/public')))


  }

  routes() {

    this.app.use(this.RoutePathUsers, require(path.join(__dirname, '../routes/index.routes')))
 
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("http://localhost:" + this.port);
    });
  }
}

module.exports = Server