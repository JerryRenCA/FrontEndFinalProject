const { Sequelize } = require("sequelize");
const path = require("path");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database", "halifaxbus.sqlite"),
});

const { BusRoute } = require("../models/BusRoute")
const { BusStopTime } = require("../models/BusStopTime")
const { BusStop } = require("../models/BusStop")
const { BusTrip } = require("../models/BusTrip")
const { BusTransitShape } = require("../models/BusTransitShape")

const initTables=async () => {
  BusRoute.modelInit(sequelize)
  BusStopTime.modelInit(sequelize)
  BusStop.modelInit(sequelize)
  BusTrip.modelInit(sequelize)
  BusTransitShape.modelInit(sequelize)

}

module.exports = { sequelize,initTables, BusRoute,BusStopTime,BusStop,BusTrip,BusTransitShape};
