const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const {
    eventName,
    eventDate,
    rating,
    trainingQuality,
    discipline,
    leadership,
    facilities,
    suggestions
  } = req.body;

  const feedback = await Feedback.create({
    userId: req.user._id,
    department: req.user.department,
    eventName,
    eventDate,
    rating,
    trainingQuality,
    discipline,
    leadership,
    facilities,
    suggestions
  });

  res.status(201).json(feedback);
};

exports.getMyFeedback = async (req, res) => {
  const feedback = await Feedback.find({ userId: req.user._id });
  res.json(feedback);
};
