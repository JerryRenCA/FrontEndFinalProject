const express=require('express')
const busTransitShapeController=require('../controllers/busTransitShapeController')
const router=express.Router();

router.route("/get-shapes").get(busTransitShapeController.getShapesFromTripId)


module.exports=router