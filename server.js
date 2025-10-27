import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// ✅ Fixed CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://food-frontend-brown.vercel.app", // Customer Frontend
    "https://food-admin-liart.vercel.app"     // Admin Panel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// db connection 
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// start server
app.listen(port, () => {
  console.log(`Server Running → http://localhost:${port}`);
});
