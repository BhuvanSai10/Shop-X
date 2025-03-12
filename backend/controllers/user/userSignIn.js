import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../../models/user.model.js'

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials. Please check your email or password.",
        success: false,
        error: true,
      });
    }

    
    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRETKEY, {
      expiresIn: "8h", 
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Login successful.",
      success: true,
      data: { token },
      error: false,
    });
  } catch (err) {
    console.error("Error during user sign-in:", err.message);
    return res.status(500).json({
      message: "An error occurred. Please try again later.",
      success: false,
      error: true,
    });
  }
};
