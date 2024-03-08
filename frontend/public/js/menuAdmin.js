// Función para modificar un platillo
function modificarPlatillo(platilloId, foto) {
  localStorage.setItem('foto', foto);
  window.location.href = `/producto/${platilloId}`
}

// Función para eliminar un platillo
function eliminarPlatillo(platilloId) {
  // Pregunta al usuario si está seguro de eliminar
  const confirmacion = confirm("¿Estás seguro de que quieres eliminar este producto?");
  
  // Si el usuario confirma
  if (confirmacion) {
    fetch(`http://localhost:8000/platillos/api/${platilloId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al borrar el platillo: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Muestra el mensaje de éxito
          alert("Producto eliminado exitosamente");
          
          // Recarga la página
          location.reload();
        } else {
          console.log("Error al borrar el platillo:", data);
        }
      })
      .catch((error) => {
        console.error("Error al borrar el platillo:", error);
      });
  }
  // Si el usuario no confirma, no se hace nada
}

function eliminarCookies() {
  // Obtener todas las cookies
  const cookies = document.cookie.split(";");

  // Iterar sobre todas las cookies y eliminarlas una por una
  cookies.forEach(cookie => {
      const igualIndex = cookie.indexOf("=");
      const nombre = igualIndex > -1 ? cookie.substr(0, igualIndex) : cookie;
      document.cookie = nombre + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });
  
  // También puedes limpiar el localStorage si es necesario
  localStorage.clear();
}