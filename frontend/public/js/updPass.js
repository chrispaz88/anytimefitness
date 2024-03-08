const form = document.getElementById("formulario");
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        // Si las contraseñas no coinciden, mostrar un mensaje de error
        alert('Las contraseñas no coinciden');
        return false; // Detener el envío del formulario
    }

    // Obtener el token de la cookie
    const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('usrtkn='));

    if (!tokenCookie) {
        console.error('No se encontró la cookie del token.');
        return;
    }

    // Extraer el valor del token de la cookie
    const tokenValue = tokenCookie.split('=')[1];
    
    // Decodificar el token JWT para obtener el payload
    const payload = JSON.parse(atob(tokenValue.split('.')[1]));

    // Crear objeto FormData
    const formData = new FormData(form);

    try {
        // Enviar solicitud PUT al servidor para actualizar la contraseña
        const response = await fetch(`http://localhost:4500/usuarios/api/${payload.username}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
        }

        const data = await response.json();
        
        if (data.success) {
            window.alert("Contraseña actualizada correctamente");
            document.location.href = "/login"
        } else {
            window.alert(data.message || "Error al actualizar la contraseña");
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        window.alert("Error al actualizar la contraseña");
    }
});
