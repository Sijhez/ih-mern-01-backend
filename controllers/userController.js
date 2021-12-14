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

//INICIAR SESIÓN
//autenticar que la persona pase su email y contraseña, coincidan y se le envía un token
exports.login = async(req, res) =>{
    //obtener email y pasword del formulario
    const {email, password} = req.body
    try {
        const foundUser = await User.findOne({email}) //objeto
        //validacion: si no hubo usuario:
        if(!foundUser){
            return res.status(400).json({
                msg:"El usuario o contraseña son incorrectos"
            })
        }
        //si todo esta bien, el usuario fue encontrado, entonces evaluamos la contraseña

        const verifiedPass = await bcryptjs.compare(password, foundUser.password)
       //si el password no coincide:
        if ( !verifiedPass) {
            return res.status(400).json({
                msg:"El usuario o la contraseña no coinciden"
            })
        } 
        console.log("foundUser:",foundUser)
        //si el password si coincide y es correcto, generamos un json web token
            //1. establecer payload (datos de usuario)
            const payload ={
                user:{
                    id:foundUser._id,

                }
            }
            //firma del jwt
            jwt.sign(
                payload,
                process.env.SECRET,{
                    expiresIn:360000
                },//generamos error, si existe
                (error, token)=>{
                    if(error) throw error
                    res.json({
                        msg:"Inicio de sesión exitoso.",
                        data:token
                    })
                }
            )
            return

    } catch (error) {
        console.log(error)
        res.status(500)({
            
            msg:"Hubo un problema con la autenticacion",
            data:error
        })
    }


}


//VERIFICACION DE USUARIO
//cuando accedemos a diferentes rutas (como en guitarras o tiendas) preguntar si el usuario tiene permisos o no
//para confirmarlo se le pide al usuario el token. una rupa que pide tokens para verificar
exports.verifyToken = async(req, res)=>{
  //necesitamos desencriptar el proceso de token

    try {
        //1. BUSCAR EL ID DEL USUARIO (DEL TOKEN ABIERTO) EN BASE DE DATOS
    const foundUser = await User.findById(req.user.id).select("-password") //con esto evitamos que pase el password a la verificacion
       return res.json({
           msg:"datos de usuario encontrados",
           data:foundUser
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Token fallado, intentar de nuevo",
            data:error
        })
        
    }
}