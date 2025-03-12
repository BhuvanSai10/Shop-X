import userModel from "../../models/user.model.js";

export const userRemoveProductFromCart = async(req,res)=>{
    const { email, productName } = req.body;

  if (!email || !productName) {
    return res.status(400).json({ success: false, message: "Invalid data." });
  }

  try {
    const result = await userModel.updateOne(
      { email },
      { $pull: { cart: { productName } } } // Removes the item from the cart
    );

    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Item removed from cart." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove item from cart." });
  }
}