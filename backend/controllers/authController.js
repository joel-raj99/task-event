import Admin  from '../models/adminModel.js';
import Employee from '../models/employeeModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';




export const signupAdmin = async (req,res) => {
    try {
        const { fullname,email,password } = req.body
console.log(fullname,email,password)
        if (password !== password){
            return res.status(400).json({error:"Passwords invailded"})
        }

        // const user = await Admin.findOne({email})

        // if(user){
        //     return res.status(400).json({error:"email already exists"})
        // }


        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Check if the email already exists in the Employee model
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: "Email already exists" });
        }

   

        // hash password

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser = new  Admin ({
            fullname,
            email,
            password : hashedPassword,
          
        })

        await newUser.save()

        // generateTokenAndSetCookie(newUser._id,res)

        res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            email : newUser.email,
        
        })

    } catch (error) {
        console.log("Error in admin signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const loginAdmin = async(req,res) => {
    try{
        const {email,password}= req.body;
        const user  = await Admin.findOne({email});                                 // find  the user by username from db

        if (!user) {
            // If no user is found, respond with an invalid email
            return res.status(400).json({ error: "Invalid email" });
        }
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")  // If password not match it will not throw error

        if (!isPasswordCorrect) {
            // If the password is incorrect, also respond with an invalid username or password error
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token
        generateTokenAndSetCookie(user._id,res)              // if authentication is success then only it will execute pass user id as parameter


        

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
    
            role:"admin"
        })


    }catch (error){
        console.log("error in admin login",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const logoutAdmin = (req,res) => {
    
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }catch (error){
        console.log("error in admin logout",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const signupEmp = async(req,res) => {
    try {
        const { fullname,email,title,department } = req.body


        // const user = await Employee.findOne({email})

        // if(user){
        //     return res.status(400).json({error:"email already exists"})
        // }


        const adminUser = await Admin.findOne({ email });
        if(adminUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const employeeUser = await Employee.findOne({ email });
        if(employeeUser) {
            return res.status(400).json({ error: "Email already in use" });
        }



        const temporaryPassword = generateTemporaryPassword();


        // hash password

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(temporaryPassword,salt)

        const newUser = new  Employee ({
            fullname,
            email,
            password : hashedPassword,
            title,
            department
        })

        await newUser.save()

        

        // generateTokenAndSetCookie(newUser._id,res)
        
            await sendWelcomeEmail(email,fullname, temporaryPassword)

        res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            email : newUser.email,
            title:newUser.title,
            department:newUser.department,
            role:"employee"
        })

    } catch (error) {
        console.log("Error in employee signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const loginEmp = async(req,res) => {
    try{
        const {email,password}= req.body;
        const user  = await Employee.findOne({email});                                 // find  the user by username from db
        

        if (!user) {
            // If no user is found, respond with an invalid email
            return res.status(400).json({ error: "Invalid email" });
        }
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")  // If password not match it will not throw error

        if (!isPasswordCorrect) {
            // If the password is incorrect, also respond with an invalid username or password error
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token
        generateTokenAndSetCookie(user._id,res)              // if authentication is success then only it will execute pass user id as parameter


        

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            password:user.password,
            role:"employee"
        })


    }catch (error){
        console.log("error in employee login",error.message);
        res.status(500).json({error:"Internal server error"})
    }

}

export const logoutEmp = (req,res) => {
    res.send("logoutEmp");
}


async function sendWelcomeEmail(email,fullname, temporaryPassword) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Replace with your actual email
                pass:process.env.EMAIL_PASS  // Replace with your actual email password or app password
            }
        });

        const mailOptions = {
            from:  process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: "Welcome to employee", // Subject line
            // text: `Dear ${fullname},\n\nWelcome to our company! We are glad to have you with us.\n\nBest,\nThe Team`, // plain text body
            text: `Dear ${fullname},\n\nWelcome to our company! We are glad to have you with us. Your account has been successfully created.\n\nUsername: ${email}\nOTP Password: ${temporaryPassword}\n\nPlease keep this information secure.\n\nRegards,\nThe Company`
        // };
            // html: `<b>Dear ${fullname},</b><br><br>Welcome to our company! We are glad to have you with us.<br><br>Best,<br>The Team`, // html body
        };

        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}


const generateTemporaryPassword = () => {
    // Generate a random string for temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8);
    return temporaryPassword;
};