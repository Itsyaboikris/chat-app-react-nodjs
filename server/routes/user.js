import express from "express";
import {register, login, setAvatar, allUsers} from "../controller/user.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/setAvatar/:id", setAvatar);

userRouter.get("/allUsers/:id", allUsers);

export default userRouter;

