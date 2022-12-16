require('dotenv').config()
const path = require("path");

const express=require('express')
const app=express();
const cors=require('cors');
const staticDataRouter=require('./routers/staticDataRouter')
const busTripRouter=require('./routers/busTripRouter')
const busTransitShapeRouter=require('./routers/busTransitShapeRouter')
const {startServer}=require('./controllers/serverController')
const {loadDataFromFileToDB}=require('./controllers/dbController')

app.use(cors())
app.use(express.json())
app.use(express.static('views/client_buses'))

app.use('/staticData',staticDataRouter)
app.use('/busTrip',busTripRouter)
app.use('/shape',busTransitShapeRouter)

startServer(app);

loadDataFromFileToDB()