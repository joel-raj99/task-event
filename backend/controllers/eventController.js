

import Event from "../models/eventModel.js";



export const createEvent = async (req, res) =>{
    const {title,start,end} = req.body
  try { 
   const newEvent = new Event({
    title,
    start:new Date(start),
    end: new Date(end)
   })
   await newEvent.save();
   res.status(201).json(newEvent);

  } catch (error) {
    console.error("Error creating the event:", error.message);
    res.status(500).json({ message: "Failed to create the event", error: error.message });
  }
}


export const getEvent = async (req, res) =>{
    
  try { 
    const event = await Event.find({})

    if(!event){
        return res.status(400).json({error:"No event found"})
    }

    res.status(200).json(event)

  } catch (error) {
    console.error("Error getting the event:", error.message);
    res.status(500).json({ message: "Failed to get the event", error: error.message });
  }
}