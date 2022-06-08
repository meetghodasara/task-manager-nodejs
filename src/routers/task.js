const express = require("express");
const Task = require("../models/tasks");
const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send("Error" + error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedItems = ["Status", "description"];
  const isValidOperation = updates.every((update) =>
    allowedItems.includes(update)
  );

  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid Update operation" });
  }
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(400).send("Task is not found");
    }
    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).send("No task found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
