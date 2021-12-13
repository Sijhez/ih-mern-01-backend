//IMPORTACIONES
const express = require("express")
const router = express.Router()
const userController = require("./../controllers/userController")

//ROUTER
router.post("/create", userController.create)



//EXPORTACION
module.exports = router