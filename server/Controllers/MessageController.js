const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const MessageModel = require('../Models/message');

exports.getAllMessagesWithInfo = async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des messages." });
  }
};

exports.postMessageWithPhoto = async (req, res) => {
  const { nom, prenom, photo, contenu } = req.body;

  try {
    const newMessage = new MessageModel({ nom, prenom, photo, contenu });
    const savedMessage = await newMessage.save();
    
    res.status(201).json({ message: savedMessage });
  } catch (error) {
    console.error("Erreur lors de la création du message :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la création du message." });
  }
};