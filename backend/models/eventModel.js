
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
},{timestamps : true});

// Create model from schema
const Event = mongoose.model('event', eventSchema);

export default Event