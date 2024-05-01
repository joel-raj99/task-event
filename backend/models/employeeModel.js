import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullname:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    
    title:{
        type: String,
        required :true
    },
    department:{
        type:String,
        required:true,
        enum:["HR","DEVELOPER","TESTER"]
    }
},{timestamps : true})

const Employee = mongoose.model("employee",employeeSchema);

export default Employee;
