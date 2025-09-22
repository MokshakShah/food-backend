import express from 'express'
import { addFood,listFood,removeFood} from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

//Image Storage Engine

// In this , the multer creates a img storage using diskstorage where path is given to store pics (uploads) also when a file is inserted the name will be displayed like date_originalfilename


const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
//addfood in foodcontroller.js

foodRouter.get("/list",listFood)
//listfood in foodcontroller.js

// ye list ka use ye hai ki jo me atlas me store kar rha hu voh muje yha call karne per batayega jitna bhi list hai

foodRouter.post("/remove",removeFood);

export default foodRouter;
