const { BusRoute } = require("../models/BusRoute")
const { BusStopTime } = require("../models/BusStopTime")
const { BusStop } = require("../models/BusStop")
const { BusTrip } = require("../models/BusTrip")
const { BusTransitShape } = require("../models/BusTransitShape")

// const fileNames = ["routes.txt","shapes.txt","stop_times.txt","stops.txt","trips.txt",];
const BusModels=[BusRoute,BusTransitShape,BusStopTime,BusStop,BusTrip];
const modelSelectId=["route_Id","shape_Id","stop_Id","stop_Id","route_Id"]

const handleGetRouteList=async (req,res)=>{
  const rzlt=await BusRoute.findAll({attributes:['route_Id']})
  console.dir(rzlt)
  res.json(JSON.stringify(rzlt))
}

module.exports = {handleGetRouteList  };
