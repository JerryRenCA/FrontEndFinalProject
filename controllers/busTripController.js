const { Op } = require("sequelize");
const {
    sequelize,
    BusRoute,
    BusStopTime,
    BusTransitShape,
    BusStop,
    BusTrip,
  } = require("./initModels");

  const getAllTripHeadSign=async(req,res)=>{
    const rzlt = await BusTrip.aggregate('trip_headsign','DISTINCT',{plain:false})
    // console.dir(rzlt)
    res.json(rzlt)
  }

  const getTripIdsFromHeadSign=async(req,res)=>{
    const headsign=req.query.headsign
    const rzlt = await BusTrip.findAll({attributes:['trip_id','shape_id','route_id'],where:{trip_headsign:{[Op.eq]:headsign}}})
    // console.dir(rzlt)
    res.json(rzlt)
}

  module.exports={getAllTripHeadSign,getTripIdsFromHeadSign}