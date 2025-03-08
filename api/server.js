const express = require("express");
const Lessons = require("../models/dbHelpers");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ messahe: "hello to server" });
});

server.get("/api/lessons", (req, res) => {
  Lessons.find().then((lessons) => {
    res
      .status(200)
      .json(lessons)
      .catch((error) => {
        res.status(500).json({ message: "cant add  lesson" });
      });
  });
});

server.post("/api/lessons", (req, res) => {
  Lessons.add(req.body)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot  add lesson" });
    });
});

server.get("/api/lessons/:id", (req, res) => {
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

server.delete("/api/lessons/:id", (req, res) => {
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

server.patch("/api/lessons/:id", (req, res) => {
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

server.post("/api/lessons/:id/messages", (req, res) => {
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
server.get("/api/lessons/:id/messages", (req, res) => {
  const { id } = req.params;
  Lessons.findLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "error retriveing messages" });
    });
});

server.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  Lessons.removeMessage(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `message with id ${id} successful ` });
      } else {
        res.status(404).json({ message: "no message with that id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "" });
    });
});

server.listen(port, () => {
  console.log(`${port}`);
});

module.exports = server;
