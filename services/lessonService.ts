import LessonModel from "../models/lessonModel";
import LessonDTO from "../dtos/LessonDTO";
import MessageModel from "../models/messageModel";
import MessageDTO from "../dtos/MessageDTO";

interface Lesson {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
interface Message {
  id: number;
  lesson_id: number;
  sender: string;
  text: string;
  created_at?: Date;
}
const LessonService = () => {
  
  const findAllLessions = async (): Promise<LessonDTO[]> => {
    const lessons: Lesson[] = await LessonModel.find();

    return lessons.map((lesson) => new LessonDTO(lesson));
  };

  //dont work i have a qauestion
  const addLesson = async (lessonData: Lesson): Promise<LessonDTO> => {
    const lesson = await LessonModel.add(lessonData);
    return new LessonDTO(lesson);
  };

  const findlessonById = async (id: number): Promise<LessonDTO> => {
    const findLesson = await LessonModel.findById(id);

    return new LessonDTO(findLesson);
  };

  const deleteLesson = async (id: number): Promise<number> => {
    const delLesson = await LessonModel.remove(id);
    return delLesson;
  };

  const updateLesson = async (
    id: number,
    changes: Partial<Lesson>
  ): Promise<LessonDTO> => {
    const updateLessonByid = await LessonModel.update(id, changes);
    console.log(updateLesson, "updaetlessson");
    return new LessonDTO(updateLessonByid);
  };

  // just return sender and text maybe we should write seperate dto
  const findLessonMessagesAll = async (id: number): Promise<MessageDTO[]> => {
    const findMessage = await MessageModel.findLessonMessages(id);
    console.log(findMessage);
    return findMessage.map((message) => new MessageDTO(message));
  };

  const addMessageToLesson = async (
    msg: Partial<Message>,
    lessonId: number
  ): Promise<MessageDTO> => {
    const lesson = await LessonModel.findById(lessonId);
    if (!lesson) {
      throw new Error("invalid lesson id");
    }
    if (!msg.sender || !msg.text) {
      throw new Error("must provide both sender and text values");
    }

    msg.lesson_id = lessonId;

    const addedMessage = await MessageModel.addMessage(msg, lessonId);
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

export default LessonService();
