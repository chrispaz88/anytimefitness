
const form = document.getElementById("formulario");


document.getElementById("loginButton").addEventListener("click", verificarCredenciales);

async function verificarCredenciales() {
    const formData = new FormData(document.getElementById("formulario")); // Obtener los datos del formulario

    try {
        // Realizar la solicitud de inicio de sesión
        const loginResponse = await fetch('/login', {
            method: 'POST',
            body: formData
        });
        const loginData = await loginResponse.json();

        // Verificar si el inicio de sesión fue exitoso
        if (loginData.state === "1") {
            document.cookie = `usrtkn=${loginData.token}`;
            

            if (loginData.isAdmin) {
                // Realizar la solicitud GET a la página /menuA
                window.location.href = "/menuA";
                
            } else {
                
                window.location.href = "/menuN";
            }
        } else {
            // Si el inicio de sesión no fue exitoso, mostrar un mensaje de error
            window.alert("Usuario y/o contraseña incorrecto");
        }
    } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error al realizar la solicitud:', error);
        window.alert("Usuario y/o contraseña incorrecto");
    }
}