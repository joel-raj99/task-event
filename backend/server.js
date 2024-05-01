import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyparser from 'body-parser';


//mongodb

import connectToMongoDB from "./db/connectToMongoDb.js";

//routes

import authRoutes from "./routes/authRoutes.js"
import empRoutes from "./routes/empRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"

//middleware 

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());                                                      // to parse the incoming request with JSON payload (from req.body)

//cors front end in angular 16 for angular
app.use(cors({
    Access_Control_Allow_Origin: "*",
    origin:"http://localhost:4200",
    methode:['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
  
  }));

app.use(bodyparser.json())


//routes 
//router for auth for admin &employee

app.use("/api/auth", authRoutes)
//router for employee
app.use("/api", empRoutes)
//router for task employee
app.use("/api/task", taskRoutes)
//router for event from admin
app.use("/api/event", eventRoutes)

//server running
app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server running on port ${PORT}`)
})