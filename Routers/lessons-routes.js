const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();
router.get("/", (req, res) => {
  Lessons.find().then((lessons) => {
    res
      .status(200)
      .json(lessons)
      .catch((error) => {
        res.status(500).json({ message: "cant add  lesson" });
      });
  });
});

router.post("", (req, res) => {
  Lessons.add(req.body)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot  add lesson" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ mesage: "Record not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "unable to perform operation",
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "success deleted" });
      } else {
        res.status(404).json({ message: "unable to locate record" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "unable to delete" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Lessons.update(id, changes)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "record not  found" });
      }
    })
    .catch((err) => {
      res.status(500), json({ message: "error updating record" });
    });
});

// endpoint message

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }
  Lessons.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: "invalid id" });
      }
      //check for  all required fields
      if (!msg.sender || !msg.text) {
        res
          .status(400)
          .json({ message: "must provide both sender and text value" });
      }
      Lessons.addMessage(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "failed to add message" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "failed to add lesson" });
    });
});
//retrive message and delete
//get message by lesson-id
router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  Lessons.findLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "error retriveing messages" });
    });
});

module.exports = router;
