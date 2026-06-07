const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET ALL TASKS OF LOGGED-IN USER

router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.id
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// CREATE NEW TASK

router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            dueDate
        } = req.body;

        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.id
        });

        await task.save();

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TASK

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!updatedTask) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TASK

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedTask) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json({
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;