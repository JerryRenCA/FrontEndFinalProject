const { Op } = require("sequelize");
const {
    sequelize,
    BusRoute,
    BusStopTime,
    BusTransitShape,
    BusStop,
    BusTrip,
  } = require("./initModels");

const getShapeIDFromTripID=async (tripID)=>{
    const shape_id= await BusTrip.findOne({attributes:['shape_id'],where:{trip_id:{[Op.eq]:tripID}}})
    return shape_id.shape_id
}

const getRouteIDFromTripID=(tripID)=>{
    return 0
}

const getRouteNameFromRouteID=(routeID)=>{

    return {}
}

module.exports={getShapeIDFromTripID,getRouteIDFromTripID,getRouteNameFromRouteID}


