const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());
// server.use(express.urlencoded());

const port = process.env.SERVER_PORT || 5000;
console.log(process.env.SERVER_PORT, "serverpppppp");
// console.log(process.argv)

let channels = [];
let lessons = [];

server.get("/", (req, res) => {
  res.json({
    hello: "word",
  });
});

server.get("/api/channels", (req, res) => {
  res.status(200).json(channels);
});

server.post("/api/channels", (req, res) => {
  const channelInfo = req.body;
  channelInfo.id = shortid.generate();
  channels.push(channelInfo);
  res.status(201).json(channelInfo);
});

server.get("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  const found = channels.find((channel) => channel.id === id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "channel doesnot exist" });
  }
});

server.post("/api/lessons", (req, res) => {
  const lessonInfo = req.body;
  lessonInfo.id = shortid.generate();
  lessons.push(lessonInfo);
  res.status(201).json(lessonInfo);
});

server.get("/api/lessons", (req, res) => {
  res.status(200).json(lessons);
});

server.delete("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  const deleted = channels.find((channel) => channel.id === id);
  if (deleted) {
    channels = channels.filter((channel) => channel.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: "channels you are looking for doesnot exits",
    });
  }
});
server.delete("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const deleted = lessons.find((lesson) => lesson.id === id);
  if (deleted) {
    lessons = lessons.filter((lesson) => lesson.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: "lesson you are looking for doesnot exits",
    });
  }
});

server.get("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const found = lessons.find((lesson) => lesson.id === id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "lesson doesnot find" });
  }
});

server.put("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const index = channels.findIndex((channel) => channel.id === id);

  if (index !== -1) {
    channels[index] = changes;
    res.status(200).json(channels[index]);
  } else {
    res.status(404).json({ message: "channel goesnot  exit" });
  }
});

server.patch("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const found = channels.find((channel) => channel.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "channel goesnot  exit" });
  }
});


server.patch("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const found = lessons.find((lesson) => lesson.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "lesson goesnot  exit" });
  }
});



server.listen(port, () => {
  console.log(`${port}`);
});
