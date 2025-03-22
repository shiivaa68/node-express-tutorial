const DbInstance = require("../models/messageModel");

const MessageService = () => {
  const deleteMessageUser = async (messageId) => {
    const deletedMessage = await DbInstance.removeMessage(messageId);
    return deletedMessage;
  };

  return { deleteMessageUser };
};

module.exports = MessageService();
