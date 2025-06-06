const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 10000;
app.use(cors());
app.use(express.json());

const DATA_FILE = "./data/data.json";

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get("/tasks", (req, res) => {
    try {
        const rawData = fs.readFileSync(DATA_FILE);
        const tasks = JSON.parse(rawData);
        res.json({
            data: tasks,
            message: "Tasks fetched successfully",
            status: true
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to read tasks." });
    }
});


app.post("/tasks", (req, res) => {
    try {
        const newTask = req.body;

        const rawData = fs.readFileSync(DATA_FILE);
        const tasks = JSON.parse(rawData);

        tasks.push(newTask);
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to save task." });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
