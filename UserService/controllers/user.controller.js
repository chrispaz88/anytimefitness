const db = require("../models/firebase");
const { response, request } = require("express");
const path = require("path");
const bcrypt = require("bcryptjs")

const getUserByUsername = async (req = request, res = response) => {
  const { usuario } = req.params;

  try {
    const querySnapshot = await db.collection("usuariosAdmin").where("usuario", "==", usuario).get();

    if (querySnapshot.empty) {
      console.log("No se encontró ningún usuario con el nombre de usuario:", usuario);
      res.send("0");
      return;
    }

    // Suponiendo que solo esperas un resultado, obtén el primer documento de la consulta
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    res.json(userData);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ success: false, error: "Error al obtener el usuario" });
  }
};


const getAllUsers = async(req=request, res=response)=>{
  try {
    const usuariosSnapshot = await db.collection("usuariosAdmin").get();

    const usuarios = usuariosSnapshot.docs.map(doc => {
        const data = doc.data();
        // Incluir el ID del documento en los datos del platillo
        return { id: doc.id, ...data };
    });

    res.json(usuarios);
  } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({ success: false, error: "Error al obtener los platillos" });
  }
}

const createUser = async (req = request, res = response) => {
  try {
      const { username, password, isAdmin } = req.body;
      const isAdminBool = isAdmin === "true"

      // Verificar si el usuario ya existe
      const existingUserQuery = await db.collection("usuariosAdmin").where("usuario", "==", username).limit(1).get();
      if (!existingUserQuery.empty) {
          return res.status(400).json({ success: false, error: "El usuario ya existe" });
      }

      // Hash del password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear el usuario en la base de datos
      await db.collection("usuariosAdmin").add({ usuario:username, password: hashedPassword, isAdmin:isAdminBool });

      res.send("1")
  } catch (error) {
      console.error("Error al crear usuario:", error);
      res.send("0")
  }
};

const updateUserPassword = async (req = request, res = response) => {
  try {
    const { usuario } = req.params;
    const { password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const userQuery = await db.collection("usuariosAdmin").where("usuario", "==", usuario).limit(1).get();
    if (userQuery.empty) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Obtener el ID del usuario
    const userId = userQuery.docs[0].id;

    // Hash del password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Actualizar la contraseña del usuario en la base de datos
    await db.collection("usuariosAdmin").doc(userId).update({ password:hashedPassword });

    // Enviar respuesta de éxito
    res.json({ success: true, message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ success: false, error: "Error al actualizar la contraseña" });
  }
};

module.exports={
  getUserByUsername,
  updateUserPassword,
  getAllUsers,
  createUser
}