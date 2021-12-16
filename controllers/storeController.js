const Store = require("./../models/Store")

exports.createStore = async (req, res)=>{
    const {nombre,domicilio,
           telefono} = req.body

           try {
               const newStore = await Store.create({
                  nombre, domicilio,telefono
               })
               res.json({
                msg: "Nueva tienda creada con éxito", 
                data: newStore
               })
       
        } catch (error) {
            res.status(500).json({
                msg:"Hubo un error creando la tienda",
                error:error
            })   
        }       
}

exports.readAllStores = async (req, res) =>{
    try {
        const stores = await Store.find({})
        res.json({
            msg:"Tiendas obtenidas con éxito",
            data:stores
        })
        
    } catch (error) {
        res.status(500).json({
            msg:"Hubo un error obteniendo las tiendas",
            error:error
        })
    }
}
   
exports.readOneStore = async (req, res) =>{
    const {id} = req.params
    try {
        const oneStore = await Store.findById(id)
        res.json({
            msg:"Tienda conseguida con éxito",
            data:oneStore
        })
    } catch (error) {
        res.status(500).json({
            msg: "hubo un error obteniendo los datos.",
			error: error
        })
    }
}

exports.editStore = async(req, res) =>{
    const{id}= req.params
    const {
        nombre, domicilio, telefono
    } = req.body

    try {
        const updatedStore = await Store.findByIdAndUpdate(
            id,{
                nombre, domicilio, telefono
            },{new:true})
            res.json({
                msg:"Tienda actualizada con éxito",
                data:updatedStore
            })
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error actualizando la tienda brother",
            error:error
        })
        
    }
}