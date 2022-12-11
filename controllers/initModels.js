const { Sequelize } = require("sequelize");
const path = require("path");
let csvToJson = require("convert-csv-to-json");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname,'..' ,"database", "halifaxbus.sqlite"),
  });


const {BusRoute}=require('../models/BusRoute')
BusRoute.model_init(sequelize)




module.exports={sequelize,BusRoute}