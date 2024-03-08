

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