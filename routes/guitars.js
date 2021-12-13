//imports
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const guitarController = require("./../controllers/guitarController")

//ruteo (router)
router.post("/create", guitarController.create )
//leer todas las guitarras
router.get("/readall", guitarController.readAll)
//leer una guitarra
router.get("/readone/:id", guitarController.readOne)

//actualizar guitarra
router.put("/edit/:id", guitarController.edit)
router.delete("/delete/:id", guitarController.delete)



//exportaciones
module.exports = router