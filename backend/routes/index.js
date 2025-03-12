import express from 'express'

import {  createProduct, getProduct } from '../controllers/product.controller.js';
import {userSignUp} from '../controllers/user/userSignUp.js'
import { userSignIn } from '../controllers/user/userSignIn.js';
import { userDetailsController } from '../controllers/user/userDetailsController.js';
import { authToken } from '../middleware/authToken.js';
import { userLogout } from '../controllers/user/userLogout.js';
import { userAddToCart } from '../controllers/user/userAddToCart.js';
import { userRemoveProductFromCart } from '../controllers/user/userRemoveProductFromCart.js';
import { getCart } from '../controllers/user/userGetCart.js';


const router = express.Router();

router.post("/signup",userSignUp);
router.post("/signin",userSignIn);
router.get("/userDetails",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post("/addtocart",userAddToCart)
router.post("/removefromcart",userRemoveProductFromCart)
router.get("/cart/:email",getCart)

router.get("/",getProduct);
router.post("/",createProduct);

export default router;