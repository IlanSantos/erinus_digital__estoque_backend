const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');

const config_db = require("../config/database")

require("dotenv").config()
const db = new Sequelize(config_db);
const path_models = path.join(__dirname, '..','models')

module.exports = db