const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    username: String,
    todayWork: String,
    nextDayWork: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", taskSchema);
