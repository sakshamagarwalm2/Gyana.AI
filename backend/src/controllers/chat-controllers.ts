import { Response } from 'express';
import { AuthRequest } from '../middelwarea/auth-middleware.js';
import User from '../models/User.js';
import { configureGroq } from '../config/groq-config.js';

export const generateChatCompletion = async (req: AuthRequest, res: Response) => {
  try {
    const {  userId, message } = req.body;
    console.log("hit api msg : ",message, userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add user message to chat history
    user.chats.push({
      role: 'user',
      content: message,
      id: crypto.randomUUID()
    });

    // Get AI response
    const groq = configureGroq();
    const chatResponse = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful Ai assistant named Gyana.Ai based on llama3-70b model. Always respond in a clear and concise manner.' 
        },
        ...user.chats.map(({ role, content }) => ({ role, content }))
      ]
    });

    const aiMessage = chatResponse.choices[0].message;
    if (aiMessage.content) {
      user.chats.push({
        role: 'assistant',
        content: aiMessage.content,
        id: crypto.randomUUID()
      });
    }

    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    res.status(500).json({ message: 'Error generating response', error });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const {  userId } = req.body;
    console.log("get his: "+ userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ chats: user.chats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history', error });
  }
};

export const clearChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const {  userId } = req.body;
    console.log("delete his: "+ userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.chats = [];
    await user.save();
    res.status(200).json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing chat history', error });
  }
};