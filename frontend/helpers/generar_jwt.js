const jwt = require('jsonwebtoken');

const generatJWT = (username = '', isAdmin=false) =>{
    return new Promise((res, rej)=>{
        const payload = { username, isAdmin }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY,
            {expiresIn:'2h'}, (err, token) =>{
                if (err){
                    console.log(err);
                    rej('No se pudo generar el token')
                }else{
                    res(token)
                }
        })
    })
}

module.exports = {
    generatJWT
}