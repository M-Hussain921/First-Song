import users from '../models/user.js';

export const getalluser = async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: "user not found" })
    }
};

export const deleteuser = async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (user.isDelete) {
            return res.status(403).json({ message: "Account Deleted" })
        }

        user.isDelete = true;
        user.deletedAt = new Date();

        await user.save();

        res.status(200).json({ message: "User soft delete successfully", user });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const restoreUser = async (req, res) => {
    try {
        const user = await users.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "user not found" });

        if (!user.isDelete) return res.status(200).json({ message: "Account already active" });

        user.isDelete = false;
        user.restoredAt = new Date();

        user.save();

        res.status(200).json({ message: "User restore successfully",user})

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};