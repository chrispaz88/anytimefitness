function sConsole(event) {
    event.preventDefault();
    var data = document.getElementById("data");
    console.log(data.value);
    document.getElementById('data').value=null;
    alert("Thanks!");
}

async function hacerPeticionGET(url) {
    try {
        const token = localStorage.getItem('usrtkn');
        if (!token) {
            console.error("No se encontró el token en el local storage");
            return;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud');
        }

        // Redirigir a la página deseada o realizar cualquier otra acción necesaria
        window.location.href = url;
    } catch (error) {
        console.error('Error:', error);
        // Manejar el error de acuerdo a tus necesidades
    }
}