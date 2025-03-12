import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    
    email : {
        type : String,
        unique : true,
        required : true
    },
    password :{ 
        type : String,
        required : true
    },
    cart: [
        {
          productName: {
            type:String, 
            required: true,
          },
          productQuantity: {
            type: Number,
            required: true,
            default: 1,
          },
          productPrice:{
            type:Number,
            required:true
          },
          productImage:{
            type:String,
            required:true
          },
          productSize:{
            type:String,
            required:true
          }
        },
      ],
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)

export default userModel;