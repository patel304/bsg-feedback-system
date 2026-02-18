const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  submitFeedback,
  getMyFeedback
} = require("../controllers/feedbackController");

router.post("/", protect, authorizeRoles("candidate"), submitFeedback);
router.get("/my", protect, authorizeRoles("candidate"), getMyFeedback);

module.exports = router;
