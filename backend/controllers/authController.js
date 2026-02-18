const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, mobile, department } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobile,
    department,
    role: "candidate"
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id, user.role, user.department)
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    _id: user._id,
    name: user.name,
    role: user.role,
    department: user.department,
    token: generateToken(user._id, user.role, user.department)
  });
};
