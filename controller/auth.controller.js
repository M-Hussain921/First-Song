import users from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, phoneNumber, role } = req.body;
    try {
        const isuser = await users.findOne({ email });
        if (isuser) return res.status(400).json({ message: "user has already exist" });
        const heshedPassword=await bcrypt.hash(password,5)
        const user = await users.create({ name, email, password:heshedPassword, phoneNumber, role });
        res.json({ message: "user register successfully", user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "password is wrong" })
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN);
        res.json({ message: "user login successfully",token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

