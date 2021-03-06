//import
const express = require ("express")
const app =  express()
const cors = require("cors")

require ("dotenv").config()
const connectDB = require ('./config/db')

//Middlewares
connectDB()
//habilitamos cors(accesos de ambientes de desarrollo de terceros)
app.use(cors())

//todas las peeticiones y respuestas se manejan en protocolo JSON
app.use(express.json())

//3. RUTAS
app.use('/guitars', require("./routes/guitars") )

app.use('/stores', require("./routes/stores") )

app.use('/users', require("./routes/users"))

// 4. SERVER
app.listen(process.env.PORT, () => {

	console.log(`Servidor trabajando en ${process.env.PORT}`)

})