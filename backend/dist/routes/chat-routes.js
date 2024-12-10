import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, getChatHistory, clearChatHistory, } from "../controllers/chat-controllers.js";
//Protected API
const router = Router();
router.post("/new", validate(chatCompletionValidator), generateChatCompletion);
router.get("/allchats", getChatHistory);
router.delete("/delete", clearChatHistory);
export default router;
//# sourceMappingURL=chat-routes.js.map