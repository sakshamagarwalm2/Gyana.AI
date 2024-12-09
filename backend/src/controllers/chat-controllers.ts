import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGroq } from "../config/groq-config.js";
import Groq from 'groq-sdk';

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, userId } = req.body;
  console.log(message, userId);
  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as Groq.ChatCompletionMessageParam[];

    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to Groq API
    const groq = configureGroq();

    // get latest response
    const chatResponse = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: chats,
    });

    const responseMessage = chatResponse.choices[0].message;
    user.chats.push({
      content: responseMessage.content || '',
      role: responseMessage.role
    });

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send("User not registered");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send("User not registered");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};