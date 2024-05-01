import  express  from "express";
import { getEmployees,getEmployee } from "../controllers/empController.js";


const router = express.Router();

router.get("/getemployees",getEmployees )     // get employees for admin employee dashboard
router.get("/employee/:id",getEmployee)       // get 
 


export default router