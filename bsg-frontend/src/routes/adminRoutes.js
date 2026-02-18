router.get("/verify/:id", async (req, res) => {
    const Feedback = require("../models/Feedback");
  
    try {
      const certificate = await Feedback.findOne({
        certificateId: req.params.id,
        status: "approved"
      }).populate("userId", "name email");
  
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
  
      res.json(certificate);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  