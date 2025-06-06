const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data/data.json";

app.get("/tasks", (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_FILE);
    const tasks = JSON.parse(rawData);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to read tasks." });
  }
});

app.post("/tasks", (req, res) => {
  try {
    const newTasks = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newTasks, null, 2));
    res.status(200).json({ message: "Tasks updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tasks." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
