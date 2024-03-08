const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require('cors');

class Server {
  constructor() {
    this.port = process.env.PORT_SERVICE
    this.app = express();
    this.RouteApi = "/services/api"

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

    //directorio publico
    this.app.use(express.static('public'))

  }

  routes() {

    this.app.use(this.RouteApi, require('../routes/api.routes'))
 
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("http://localhost:" + this.port);
    });
  }
}

module.exports = Server