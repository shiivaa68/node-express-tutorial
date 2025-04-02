import { Lesson } from "../types";

class LessonDTO {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor(lesson: Lesson) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.created_at = lesson.created_at;
    this.updated_at = lesson.updated_at;
  }

  static fromLesson(lesson: Lesson) {
    return new LessonDTO(lesson);
  }
}
export default LessonDTO;
