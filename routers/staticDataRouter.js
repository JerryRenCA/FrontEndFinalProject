
const express=require('express')
const staticDataController=require('../controllers/staticDataController')
const router=express.Router();

router.route('/getRouteList').get(staticDataController.handleGetRouteList)
// router.route('/getRouteListBy/:routeId').get(staticDataController.handleGetOneRowByID)

module.exports=router