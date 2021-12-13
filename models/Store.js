//imports
const mongoose = require("mongoose")
//schema
const storeSchema = mongoose.Schema({
    nombre:String,
    domicilio:{
        type:String,
        required:true
    },
    telefono:{
        type:String
    }
})

//modelo
const Store = mongoose.model("Store", storeSchema)

//exportacion
module.exports = Store