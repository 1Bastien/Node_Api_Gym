const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
    discipline: { type: String, default: "multisport" },
    bio: { type: String, default: "No bio for this coach" },
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot"}],
});

const Coach = new mongoose.model("Coach", CoachSchema);

module.exports = Coach;