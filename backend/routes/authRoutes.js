import  express  from "express";
import { signupAdmin,loginAdmin,logoutAdmin,signupEmp,loginEmp,logoutEmp } from "../controllers/authController.js"


const router = express.Router();

router.post("/adminsignup",signupAdmin )

router.post("/adminlogin",loginAdmin )

router.post("/adminlogout",logoutAdmin )

router.post("/employeesignup",signupEmp )

router.post("/employeelogin",loginEmp )

router.post("/employeelogout",logoutEmp )

export default router