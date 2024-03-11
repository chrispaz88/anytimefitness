const form = document.getElementById("formulario");
const productoId = document.getElementById("platilloId").value;

window.onload = function(){
    mostrarImagenSeleccionada()
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    fetch(`http://localhost:8000/servicios/api/${productoId}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Evitar que la respuesta se muestre directamente en la página
        event.preventDefault();

        console.log('Respuesta del servidor:', data);

        if (data.success === true) {
            window.alert("Producto modificado exitosamente")
            document.location.href = '/menuA';
        } else {
            window.alert("Fallo al cargar el producto")
        }
    })
    .catch(error => {
        window.alert("Fallo al cargar el producto")
    });
});

function mostrarImagenSeleccionada() {
    const vistaPrevia = document.getElementById('vistaPrevia');

    // Verificar si hay una foto almacenada en el localStorage
    const fotoLocalStorage = localStorage.getItem('foto');
    if (fotoLocalStorage) {
        // Establecer la ruta de la foto como valor del input foto
        // Mostrar la vista previa de la imagen
        vistaPrevia.innerHTML = '<img src="' + fotoLocalStorage + '" alt="Imagen seleccionada" style="max-width: 100%; max-height: 200px;">';
    } else {
        // Si no hay foto almacenada en el localStorage, dejar el input foto vacío
        inputFoto.value = '';
        // Limpiar la vista previa
        vistaPrevia.innerHTML = '';
    }
}
