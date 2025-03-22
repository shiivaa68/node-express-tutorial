const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token recived" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token recieved" });
  }
};

module.exports = checkToken;
