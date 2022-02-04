const express = require("express")
const Router = express.Router()
const { NewProduct } = require('./middlewares')
const {CreateProduct, SearchProductById, SearchProductByName} = require("../../models/products")

Router.get('/', async (req, res) => {
    try{
        const db_search_product = req.query.id ? await SearchProductById(req.query.id) : await SearchProductByName(req.query.name)
        res.status(200).json({
            message: `Sucesso na busca! foram localizados ${db_search_product.rowCount} registros.`,
            data: db_search_product.rows
        })
    }catch(error){
        res.status(404).json({message: error.toString(), error: true})
    }
})

Router.post('/', NewProduct, async (req, res) => {
    try{
        const db_insert_product = await CreateProduct(req.body.name, req.body.description)
        res.status(201).json({message: `Produto ${db_insert_product.name}(${db_insert_product.id}) criado com sucesso.`})
    }catch(error){
        res.status(404).json({message: error.toString(), error: true})
    }
})

module.exports = Router