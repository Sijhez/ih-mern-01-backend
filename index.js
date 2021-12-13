//import
const express = require ("express")
const app =  express()
require ("dotenv").config()
const connectDB = require ('./config/db')

//Middlewares
connectDB()
//todas las peeticiones y respuestas se manejan en protocolo JSON
app.use(express.json())

//3. RUTAS
app.use('/guitars', require("./routes/guitars") )

app.use('/stores', require("./routes/stores") )

// 4. SERVER
app.listen(process.env.PORT, () => {

	console.log(`Servidor trabajando en ${process.env.PORT}`)

})