import { pool } from "../db/db.js";
import express from "express";
import {upload} from "../controllers/aws.controllers.js"
import { uploadMiddleware } from "../middleware/aws.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

//aws s3 upload 
//with authmiddleware now i have access to user.id
//had to change token payload
router.post("/upload", authMiddleware, uploadMiddleware.array("files"), upload)


export default router;
