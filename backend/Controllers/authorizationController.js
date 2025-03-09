const User = require('../Models/Users');

module.exports.getAllUserDetails = async (req, res) => {
    try {
        const users = await User.find().select("-password"); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const { userId, newUsername } = req.body;
        await User.findByIdAndUpdate(userId, { username: newUsername });
        res.json({ message: "Username updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
