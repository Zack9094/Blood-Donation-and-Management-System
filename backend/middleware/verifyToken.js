const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_SECRET;

module.exports = function (req, res, next) {

  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).send("No token provided");
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(400).send("Invalid token format");
  }

  try {
    const decoded = jwt.verify(token, jwtkey);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
};