import userModel from '../../models/user.model.js';
import bcrypt from 'bcryptjs'

export const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        console.log("user", existingUser);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password,salt)

        if (!hashPassword) {
            throw new Error("Something is wrong.");
        }

        const payload = {
            ...req.body,
            password:hashPassword
        }

        const userData = new userModel(payload);

        const savedUser = await userData.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "Sign Up successful!",
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};
