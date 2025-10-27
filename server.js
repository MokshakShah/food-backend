import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS must come before routes
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://food-frontend-brown.vercel.app",
    "https://food-admin-liart.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// 🔥 Connect Database
connectDB();

// 🛣 API Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

//  Start Server 
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
