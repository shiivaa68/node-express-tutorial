const express = require("express");
const LessonService = require("../services/lessonService");
const lessonService = require("../services/lessonService");
const router = express.Router();

const MessageDTO = require("../dtos/MessageDTO");

router.get("/", async (req, res) => {
  try {
    const lessons = await LessonService.findAllLessions();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Can't retrieve lessons" });
  }
});

router.post("/", async (req, res) => {
  try {
    const lessonInfo = await LessonService.addLesson(req.body);
    res.status(200).json(lessonInfo);
  } catch (error) {
    res.status(500).json({ message: "Cannot add lesson" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await LessonService.findlessonById(id);

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
    const deletedLesson = await LessonService.deleteLesson(id);

    if (deletedLesson > 0) {
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
    const updatedLesson = await LessonService.updateLesson(id, changes);

    if (updatedLesson) {
      res.status(200).json(updatedLesson);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Error updating record", error: error.message });
  }
});

router.get("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const lessons = await lessonService.findLessonMessagesAll(id);
    res.status(200).json(lessons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving messages", error: error.message });
  }
});

router.post("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const msg = req.body;

    if (!msg.lesson_id) {
      msg.lesson_id = parseInt(id, 10);
    }

    // Add the message
    const message = await LessonService.addMessageToLesson(msg, id);
    if (message) {
      const messageDTO = new MessageDTO(message); //transform the model into dto

      res.status(200).json(messageDTO);
    } else {
      res.status(500).json({ message: "Failed to add message" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
