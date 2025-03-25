class LessonDTO {
  constructor(lesson) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.createdAt = lesson.created_at;
    this.updateAt = lesson.updated_at;
  }
}

module.exports = LessonDTO;
