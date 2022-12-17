const jwt = require("jsonwebtoken");

const tokenVerfication = (req,res,next) => {

  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    
    next()
  } catch (error) {
    res.status(403).json("Invalid token")
  }
}

module.exports = {
  tokenVerfication
}