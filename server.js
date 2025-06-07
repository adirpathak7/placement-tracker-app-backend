const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Task = require("./models/Task");

dotenv.config();

const app = express();

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ data: tasks, message: "Tasks fetched", status: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { username, todayWork, nextDayWork } = req.body;

        const newTask = new Task({ username, todayWork, nextDayWork });
        await newTask.save();

        res.status(200).json({ data: newTask, message: "Task saved", status: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to save task." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
