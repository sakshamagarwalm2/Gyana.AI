import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "ERROR", cause: err.message });
    }
};
export const UserSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const exsistingUser = await User.findOne({ email });
        if (exsistingUser) {
            return res.status(409).json({ message: "USER ALREADY EXIST" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "1h");
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "ERROR", cause: err.message });
    }
};
export const UserLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "USER NOT FOUND" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "PASSWORD IS INCORRECT" });
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "1h");
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "ERROR", cause: err.message });
    }
};
//# sourceMappingURL=user-controllers.js.map