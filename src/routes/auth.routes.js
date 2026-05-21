import { pool } from "../db/db.js";
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser)
router.post("/login",loginUser)
router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.user.userId; //contains user email

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [userId]
  );
  console.log(result.rows[0])

  res.json({
    authenticated: true,
    user: result.rows[0], //contains: email, password, created_at
  });
});


export default router;