import express from "express";
import {pool} from "../db/db.js"; //knows how to comm. with psql db
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/files", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // from our middleware
    console.log("Fetching files for user ID:", userId);
    const result = await pool.query(
      `SELECT file_name, file_type, file_size, created_at, s3_key, status
       FROM files
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    console.log("Files retrieved:", result.rows);
    res.json({ files: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default router;