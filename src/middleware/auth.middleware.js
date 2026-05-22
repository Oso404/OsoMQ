import jwt from "jsonwebtoken";
import "../config/env.js"

//will be called after user logs in 
//ill redirect to /dashboard and have mid dleware run 
//cookie is sent from be to fe 
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("no token found!!!")
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //userId:user.email, role:"uploader" 
    next();
  } catch (err) {
    console.log("error decoding the jwt token")
    return res.status(401).json({ authenticated: false });
  }
};