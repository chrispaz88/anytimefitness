const form = document.getElementById("formulario");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const username = formData.get("username"); // Obtener el nombre de usuario del formulario

    fetch(`http://localhost:4500/usuarios/api/${username}`, {
        method: 'PUT', // Cambiar el método a PUT
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.alert("Contraseña actualizada correctamente");
            document.location.href = "/login"
        } else {
            window.alert(data.message || "Error al actualizar la contraseña");
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        window.alert("Error al actualizar la contraseña");
    });
});