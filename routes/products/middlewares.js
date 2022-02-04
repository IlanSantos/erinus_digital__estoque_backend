const NewProduct = (req, res, next) => {
    try{
        if(!req.body.name || typeof req.body.name !== "string") throw "Nome de produto não informado."
        else if(req.body.description && typeof req.body.description !== "string"){
            throw "Tipo de descrição inválida."
        }
        else next()
    }catch(error){
        res.status(400).json({message: error.toString(), error: true})
    }
}

module.exports = {
    NewProduct
}