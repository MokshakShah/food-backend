import express from 'express';
import authMiddleware from '../middleware/auth.js';
// import authMiddleware from "../middleware/auth/.js"
import { listOrders, placeOrder, userOrders, verifyOrder,updateStatus } from '../controllers/orderController.js';


// orderrouter used for routing 
const orderRouter = express.Router();

// middleware used to check authentication
orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/usersorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;

