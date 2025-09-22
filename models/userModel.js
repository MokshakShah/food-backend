import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

//minimize yha isliye likha hai kyuki cartdata me default value empty hai matlab ki agar empty hoga fir bhi start hona chahiye phele


const userModel = mongoose.models.user || mongoose.model("user",userSchema);

//mongoose.models.user: This part checks if a Mongoose model named "user" has already been defined within the current Mongoose connection.

//mongoose.model("user", userSchema): This part is responsible for defining a new Mongoose model

export default userModel;