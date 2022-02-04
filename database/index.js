const { Sequelize } = require("sequelize")
require("dotenv").config()

const db = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres"
})


module.exports = db