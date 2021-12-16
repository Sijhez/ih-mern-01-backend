//importaciones
const mongoose = require("mongoose")

//schema
const guitarSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    imagen: {
		type: String,
		required: true
	},
	descripcion: {
		type: String,
		required: true
	},
    color:{
        type:String,
        required:true
    }

})


//modelo
const Guitar = mongoose.model("Guitar", guitarSchema)
//exportacion
module.exports = Guitar