
import userModel from "../models/userModel.js";

//  Add items  to Cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);  //get id from here 

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {}; // cart items detail from here

    const itemId = req.body.itemId;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }); //this will find cart id from usermodel and then update the id in cart

    res.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//  Remove items  from Cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // optional: clean up 0 items
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Item removed from Cart" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing item" });
  }
};


// const getCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);

//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({ success: true, cartData: userData.cartData || {} });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch cart" });
//   }
// };


const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData;
        res.json({success:true,cartData}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to Show"})
        
    }
}

export { addToCart, removeFromCart, getCart };
