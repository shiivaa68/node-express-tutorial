
import MessageModel from "../models/messageModel";

// i have problem here
const MessageService = () => {
  const deleteMessageUser = async (messageId: number) => {
    const deletedMessage = await MessageModel.removeMessage(messageId);

    return deletedMessage;
    // return deletedMessage;
  };

  return { deleteMessageUser };
};

export default MessageService();

// const MessageService = () => {
//   // Define the type of messageId as number
//   const deleteMessageUser = async (messageId: number): Promise<MessageDTO> => {
//     const deletedMessage = await MessageModel.removeMessage(messageId);

//     // Assuming the return type of removed message is of type Message
//     return new MessageDTO(deletedMessage);
//   };

//   return { deleteMessageUser };
// };
