const {TokenVerify} = require("../tools/token")
const {SearchSession} = require('../database/users')
const guard = async function(req, res, next){
    try{
        if(!req.cookies["erinus-token"]) throw "Token não informado."
        if(!req.cookies["erinus-sid"]) throw "Id de sessão não informado."
        const match = TokenVerify(req.cookies["erinus-token"])
        if (!match) throw "Token inválido"
        const session = await SearchSession(req.cookies["erinus-sid"])
        if(req.cookies["erinus-token"] !== session.token) throw "Token informado não pertence a sessão."
        else {
            res.locals.session = {
                id: session.id,
                token: session.token,
                user: {
                    id: session.user_id,
                    name: session.user_name,
                    is_adm: session.is_adm,
                    registered_at: session.user_rg_at
                }
            }
            next()
        }
    }catch(error){
        res.status(401).json({message: error.toString()})
    }
}

module.exports = guard