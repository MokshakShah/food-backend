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

// middleware
app.use(express.json());

// ✅ CORS FIX (allowed frontend + admin)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://food-frontend-brown.vercel.app", // Customer site
    'https://food-backend-0lzh.onrender.com',
    "https://food-admin-liart.vercel.app"    // Admin panel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
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


export default app;
