import { mongoose } from 'mongoose';
import Employee from '../models/employeeModel.js';


import Task from "../models/taskModel.js";

import { format } from 'date-fns';


export const createTask = async (req, res) => {
  const { title, description, assignedto, startdate, priority, status } = req.body;
  console.log(req.body);

  try {
    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      assignedto, // This should be the ObjectId of an existing employee
      startdate: new Date(startdate),
      // Adding 3 days to the startdate to calculate duedate
      duedate: new Date(new Date(startdate).setDate(new Date(startdate).getDate() + 3)),
      priority,
      status
    });

    await newTask.save();

    // Populate the `assignedto` field with the employee's full name and return the populated task
    const populatedTask = await Task.findById(newTask._id).populate('assignedto', 'fullname');

    if (!populatedTask) {
      return res.status(404).json({ message: "Task was saved but could not be found for populating." });
    }

    // Send the populated task back as the response
    res.status(201).json(populatedTask);

  } catch (error) {
    console.error("Error creating the task:", error.message);
    res.status(500).json({ message: "Failed to create the task", error: error.message });
  }
}



export const getAllTasks = async (req, res) => {
  try {
    // Find all tasks, sort them by createdAt in descending order, and populate the 'assignedto' field
    const tasks = await Task.find({})
      .sort({ createdAt: -1 }) // Sort tasks by creation timestamp in descending order
      .populate('assignedto', 'fullname -_id'); // Include employee fullname, exclude employee _id

      
    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ error: "No tasks found" });
    }

    const formattedTasks = tasks.map(task => {
      return {
        ...task.toObject(),
        startdate: formatDate(task.startdate),
        duedate: formatDate(task.duedate)
      };
    });

    res.status(200).json(formattedTasks);
  } catch (error) {
    console.log("Error in getting task controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    // Log registered model names to check if "Employee" is among them
    console.log(mongoose.modelNames());

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid user ID format');
    }

    // Check if the employee exists
    const employeeExists = await Employee.findById(userId);
    if (!employeeExists) {
      return res.status(404).send('Employee not found');
    }

    // Find tasks assigned to this user and populate the "assignedto" field with employee's fullname
    const data = await Task.find({ assignedto: userId })
      .populate({
        path: 'assignedto',
        select: 'fullname', // Include only the fullname field
        model: 'employee' // Ensure the correct model name is used
      })
      .exec();

      const formattedData = data.map(task => {
        return {
          ...task.toObject(),
          startdate: formatDate(task.startdate),
          duedate: formatDate(task.duedate)
        };
      });
  
      res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error in getting user task:", error.message);
    res.status(500).json({ message: "Failed to get user task", error: error.message });
  }
};




export const updateTask =async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
};