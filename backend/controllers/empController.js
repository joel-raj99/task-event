
import Employee from '../models/employeeModel.js';


// get all employees for admin employee dashboard
export const getEmployees = async (req,res) => {
    try {

        const employee = await Employee.find({});
        
        if(!employee){
            return res.status(400).json({error:"No employee found"})
        }

        res.status(200).json(employee)

    } catch (error) {
        console.log("Error in getting emp controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}


// get single employee for admin employee dashboard
export const getEmployee = async (req,res) => {
    try {
        const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.send(employee);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching employee' });

    }
}

