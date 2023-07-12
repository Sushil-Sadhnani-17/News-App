const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const privateKey = process.env.SECRET_KEY;
    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      try {
        const decodeToken = jwt.verify(token, privateKey);
        req.userId = decodeToken.user_id;
        req.userRole = decodeToken.role;
        next();
      } catch (error) {
        res.status(401).json({ status: false, message: "Invalid Token" });
      }
    } else {
      res.status(401).json({ status: false, message: "Token Not Found" });
    }
  };

module.exports = { verifyToken }