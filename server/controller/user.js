import User from "../model/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
	try {

		const {username, email, password} = req.body;

		const usernameCheck = await User.findOne({username});

		if (usernameCheck) 
			return res.json({msg: "Username already in use", status: false})

		const emailCheck = await User.findOne({email})
		if (emailCheck) 
			return res.json({msg: "Email already in use", status: false})

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({email, username, password:hashedPassword});

		delete user.password

		return res.json({
			status: true,
			user
		})

	} catch (e) {
		next(e);
	}

}

export const login = async(req, res, next) => {
	try {

		const {username, password} = req.body;

		const user = await User.findOne({username});
		if (!user) 
			return res.json({msg: "Incorrect username or password", status: false})

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) 
			return res.json({msg: "Incorrect username or password", status: false})

		delete user.password

		return res.json({
			status: true,
			user
		})

	} catch (e) {
		next(e);
	}
}