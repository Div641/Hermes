import {Router} from "express";
import { sendMessage, getChats, getMessages , deleteChat } from "../controllers/chat.controller.js";
import { authUser} from "../middlewares/auth.middleware.js";

const chatRouter = Router();


chatRouter.post("/message", authUser, sendMessage); //chat krne k liye logged in hona is must
chatRouter.get("/", authUser, getChats);
chatRouter.get("/:chatId/messages", authUser, getMessages)
chatRouter.delete("/delete/:chatId", authUser, deleteChat)


export default chatRouter;