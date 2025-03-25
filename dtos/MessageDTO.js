class MessageDTO {
  constructor(message) {
    this.id = message.id;
    this.lesson_id = message.lesson_id; //linked to lesson
    this.sender = message.sender;
    this.text = message.text;
    this.createdAt = message.createdAt;
  }
}
module.exports = MessageDTO;
