const express = require("express");
const Lessons = require("./models/dbHelpers");
const server = express();
server.use(express.json());
const port = process.env.SERVER_PORT || 5000;

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
    .then((lesson) => {
      res.status(200).json(lesson);
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

server.listen(port, () => {
  console.log(`${port}`);
});
