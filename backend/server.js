const express=require('express')
const app=express()
const connectToDB=require('./db')
const cors=require('cors')
app.use(cors())
const dotenv = require("dotenv");
connectToDB();
const UserRoutes=require('./Routes/UserRoutes')
const ComplainRoutes=require('./Routes/ComplainRoutes')
app.use(express.json())
app.use('/api/auth',UserRoutes)
app.use('/api/complain',ComplainRoutes)
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is running on port 5000")
})