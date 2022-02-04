const express = require("express")
const Router = express.Router()

Router.get('/', async (req, res) => {
    try{
        res.status(200)
        .cookie("erinus-token", res.locals.session.token)
        .cookie("erinus-sid", res.locals.session.id)
        .json({session: res.locals.session})
    }catch(error){
        console.log(error)
        res.status(501).json({message: "Houve um erro! " + error.toString()})
    }
})

module.exports = Router