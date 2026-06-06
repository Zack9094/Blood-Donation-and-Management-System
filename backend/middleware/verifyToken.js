const jwt = require("jsonwebtoken");
const jwtkey = "mysecretkey"; // use your actual key

module.exports = function (req, res, next) {

  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).send("No token provided");
  }

  // Remove "Bearer "
  console.log(header);
  const token = header.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(400).send("Invalid token format");
  }

  try {
    const decoded = jwt.verify(token, jwtkey);
    console.log(decoded)
    req.user = decoded;   // 👈 VERY IMPORTANT
     
    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};