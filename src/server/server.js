import express from "express";
import "../config/env.js"
import cors from "cors"
import authRoutes from "../routes/auth.routes.js"
const app = express();
const PORT = process.env.PORT; //.env file must be in same directory as file using dotenv.config()

app.use(express.json());
app.use(cors({credentials:true}))

app.use("/auth",authRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});