import express from "express";
import {register, login, setAvatar} from "../controller/user.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/setAvatar/:id", setAvatar);

export default userRouter;

