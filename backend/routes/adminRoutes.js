const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const Feedback = require("../models/Feedback");

const {
  getDepartmentFeedback,
  approveFeedback
} = require("../controllers/adminController");

router.get(
  "/feedback",
  protect,
  authorizeRoles("admin", "superadmin"),
  getDepartmentFeedback
);

router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  approveFeedback
);

router.put("/reject/:id", async (req, res) => {
  const Feedback = require("../models/Feedback");

  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.status = "rejected";
    await feedback.save();

    res.json({ message: "Feedback Rejected" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const certificate = await Feedback.findOne({
      certificateId: req.params.id
    }).populate("userId", "name");

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(certificate);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
