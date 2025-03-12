import userModel from "../../models/user.model.js";

export const userAddToCart = async (req, res) => {
  try {
    const {
      email,
      productName,
      productPrice,
      productImage,
      productSize,
      productQuantity,
    } = req.body;

    // Check if the user exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      throw new Error("User doesn't exist");
    }

    // Check if the cart already contains the product with the same size
    const existingProductIndex = existingUser.cart.findIndex(
      (item) =>
        item.productName === productName && item.productSize === productSize
    );

    if (existingProductIndex !== -1) {
      // If product exists in cart, update the quantity
      existingUser.cart[existingProductIndex].productQuantity += productQuantity;

      const updatedUser = await existingUser.save();
      res.status(201).json({
        data: updatedUser.cart,
        success: true,
        error: false,
      });
    } else {
      // If product doesn't exist, add it to the cart
      existingUser.cart.push({
        productName,
        productPrice,
        productImage,
        productSize,
        productQuantity,
      });
      const updatedUser = await existingUser.save();

      // Respond with success message
      res.status(201).json({
        data: updatedUser.cart,
        success: true,
        error: false,
        message: "Product added to cart successfully",
      });
    }
    
  } catch (err) {
    // Handle errors and respond with error message
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};
