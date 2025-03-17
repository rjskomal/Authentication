const Post = require("../Models/Posts");


module.exports.getFlaggedPosts = async (req, res) => {
    try {
        const flaggedPosts = await Post.find({ flagged: true }).populate("createdBy", "username");
        res.json(flaggedPosts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch flagged posts" });
    }
};


module.exports.unflagPost = async (req, res) => {
    try {
        const { postId } = req.body;
        await Post.findByIdAndUpdate(postId, { flagged: false });
        res.json({ message: "Post unflagged!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to unflag post" });
    }
};


module.exports.deleteFlaggedPost = async (req, res) => {
    try {
        const { postId } = req.body;
        await Post.findByIdAndDelete(postId);
        res.json({ message: "Flagged post deleted!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete flagged post" });
    }
};
