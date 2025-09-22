import mongoose from "mongoose";

//This is basically used to share the data of foodlist like ordered cake then name:cake,desc:cake ka,price:$10,image,category:sweet

const foodSchema = new mongoose.Schema({
    name :{type:String,required:true},
    description :{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel = mongoose.models.food ||  mongoose.model("food",foodSchema)

export default foodModel;