import express from 'express';
import userrouter from './user-routes.js';
import chatsrouter from './chat-routes.js';
const approuter = express.Router();
approuter.use("/user", userrouter); //domain/api/v1/user
approuter.use("/chats", chatsrouter); //domain/api/v1/chats
export default approuter;
//# sourceMappingURL=index.js.map