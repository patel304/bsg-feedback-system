const jwt = require("jsonwebtoken");

const generateToken = (id, role, department) => {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment variables");
  }

  return jwt.sign(
    {
      id,
      role,
      department,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
      issuer: "BSG-Backend",
    }
  );
};

module.exports = generateToken;
