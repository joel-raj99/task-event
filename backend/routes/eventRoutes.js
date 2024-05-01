import  express  from "express";
import { createEvent,getEvent} from "../controllers/eventController.js";


const router = express.Router();

router.post("/createevent",createEvent )     // create  a new event
router.get("/getevent",getEvent)             // get all the events 





export default router

