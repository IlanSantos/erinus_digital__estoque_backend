const db = require("../database/index")

// INSIDE FUNCTIONS
const SearchProductByExactlyName = async (db_client, name) => {
    const client = db_client
    try{
        const txt_search_product = "SELECT * FROM ERI_APP_LOGISTIC.PRODUCTS WHERE NAME = $1;"
        const query_search_product = await client.query(txt_search_product, [name])
        if(query_search_product.rowCount === 0) return false
        else return query_search_product.rows[0]
    }catch(error){
        return false
    }
}
// ----------------------------------------------------

const CreateProduct = async (name, description) => {
    const client = await db.connect()
    try{
        const search_product = await SearchProductByExactlyName(client, name)
        if(search_product) throw "Produto já existe."
        const txt_create_product = "INSERT INTO ERI_APP_LOGISTIC.PRODUCTS(NAME, DESCRIPTION) VALUES($1, $2) RETURNING NAME, ID;"
        const query_create_product = await client.query(txt_create_product, [name, description])
        return query_create_product.rows[0]
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}

const SearchProductByName = async name => {
    const client = await db.connect()
    try{
        const txt_search_product = "SELECT * FROM ERI_APP_LOGISTIC.PRODUCTS WHERE NAME ILIKE $1;"
        const query_search_product = await client.query(txt_search_product, [name + '%'])
        return query_search_product
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}

const SearchProductById = async id => {
    const client = await db.connect()
    try{
        const txt_search_product = "SELECT * FROM ERI_APP_LOGISTIC.PRODUCTS WHERE ID = $1;"
        const query_search_product = await client.query(txt_search_product, [id])
        return query_search_product
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}


module.exports = {
    CreateProduct,
    SearchProductByName,
    SearchProductById
}