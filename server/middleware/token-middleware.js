import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  console.log("Authorization Header:", authorizationHeader);

  // If there’s no Authorization header, stop the request here
  if (!authorizationHeader) {
    return res
      .status(401)
      .send({ message: "No authorization header provided" });
  }

  // Split the header to get the token (e.g., Bearer <token>)
  const token = authorizationHeader.split(" ")[1];
  console.log("Token:", token);

  // If no token, return unauthorized
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).send("Invalid or expired token.");
    }

    req.user = decoded;
    req.userId = decoded.userId;

    next();
  });
}
