import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  generateChatCompletion,
  getChatHistory,
  clearChatHistory,
} from "../controllers/chat-controllers.js";

//Protected API
const router = Router();

router.post(
  "/new",
  validate(chatCompletionValidator),
  generateChatCompletion
);
router.post("/allchats",  getChatHistory);
router.post("/delete",  clearChatHistory);


export default router;
