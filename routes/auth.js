const express = require("express")
const Router = express.Router()
const {CreateUser, SearchUserByUsername, CreateSession} = require("../database/users")
const {HashEncryptGenerator, HashVerify} = require("../tools/crypt")

Router.post("/login", async (req, res) => {
    try{
        console.log(req.body.username)
        const user = await SearchUserByUsername(req.body.username)
        if(!user){
            res.status(401).json({message: "Usuário não encontrado"})
            return
        }
        const match = await HashVerify(req.body.password, user.password)
        console.log(match)
        if (match){
            const session = await CreateSession(user)
            res.status(201).cookie("erinus-token", session.token)
            .cookie("erinus-sid", session.id)
            .json({session: {
                id: session.id,
                token: session.token,
                user: {
                    id: user.id,
                    name: user.name,
                    is_adm: user.is_adm,
                    registered_at: user.registered_at
                }
            }})
        }
        else res.status(401).json({message: "Usuário ou senha incorretos"})
    }catch(error){
        res.status(500).json({message: "Houve um erro! " + error})
    }
})

Router.post("/signin", async (req, res) => {
    try{
        const user = req.body
        console.log(req.body)
        const encrypt_password = await HashEncryptGenerator(user.password)
        user.password = encrypt_password
        await CreateUser(user)
        res.status(201).json({message: "Usuário criado!"})
    }catch(error){
        res.status(501).json({message: "Houve um erro! " + error})
    }
})

module.exports = Router