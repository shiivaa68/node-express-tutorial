const jws = require("jsonwebtoken");

module.exports = (user) => {
  //need 3 things to create a token :playload,secret&options

  const playload = {
    id: user.id,
    username: user.username,
  };
  const secret = process.env.SECRET;
  const options = {
    expiresIn: "1d",
  };
  console.log({ jws });
  const token = jws.sign(playload, secret, options);

  return token;
};
