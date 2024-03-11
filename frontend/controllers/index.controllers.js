
const { response, request } = require("express");
const path = require("path");
const bcrypt = require('bcryptjs');
const axios = require('axios');
const fs = require('fs');
const { generatJWT } = require("../helpers/generar_jwt");

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Función para verificar si una contraseña coincide
async function verifyPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}


const general = (req = request, res = response) => {
  res.render("unlogin/index.hbs");
};
const indexA = (req = request, res = response) => {
  res.render("login/indexA.hbs");
};
const indexN = (req = request, res = response) => {
  res.render("login/indexN.hbs");
};


const menu = async (req = request, res = response) => {
  try {
    // Realizar la solicitud GET a la API utilizando Axios
    const response = await axios.get('http://localhost:8000/servicios/api');

    // Verificar si la solicitud fue exitosa
    if (response.status !== 200) {
      throw new Error('No se pudo obtener los datos del servidor.');
    }

    // Obtener los datos de la respuesta
    const servicios = response.data;

    // Agrupar los platillos en grupos de tres
    const serviciosGrupos = [];
    for (let i = 0; i < servicios.length; i += 3) {
      serviciosGrupos.push(servicios.slice(i, i + 3));
    }

    // Renderizar la plantilla con los platillos obtenidos
    res.render("unlogin/menu.hbs", { platillosGrupos: serviciosGrupos });
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    res.status(500).send("Error al obtener los servicios");
  }
};
const menuNormal = async (req = request, res = response) => {
  try {
    // Realizar la solicitud GET a la API utilizando Axios
    const response = await axios.get('http://localhost:8000/servicios/api');

    // Verificar si la solicitud fue exitosa
    if (response.status !== 200) {
      throw new Error('No se pudo obtener los datos del servidor.');
    }

    // Obtener los datos de la respuesta
    const servicios = response.data;

    // Agrupar los platillos en grupos de tres
    const serviciosgrupos = [];
    for (let i = 0; i < servicios.length; i += 3) {
      serviciosgrupos.push(servicios.slice(i, i + 3));
    }

    // Renderizar la plantilla con los platillos obtenidos
    res.render("login/menu.hbs", { platillosGrupos: serviciosgrupos });
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    res.status(500).send("Error al obtener los servicios");
  }
};

const menuAdmin = async (req = request, res = response) => {
  
  try {
    // Realizar la solicitud GET a la API
    const response = await axios.get('http://localhost:8000/servicios/api');

    // Verificar si la solicitud fue exitosa
    if (response.status !== 200) {
      throw new Error('No se pudo obtener los datos del servidor.');
    }

    // Obtener los datos de la respuesta
    const servicios = response.data;

    // Agrupar los platillos en grupos de tres
    const serviciosGrupos = [];
    for (let i = 0; i < servicios.length; i += 3) {
      serviciosGrupos.push(servicios.slice(i, i + 3));
    }

    // Renderizar la plantilla con los platillos obtenidos
    res.render("login/menuAdmin.hbs", { platillosGrupos: serviciosGrupos });
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    res.status(500).send("Error al obtener los servicios");
  }
};

const about = (req = request, res = response) => {
  res.render("unlogin/about.hbs");
};
const aboutA = (req = request, res = response) => {
  res.render("login/about.hbs");
};
const aboutN = (req = request, res = response) => {
  res.render("login/aboutNormal.hbs");
};

const formulario = (req = request, res = response) => {
  res.render("login/nuevoProducto.hbs");
};

const mostrarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
      // Realizar la solicitud HTTP para obtener el producto
      const response = await axios.get(`http://localhost:8000/servicios/api/${id}`);

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
          // Obtener los datos del producto de la respuesta
          const producto = response.data;

          // Agregar el ID del producto a los datos
          producto.ide = id;

          // Renderizar la plantilla con los datos del producto
          res.render("login/modificarProducto.hbs", { producto });
      } else {
          // Si la solicitud no fue exitosa, enviar una respuesta de error
          console.error("Error al cargar el producto:", response.statusText);
          res.header('Content-Type', 'application/json').send({ success: false });
      }
  } catch (error) {
      // Manejar errores
      console.error("Error al cargar el producto:", error);
      res.header('Content-Type', 'application/json').send({ success: false });
  }


};

const login = (req = request, res = response)=>{
  res.render("unlogin/login.hbs")
}

const autenticacion = async (req = request, res = response) => {
  const { username, password } = req.body;
  try {
      // Realizar la petición GET a la URL especificada
      const response = await axios.get(`http://localhost:4500/usuarios/api/${username}`);

      // Verificar si se encontraron credenciales para el usuario
      if (response.data === "0") {
          res.send("0");
          return;
      }

      // Obtener las credenciales del usuario desde la respuesta de la petición
      const credenciales = response.data;

      // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
      const isPasswordValid = await bcrypt.compare(password, credenciales.password);
      
      if (username === credenciales.usuario && isPasswordValid) {
          const token = await generatJWT(credenciales.usuario, credenciales.isAdmin)
          
          res.json({
            state:"1",
            isAdmin:credenciales.isAdmin,
            token
          });

      } else {
          res.json({
            state:"0"
          });
      }
  } catch (error) {
      console.error("Error al autenticar usuario:", error);
      res.json({
        state:"0"
      });
  }
};

const signup = (req = request, res = response) => {
  res.render("login/signupAdmin.hbs");
};
const signupNormal = (req = request, res = response) => {
  res.render("unlogin/signup.hbs");
};
const reset = (req = request, res = response) => {
  res.render("unlogin/resetPassword.hbs");
};

const updPasswordA = (req = request, res = response) => {
  res.render("login/updPasswordA.hbs");
};
const updPasswordN = (req = request, res = response) => {
  res.render("login/updPasswordN.hbs");
};




const chat = (req = request, res = response) => {
  res.render("chat.hbs");
};



module.exports = {
  general,
  menu,
  about,
  formulario,
  signup,
  signupNormal,
  menuAdmin,
  menuNormal,
  mostrarProducto, 
  chat,
  autenticacion,
  login,
  aboutA,
  aboutN,
  indexA,
  indexN,
  reset,
  updPasswordA,
  updPasswordN,
};
