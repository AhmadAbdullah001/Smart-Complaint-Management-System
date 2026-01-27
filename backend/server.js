const express=require('express')
const dotenv = require("dotenv");
dotenv.config();
const app=express()
const connectToDB=require('./db')
const cors=require('cors')
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())
connectToDB();
const UserRoutes=require('./Routes/UserRoutes')
const ComplainRoutes=require('./Routes/ComplainRoutes')
app.use(express.json())
app.use('/api/auth',UserRoutes)
app.use('/api/complain',ComplainRoutes)
app.get('/',(req,res)=>{
    res.send("API is running")
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is running on port 5000")
})