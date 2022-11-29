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

export const setAvatar = async(req, res, next) => {
	try {

		const userId = req.params.id;
		const avatarImage = req.body.image;
		const userData = await User.findByIdAndUpdate(
		  userId,
		  {
			isAvatarImageSet: true,
			avatarImage,
		  },
		  { new: true }
		);
		return res.json({
		  isSet: userData.isAvatarImageSet,
		  image: userData.avatarImage,
		});

	} catch (e) {
		next(e)
	}
}

export const allUsers = async(req, res, next) => {
	try {

		const users = await User.find({_id:{$ne: req.params.id}}).select([
			"email", "username","avatarImage","_id"
		]);

		return res.json(users);

	} catch (e) {
		next(e)
	}
}