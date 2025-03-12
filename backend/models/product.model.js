import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type:String,required:true
    },
    name:{
        type:String,required:true
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    productImages: {
        type: [String], 
        required: true,
        validate: {
          validator: (array) => array.length > 0, 
          message: 'There must be at least one product image.',
        },
    },
    productInfo: {
        type: String, 
        required: true,
    },
    availableSizes: {
        type: [String], 
        required: false,
      },
    type:{
        type:String,required:true
    }
},{timestamps:true})

const Product = mongoose.model('product',productSchema);
export default Product;