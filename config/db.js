import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Tomato:FoodDel@cluster0.gar5grt.mongodb.net/food-del').then(()=>console.log("DB Conmected"));
}

