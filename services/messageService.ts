import MessageModel from "../models/messageModel";

// i have problem here
const MessageService = () => {
  const deleteMessageUser = async (messageId: number) => {
    const deletedMessage = await MessageModel.removeMessage(messageId);
    return deletedMessage;
  };

  return { deleteMessageUser };
};

export default MessageService();
