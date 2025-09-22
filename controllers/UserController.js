import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//jsonwebtoken: Securely authenticate users.
//bcrypt: User data privacy saver
//validator: Checks email and password are valide or not


const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.json({success:false,message:"Invalid Credentials"})

        }

        const token= createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error handliing"})
    }
}   

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Login User

const registerUser = async (req,res)=>{
    const {name,password,email}=req.body;
    try{
        //checking this user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }
        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }
        
        if(password.length<8){
            return res.json({success:false,message:"Please Enter a 8 Digit password"})
        }


        //hashing the user password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        //Newuser ki details hai ye
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })


        const user = await newUser.save()  //New user data save
        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error handliing"})
        
    }
}


//Register User




export {loginUser,registerUser} 