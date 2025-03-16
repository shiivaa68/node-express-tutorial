const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Lessons.removeMessage(id);

    if (count > 0) {
      res
        .status(200)
        .json({ message: `Message with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "No message found with that id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the message" });
  }
});

module.exports = router;
