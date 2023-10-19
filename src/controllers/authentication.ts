import { createUserAsync, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try{
		const {email, password} = req.body;

		if(!email || !password){
			return res.sendStatus(400).json("invalid credentials");
		}

		const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

		if(!user)
		{
			return res.sendStatus(400).json("user doens't exist");
		}

		const expectedHash = authentication(user!.authentication!.salt as string, password);

		console.log("expected hash", expectedHash);
		console.log("password", user!.authentication!.password);

		if(user!.authentication!.password != expectedHash)
		{
			return res.sendStatus(403);
		}

		const salt = random();
		user!.authentication!.sessionToken = authentication(salt, user._id.toString());

		await user.save();

		res.cookie("Volodymyr-auth", user.authentication?.sessionToken,
		{
			domain: 'localhost'
		});

		return res.status(200).json(user);

	}catch (error){
		console.error(error);
		return res.sendStatus(400);
	}
}

export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try{
		const {email, password, username} = req.body;		

		if(!email || !password || !username)
		{
			return res.sendStatus(400);
		}

		const existingUser = await getUserByEmail(email);

		if(existingUser)
		{
			return res.status(400).json({
				"message": "user already exists"
			});
		}

		const salt = random();
		const user = await createUserAsync({
			email,
			username,
			authentication: {
				salt, 
				password: authentication(salt, password)
			}
		});

		return res.status(200).json(user);
	}
	catch(error){
		console.log(error);
		return res.sendStatus(400);
	}
}