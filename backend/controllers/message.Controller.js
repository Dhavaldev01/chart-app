const Conversation = require("../models/conversation.Model");
const Message = require("../models/message.model");
const { io, getReceiverSocketId } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    // await gotConversation.save();
    // await newMessage.save();
    await Promise.all([gotConversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId); // Use the function here
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Emit to the receiver's socket
    }
    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
