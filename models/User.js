//importaciones
const mongoose = require("mongoose")

//SCHEMAS
const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    }, 
    apellido:{
        type: String,
        default:""
    },
    pais:{
        type: String,
        default:""
    },
    direccion:{
        type: String,
        default:""
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

//MODELOS
const User = mongoose.model("User", userSchema)

//EXPORTACION
module.exports = User