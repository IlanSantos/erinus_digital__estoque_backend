const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET = process.env.JWT_SECRET_KEY


const CreateJwt = function(payload){
    if(!payload) throw "the payload was not informed."
    const hash = jwt.sign(payload, SECRET, {expiresIn: '4h'})
    return hash
}

const TokenVerify = function(token){
    if(!token) throw "token was not informed."
    try{
        jwt.verify(token, SECRET)
        return true
    }catch(error){
        if(error.name === "TokenExpiredError") throw "Token expirado."
        else throw error
    }
}

module.exports = {
    CreateJwt,
    TokenVerify
}