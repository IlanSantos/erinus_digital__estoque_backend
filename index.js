const cookieParser = require("cookie-parser")
const express = require("express")
const db = require("./database/index.js")
const cors = require('cors')
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

app.use(authRoute)
app.use("/me", guardMiddleware, meRoute)

// CONFIGS
const PORT = 8080;
// FUNCTIONS

function logWithDatetime(text){
    let date = new Date(Date.now())
    console.log(`${date.toDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${text}`)
}

(async () => {
    try{
        logWithDatetime("INICIANDO SERVIDOR")
        logWithDatetime("TESTANDO CONEXÃO COM O BANCO DE DADOS")
        await db.authenticate()
        app.listen(8080, () => {
            logWithDatetime("SERVIDOR INICIADO NA PORTA " + PORT)
        })
    }catch(error){
        logWithDatetime("HOUVE UM ERRO! " + error.toString())
    }
})()
