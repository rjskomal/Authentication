const Post = require("../Models/Posts");

module.exports.createPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.create({
            text,
            createdBy: req.user._id
        });
        res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        res.status(500).json({ error: "Failed to create post" });
    }
};

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "username");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

module.exports.likePost = async (req, res) => {
    try {
        const { postId } = req.body;
        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
        res.json({ message: "Post liked!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to like post" });
    }
};

module.exports.flagPost = async (req, res) => {
    try {
        const { postId } = req.body;
        await Post.findByIdAndUpdate(postId, { flagged: true });
        res.json({ message: "Post flagged!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to flag post" });
    }
};

module.exports.toggleLikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.likedBy.includes(userId)) {
            await Post.findByIdAndUpdate(postId, { 
                $pull: { likedBy: userId },
                $inc: { likes: -1 }
            });
            return res.json({ message: "Like removed!" });
        } else {
            await Post.findByIdAndUpdate(postId, { 
                $push: { likedBy: userId },
                $inc: { likes: 1 }
            });
            return res.json({ message: "Post liked!" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to process like action" });
    }
};
