const form = document.getElementById("formulario");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    formData.append('isAdmin', false);

    fetch('http://localhost:4500/usuarios/api', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "0") {
            window.alert("revise los datos ingresados");
        } else if (data === "1") {
            window.location.href = '/login';
        } 
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        window.alert("Creación fallida");
    });
    
});