import userModel from "../../models/user.model.js";

export const getCart = async(req,res)=>{
    try {
        const existingUser = await userModel.findOne({ email: req.params.email});
        if(!existingUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ cart: existingUser.cart });
    } catch (error) {
        res.status(404).json({ message: "Empty Cart", error: err.message });

    }
}