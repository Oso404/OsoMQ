import { pool } from "../db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "../config/env.js"

export const registerUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    console.log(`Successfully received ${email} and ${password}`);
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      console.log("Email already exists!");
      return res.status(409).json({ message: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    console.log(result.rows[0]);
    return res.status(200).json({
      message: "New user created!",
      success: true,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    } 
    let jwt_token = jwt.sign(
        //this is the payload (remember jwt signature is header.payload.signature and signature needs a secret)
        {
          userId: user.email,
          role:"uploader"
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } //ig we oughta add this like header?...header is generated on its own!
      );

    res.cookie("token", jwt_token, {
      httpOnly: true,
      secure: false,      
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        email: user.email,
      },
      success:true,
    });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};