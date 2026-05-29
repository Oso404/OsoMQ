import express from "express";
import "../config/env.js"
import cors from "cors"
import authRoutes from "../routes/auth.routes.js"
import awsRoutes from "../routes/aws.routes.js"
const app = express();
const PORT = process.env.PORT; //.env file must be in same directory as file using dotenv.config()
import cookieParser from "cookie-parser";
import filesRoutes from "../routes/files.routes.js";

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//this is for when frontend calls our server 
//e.g. localhost:6969/auth/register or localhost:6969/auth/login
app.use("/auth", authRoutes)
app.use("/aws", awsRoutes)
app.use("/user", filesRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});