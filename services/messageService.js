const MessageDTO = require("../dtos/MessageDTO");
const MessageModel = require("../models/messageModel");

const MessageService = () => {
  const deleteMessageUser = async (messageId) => {
    const deletedMessage = await MessageModel.removeMessage(messageId);

    return new MessageDTO(deletedMessage);
    // return deletedMessage;
  };

  return { deleteMessageUser };
};

module.exports = MessageService();
