class MessageDTO {
  id: number;
  lesson_id: number;
  sender: string;
  text: string;
  createdAt?: Date;

  constructor(message: {
    id: number;
    lesson_id: number;
    sender: string;
    text: string;
    createdAt?: Date;
  }) {
    this.id = message.id;
    this.lesson_id = message.lesson_id; //linked to lesson
    this.sender = message.sender;
    this.text = message.text;
    this.createdAt = message.createdAt;
  }
}
export default MessageDTO;
