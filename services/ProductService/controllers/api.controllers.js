const db = require("../../../UserService/models/firebase"); //para evvitar problemas con firebase
const { response, request } = require("express");
const path = require("path");

const getAllServices = async (req = request, res = response) => {
    try {
        const serviciosSnapshot = await db.collection("servicio").get();

        const servicios = serviciosSnapshot.docs.map(doc => {
            const data = doc.data();
            // Incluir el ID del documento en los datos del platillo
            return { id: doc.id, ...data };
        });

        res.json(servicios);
    } catch (error) {
        console.error("Error al obtener los servicios del gym:", error);
        res.status(500).json({ success: false, error: "Error al obtener los servicios del gym" });
    }
}


const getServicioid = async(req=request, res=response)=>{
    const {id} = req.params   
    const servicioDoc = await db.collection("servicio").doc(id).get();
    const producto = servicioDoc.data()
    
    res.json(producto)
    
}


const putServicio = async (req = request, res = response) => {
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
        const servicioNuevo = {
            nombre: nombre,
            precio: Number(precio),
            descripcion: descripcion,
        };

        // Agregar la ruta de la foto si existe
        if (fotoPath) {
            servicioNuevo.foto = fotoPath;
        }
        
        // Actualizar datos del platillo en la base de datos
        await db.collection("servicio").doc(id).update(servicioNuevo);

        // Enviar respuesta de éxito
        res.json({ success: true });
    } catch (error) {
        // Manejo de errores
        console.error("Error al cargar el servicio:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteServicio = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        // Eliminar el platillo de la base de datos
        await db.collection("servicio").doc(id).delete();

        // Enviar respuesta de éxito
        res.json({ success: true });
    } catch (error) {
        // Manejo de errores
        console.error("Error al borrar el servicio:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


const   addServicio = async (req = request, res = response) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, precio, descripcion } = req.body;
    console.log(req.files);
    const { foto } = req.files;

    // Definir la ruta de destino para la imagen
    const uploadPath = path.join(__dirname, "../../public/updates", foto.name);

    // Mover la imagen al directorio de actualizaciones
    await foto.mv(uploadPath);

    // Crear un nuevo platillo en la base de datos
    const servicioNuevo = {
      nombre,
      precio: Number(precio),
      descripcion,
      foto: `/updates/${foto.name}` // Ruta relativa al directorio de actualizaciones
    };
    await db.collection("servicio").add(servicioNuevo);

    // Enviar respuesta de éxito
    res.status(200).json({ success: true });
  } catch (error) {
    // Manejar errores
    console.error("Error al cargar el servicio:", error);
    res.status(500).json({ success: false, error: "Error al cargar el servicio" });
  }
};

module.exports ={
    getAllServices: getAllServices,
    getServicioid: getServicioid,
    putServicio: putServicio,
    deleteServicio: deleteServicio,
    addServicio: addServicio

}