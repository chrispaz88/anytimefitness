const db = require("../models/firebasease"); //para evvitar problemas con firebase
const { response, request } = require("express");
const path = require("path");

const getAllPlatillos = async (req = request, res = response) => {
    try {
        const platillosSnapshot = await db.collection("platillos").get();

        const platillos = platillosSnapshot.docs.map(doc => {
            const data = doc.data();
            // Incluir el ID del documento en los datos del platillo
            return { id: doc.id, ...data };
        });

        res.json(platillos);
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        res.status(500).json({ success: false, error: "Error al obtener los platillos" });
    }
}


const getPlatilloid = async(req=request, res=response)=>{
    const {id} = req.params   
    const platilloDoc = await db.collection("platillos").doc(id).get();
    const producto = platilloDoc.data()
    
    res.json(producto)
    
}


const putPlatillo = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    
    try {
        let fotoPath = ""; // Inicializar la ruta de la foto como vacía
        
        // Verificar si hay una foto adjunta
        if (req.files && req.files.foto) {
            const { foto } = req.files;
            // Mover archivos cargados a carpeta updates
            const uploadPath = path.join(__dirname, "../public/updates", foto.name);
            const uploadPathFire = path.join("../updates", foto.name);
            await foto.mv(uploadPath);
            fotoPath = uploadPathFire.replace(/\\/g, "/"); // Obtener la ruta de la foto
        }

        // Crear el objeto de platillo a actualizar
        const platilloNuevo = {
            nombre: nombre,
            precio: Number(precio),
            descripcion: descripcion,
        };

        // Agregar la ruta de la foto si existe
        if (fotoPath) {
            platilloNuevo.foto = fotoPath;
        }
        
        // Actualizar datos del platillo en la base de datos
        await db.collection("platillos").doc(id).update(platilloNuevo);

        // Enviar respuesta de éxito
        res.json({ success: true });
    } catch (error) {
        // Manejo de errores
        console.error("Error al cargar el platillo:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const deletePlatillo = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        // Eliminar el platillo de la base de datos
        await db.collection("platillos").doc(id).delete();

        // Enviar respuesta de éxito
        res.json({ success: true });
    } catch (error) {
        // Manejo de errores
        console.error("Error al borrar el platillo:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


const addPlatillo = async (req = request, res = response) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, precio, descripcion } = req.body;
    const { foto } = req.files;

    // Definir la ruta de destino para la imagen
    const uploadPath = path.join(__dirname, "../public/updates", foto.name);

    // Mover la imagen al directorio de actualizaciones
    await foto.mv(uploadPath);

    // Crear un nuevo platillo en la base de datos
    const platilloNuevo = {
      nombre,
      precio: Number(precio),
      descripcion,
      foto: `/updates/${foto.name}` // Ruta relativa al directorio de actualizaciones
    };
    await db.collection("platillos").add(platilloNuevo);

    // Enviar respuesta de éxito
    res.status(200).json({ success: true });
  } catch (error) {
    // Manejar errores
    console.error("Error al cargar el platillo:", error);
    res.status(500).json({ success: false, error: "Error al cargar el platillo" });
  }
};

module.exports ={
    getAllPlatillos,
    getPlatilloid,
    putPlatillo,
    deletePlatillo,
    addPlatillo

}