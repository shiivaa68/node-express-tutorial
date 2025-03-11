const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
  // console.log("req.session", req.session);
  // if (req.session && req.session.user) {
  //   next();
  // } else {
  //   res.status(401).json({ message: "sorry dude/dudette,cannot let you in " });
  // }
};
