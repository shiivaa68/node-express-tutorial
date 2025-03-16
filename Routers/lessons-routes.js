const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lessons = await Lessons.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Can't retrieve lessons" });
  }
});

router.post("/", async (req, res) => {
  try {
    const lesson = await Lessons.add(req.body);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Cannot add lesson" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lessons.findById(id);

    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to perform operation" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Lessons.remove(id);

    if (count > 0) {
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ message: "Unable to locate record" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to delete" });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const lesson = await Lessons.update(id, changes);

    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Error updating record", error: error.message });
  }
});

router.post("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const msg = req.body;

    if (!msg.lesson_id) {
      msg.lesson_id = parseInt(id, 10);
    }

    // Check if the lesson exists
    const lesson = await Lessons.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: "Invalid lesson ID" });
    }

    // Validate required fields
    if (!msg.sender || !msg.text) {
      return res
        .status(400)
        .json({ message: "Must provide both sender and text values" });
    }

    // Add the message
    const message = await Lessons.addMessage(msg, id);
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(500).json({ message: "Failed to add message" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const lessons = await Lessons.findLessonMessages(id);
    res.status(200).json(lessons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving messages", error: error.message });
  }
});

module.exports = router;
