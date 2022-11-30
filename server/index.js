import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/messages.js";
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT || 5000;
const connect = () => {
	mongoose.connect(process.env.MONGO_URI).then(
		() => {
			console.log("Connected to mongoDB");
		}
	).catch(err => {throw err})
}


app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);


const server = app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});


const io = new Server(server, { 
	cors: { 
		origin: '*' ,
		credentials: true,
	} 
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	console.log('Connection established');

	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id)
	})

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);

		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-received", data.message)
		}
	})
});