
const express=require('express')
const staticDataController=require('../controllers/staticDataController')
const router=express.Router();

router.route('/:fileId').get(staticDataController.handleLoadCSVFile)

module.exports=router