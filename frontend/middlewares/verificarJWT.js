const jwt = require('jsonwebtoken');

const validarJWTAdmin = (req, res, next) => {
    try {
        // Obtener la cookie 'usrtkn' del header de la solicitud
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
            // Si no hay cookie, el usuario no está autenticado
            return res.status(401).json({ message: 'Acceso no autorizado: cookie no encontrada' });
        }

        // Extraer el valor de la cookie 'usrtkn'
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        let token;
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'usrtkn') {
                token = value;
                break;
            }
        }

        if (!token) {
            // Si no se encontró el token en la cookie, el usuario no está autenticado
            return res.redirect('/login');
        }

        // Verificar y decodificar el token JWT
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (payload && payload.isAdmin) {
            // Si el token es válido y el usuario es administrador, continuar con la solicitud
            next();
        } else {
            // Si el token no es válido o el usuario no es administrador, denegar el acceso
            return res.redirect('/login');
        }
    } catch (error) {
        // Si hay un error al verificar el token, devolver un mensaje de error
        console.error("Error al verificar el token:", error);
        return res.redirect('/login');
    }
};

const validarJWTNormal = (req, res, next) => {
    try {
        // Obtener la cookie 'usrtkn' del header de la solicitud
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
            // Si no hay cookie, el usuario no está autenticado
            return res.status(401).json({ message: 'Acceso no autorizado: cookie no encontrada' });
        }

        // Extraer el valor de la cookie 'usrtkn'
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        let token;
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'usrtkn') {
                token = value;
                break;
            }
        }

        if (!token) {
            // Si no se encontró el token en la cookie, el usuario no está autenticado
            return res.redirect('/login');
        }

        // Verificar y decodificar el token JWT
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (payload && payload.isAdmin == false) {
            // Si el token es válido y el usuario es administrador, continuar con la solicitud
            next();
        } else {
            // Si el token no es válido o el usuario no es administrador, denegar el acceso
            return res.redirect('/login');
        }
    } catch (error) {
        // Si hay un error al verificar el token, devolver un mensaje de error
        console.error("Error al verificar el token:", error);
        return res.redirect('/login');
    }
};


module.exports = {validarJWTAdmin, validarJWTNormal};