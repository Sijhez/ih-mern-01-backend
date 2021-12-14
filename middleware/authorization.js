//aqui vamos a desencriptar el JWT jason web token
const jwt = require("jsonwebtoken")


const decrypt = async (req, res, next)=>{
    //capturamos token y guardamos en variable
    const token = req.header("x-auth-token")
   //verificamos token.
   //si no hay token:
    if(!token){
        return res.status(401).json({
            msg:"No hay token, permismo no válido"
        })
    }

    //si hay token y todo bien
    try {
        const openToken = await jwt.verify(token, process.env.SECRET)
        req.user = openToken.user
        console.log("open Token:",openToken)
        next()
    } catch (error) {
        console.log(error)
        res.json({
            msg:"Hubo un error con el token",
            data:error
        })
    }
}
//trabaja como si fuera un routeGuard
module.exports = decrypt
