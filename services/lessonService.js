const LessonModel = require("../models/lessonModel");
const LessonDTO = require("../dtos/LessonDTO");
const MessageModel = require("../models/messageModel");
const MessageDTO = require("../dtos/MessageDTO");

const LessonService = () => {
  const findAllLessions = async () => {
    const lessons = await LessonModel.find();

    return lessons.map((lesson) => new LessonDTO(lesson));
  };

  //dont work i have a qauestion
  const addLesson = async (lessonData) => {
    const lesson = await LessonModel.add(lessonData);
    return new LessonDTO(lesson);
  };

  const findlessonById = async (id) => {
    const findLesson = await LessonModel.findById(id);

    return new LessonDTO(findLesson);
  };

  const deleteLesson = async (id) => {
    const delLesson = await LessonModel.remove(id);
    return delLesson;
  };

  const updateLesson = async (id, changes) => {
    const updateLessonByid = await LessonModel.update(id, changes, {
      new: true,
    });
    console.log(updateLesson, "updaetlessson");
    return new LessonDTO(updateLessonByid);
  };

  // just return sender and text maybe we should write seperate dto
  const findLessonMessagesAll = async (id) => {
    const findMessage = await MessageModel.findLessonMessages(id);
    console.log(findMessage);
    return findMessage.map((message) => new MessageDTO(message));
  };

  const addMessageToLesson = async (msg, lessonId) => {
    const lesson = await LessonModel.findById(lessonId);
    if (!lesson) {
      throw new Error("invalid lesson id");
    }
    if (!msg.sender || !msg.text) {
      throw new Error("must provide both sender and text values");
    }

    msg.lesson_id = lessonId;

    const addedMessage = await MessageModel.addMessage(msg);
    return new MessageDTO(addedMessage);
  };

  return {
    findAllLessions,
    addLesson,
    findlessonById,
    deleteLesson,
    updateLesson,
    findLessonMessagesAll,
    addMessageToLesson,
  };
};

module.exports = LessonService();
