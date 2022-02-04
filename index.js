const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require('cors')
const cors_options = {

}
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))

// MIDDLEWARES
const guardMiddleware = require("./guard")

app.get("/", (req, res) => {
    res.status(200).json({message: "OK"})
})

// ROUTES
const authRoute = require("./routes/auth")
const meRoute = require("./routes/me")
const productsRoute = require("./routes/products")

app.use(authRoute)
app.use("/me", guardMiddleware, meRoute)
app.use("/products", guardMiddleware, productsRoute)

const PORT = 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta " + PORT)
})