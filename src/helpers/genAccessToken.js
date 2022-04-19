const jwt = require("jsonwebtoken");
//test
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// generating access token
exports.generateAccessToken = (user = {}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "75h",
    }
  );
};
