const form = document.getElementById("formulario");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    fetch('http://localhost:8000/servicios/api', { // Cambia la URL aquí
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Evitar que la respuesta se muestre directamente en la página
        event.preventDefault();

        console.log('Respuesta del servidor:', data);

        if (data.success === true) {
            window.alert("Producto cargado exitosamente")
            document.location.href = '/menuA';
        } else {
            window.alert("Fallo al cargar el producto")
        }
    })
    .catch(error => {
        window.alert("Fallo al cargar el producto")
    });
});

// Agrega un identificador al manejador de eventos
function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    fetch('http://localhost:8000/servicios/api', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);

        if (data.success === true) {
            window.alert("Producto cargado exitosamente")
            document.location.href = '/menuA';
        } else {
            window.alert("Fallo al cargar el producto")
        }
    })
    .catch(error => {
        window.alert("Fallo al cargar el producto")
    });
}

// Asigna el manejador de eventos al formulario
form.addEventListener("submit", submitHandler);

// Desactiva otros manejadores de eventos asociados al formulario
form.removeEventListener("submit", submitHandler);


function mostrarImagenSeleccionada() {
    const inputFoto = document.getElementById('foto');
    const vistaPrevia = document.getElementById('vistaPrevia');

    if (inputFoto.files && inputFoto.files[0]) {
        const lector = new FileReader();

        lector.onload = function (e) {
            vistaPrevia.innerHTML = '<img src="' + e.target.result + '" alt="Imagen seleccionada" style="max-width: 100%; max-height: 200px;">';
        };

        lector.readAsDataURL(inputFoto.files[0]);
    } else {
        vistaPrevia.innerHTML = '';
    }
}