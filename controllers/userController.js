const bcryptjs=require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const User = require("./../models/User")
const jwt = require ("jsonwebtoken")
exports.create = async (req, res)=>{
    //res.send("Hola, estoy generando usuarios")
    //OBTENER DATOS DEL USUARIO DESDE FORMULARIO
    const {
       nombre,
       apellido,
       pais,
       direccion,
       email,
       password
    } = req.body
    //2A: REALIZAR EL PROCESO ASÍNCRONO
    try {
        //generar password para base de datos
        const salt	= await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)
        //4: CREAR USUARIO EN BASE DE DATOS
        const newUser = await User.create({
            nombre,
            apellido,
            pais,
            direccion,
            email,
            password:hashedPassword
        })
        //console.log(newUser)
        //5. AUTENTICACION CON TOKENS:
        //A: CRAR UN PAYLOAD (INformación del usuario)
        const payload = {
            user:{
                id:newUser._id //id del usuario en MONGODB
            }
        }
        //B: FIRMAR EL TOKEN
        jwt.sign(
            payload,
            process.env.SECRET, //palabra secreta que firma
            {
                expiresIn: 360000 //expiracion del token
            },
            (error, token)=>{
               if(error) throw error
               res.json({
                   msg: "Token correctamente generado.",
                   data: token
               })
            }
        )

        

		//console.log(hashedPassword)
    } catch (error) {
      //console.log(error)
        //2B EN CASO DE ERROR, CON AWAIT
        res.status(500).json({
            msg: "hubo un error en la cración de usuario",
            error:error
        })
    }
}