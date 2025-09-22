import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT || 4000

// middleware

app.use(express.json())

// cors:we can access any backend from frontend 

app.use(cors())


// db connection 
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
// images ka use ye hai ki jab hum image upload karte hai to wo uploads folder me chala jata hai aur use hum http://localhost:4000/images/filename se access kar sakte hai
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
  res.send("API  Working")
})

app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`);
  
})

