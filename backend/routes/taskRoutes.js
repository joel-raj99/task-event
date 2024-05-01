import express from "express";
import { getAllTasks, createTask, getTask, updateTask } from "../controllers/taskController.js";

// Create an instance of Express router
const router = express.Router();

// Define routes
router.get("/getalltasks", getAllTasks); // Get all tasks (Admin task dashboard)
router.post("/createtask", createTask); // Create a new task (Admin add new task to the database)

router.get("/gettask/:userId", getTask); // Get a specific task by ID (Employee tasks by ID)
router.put("/update/:taskId", updateTask); // Update a specific task

// Export the router
export default router;
