require('dotenv').config()
const express=require('express');
const app=express();
const PORT=process.env.PORT||300;
const mongoose=require('mongoose');

mongoose.connect(process.env.DbUrl);
const db=mongoose.connection;
db.on('error', (error)=>console.log(error));
db.once('open',()=>console.log('Connected To DB'));

app.use(express.json());

const studentRoutes=require('./routes/students')
app.use('/students',studentRoutes)

app.listen(PORT,()=>console.log(`server running ${PORT}`))