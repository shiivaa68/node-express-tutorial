const express = require("express");
const messageService = require("../services/messageService");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultMeesage = await messageService.deleteMessageUser(id);
    if (resultMeesage == 0) {
      throw new Error("No message found with that id");
    }

    res
      .status(200)
      .json({ message: `Message with id ${id} deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error.message || "An error occurred while deleting the message",
      });
  }
});

module.exports = router;
