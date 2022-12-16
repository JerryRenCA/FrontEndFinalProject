const express=require('express')
const busTripController=require('../controllers/busTripController')
const router=express.Router();

router.route("/all_bus_trip_headsign").get(busTripController.getAllTripHeadSign)
router.route("/get_trip_ids_from_headsign").get(busTripController.getTripIdsFromHeadSign)

module.exports=router