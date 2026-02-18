const Feedback = require("../models/Feedback");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendEmail");
const generateCertificate = require("../utils/certificateGenerator");

exports.getDepartmentFeedback = async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = {};

    if (req.user.role === "admin") {
      query.department = req.user.department;
    }

    if (search) {
      query.eventName = { $regex: search, $options: "i" };
    }

    const feedback = await Feedback.find(query)
      .populate("userId", "name email");

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("userId");

    if (!feedback)
      return res.status(404).json({ message: "Not found" });

    if (
      req.user.role === "admin" &&
      feedback.department !== req.user.department
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    feedback.status = "approved";
    feedback.certificateId = uuidv4();
    await feedback.save();

    const certificatePath = await generateCertificate(feedback);

    await sendEmail(
      feedback.userId.email,
      "Your BSG Certificate",
      `Dear ${feedback.userId.name},
      
Congratulations! Please find your certificate attached.
Certificate ID: ${feedback.certificateId}
      
Regards,
BSG India`,
      certificatePath
    );

    res.json({ message: "Approved & Certificate Sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
