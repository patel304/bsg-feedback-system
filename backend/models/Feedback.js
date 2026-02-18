const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    trainingQuality: {
      type: Number,
      min: 1,
      max: 5,
    },

    discipline: {
      type: Number,
      min: 1,
      max: 5,
    },

    leadership: {
      type: Number,
      min: 1,
      max: 5,
    },

    facilities: {
      type: Number,
      min: 1,
      max: 5,
    },

    suggestions: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    certificateId: {
      type: String,
      unique: true,
      sparse: true, // allow null values
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
