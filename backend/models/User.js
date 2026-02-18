const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    mobile: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["candidate", "admin", "superadmin"],
      default: "candidate",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
