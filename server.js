require('dotenv').config()
const path = require("path");

const express=require('express')
const app=express();
const cors=require('cors');
const staticDataRouter=require('./routers/staticDataRouter')
const {startServer}=require('./controllers/serverController')

app.use(cors())
app.use(express.json())
app.use(express.static('views/client_buses'))

app.use('/staticData',staticDataRouter)

startServer();