const { Router } = require("express");
const { general, menu, 
  about, formulario, 
  signup, 
   menuAdmin, 
  mostrarProducto, 
  chat,
  autenticacion,
  login,
  aboutA,
  aboutN,
  signupNormal,
  menuNormal,
  indexA,
  indexN,
  reset,
  updPasswordA,
  updPasswordN,
  } = require("../../frontend/controllers/index.controllers");
const {validarJWTAdmin, validarJWTNormal} = require("../middlewares/verificarJWT");

const router = Router()

  router.get("/", general );
  router.get("/A",validarJWTAdmin, indexA );
  router.get("/N",validarJWTNormal, indexN );

  router.get("/menu", menu);

  router.get("/about", about);

  router.get("/aboutN",validarJWTNormal, aboutN);

  router.get("/aboutA",validarJWTAdmin , aboutA);
  
  router.get("/producto",validarJWTAdmin, formulario);
  
  router.get("/signup", signup);
  
  router.get("/menuN",validarJWTNormal, menuNormal);
  router.get("/menuA",validarJWTAdmin, menuAdmin);
  
  router.get("/producto/:id",validarJWTAdmin, mostrarProducto);

  //chat
  router.get("/chat", chat)

  //autenticacion
  
  router.get("/autenticar",autenticacion)

  //login
  router.get("/login", login )
  router.post("/login", autenticacion )
  
  
  //registro
  router.get("/registroA",validarJWTAdmin, signup )
  router.get("/registro", signupNormal )

  //recuperar contraseña
  router.get("/reset", reset )
  
  //actualizar contraseña
  router.get("/updPasswordN",validarJWTNormal, updPasswordN )
  router.get("/updPasswordA",validarJWTAdmin, updPasswordA )
  
  

module.exports = router