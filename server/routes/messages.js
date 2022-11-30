import express from "express";
import { getAllMessage, addMessage } from "../controller/message.js";

const messageRouter = express.Router();

messageRouter.post("/addmessage",addMessage)
messageRouter.post("/getmessage",getAllMessage)

export default messageRouter;