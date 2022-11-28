import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors);
app.use(express.json)

dotenv.config();

const connect = () => {
	mongoose.connect(process.env.MONGO_URI).then(
		() => {
			console.log("Connected to mongoDB");
		}
	).catch(err => {throw err})
}

app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});