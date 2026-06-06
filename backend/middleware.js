// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;   // 👈 attach user info to request
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;