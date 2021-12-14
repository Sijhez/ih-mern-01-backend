//IMPORTACIONES
const express = require("express")
const router = express.Router()
const userController = require("./../controllers/userController")
const authorization =require("./../middleware/authorization")

//ROUTER
router.post("/create", userController.create)

//login usuario
router.post('/login', userController.login)

//verificacion de usuario
router.get("/verifytoken", authorization, userController.verifyToken)

//EXPORTACION
module.exports = router