const jwt = require("jsonwebtoken");

const generateToken = (id, role, department) => {
  return jwt.sign(
    { id, role, department },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
