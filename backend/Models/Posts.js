const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    text: { type: String, required: true, maxlength: 500 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false }
});

module.exports = mongoose.model("Post", postSchema);
