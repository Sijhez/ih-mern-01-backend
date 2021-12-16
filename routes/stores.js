const Router = require("express")
const express = require("express")
const router = express.Router()
const storeController = require ('./../controllers/storeController')

//ruteo
router.post("/createStore", storeController.createStore)

router.get("/readStores", storeController.readAllStores)
router.get("/readStores/:id", storeController.readOneStore)
//actualizar tienda:
router.put("/editStore/:id", storeController.editStore )

module.exports = router