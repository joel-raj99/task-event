
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee', // Reference to the Employee model
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  duedate: {
    type: Date,
    required: true
  },

  status: { type: String, enum: ['START', 'COMPLETED', 'CLOSED', 'REJECTED', 'INPROGRESS', 'ONHOLD', 'CANCELLED', 'DELAYED', 'PENDING','TESTED'], required: true },
},
{timestamps : true});

// Create model from schema
const Task = mongoose.model('task', taskSchema);

export default Task