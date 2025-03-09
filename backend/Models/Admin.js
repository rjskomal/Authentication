const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    permissions: {
        type: [String],
        default: ["deleteUser", "updateUser"]
    }
});

module.exports = mongoose.model('admin', adminSchema);
