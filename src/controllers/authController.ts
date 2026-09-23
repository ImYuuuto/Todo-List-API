import bcrypt from "bcrypt";
import type { Response, Request } from "express";
import authModel from "../models/authModel.js";

type UserInfos = {
  userName: string;
  password: string;
};

//Registeration

async function registerUser(req: Request, res: Response) {
  const { userName, password } = req.body as UserInfos;
  const saltRounds = 10;

  try {
    const existingUser = await authModel.searchForUser(userName);
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    if (userName.trim().length <= 3 || userName.trim().length >= 10) {
      return res.status(400).json({
        success: false,
        message: "The username should be between 3 and 10 characters",
      });
    }
    if (password.trim().length <= 6 || password.trim().length > 20) {
      return res.status(400).json({
        success: false,
        message: "The password should be between 6 and 20 characters",
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const result = await authModel.addUser(userName, hashPassword);
    return res.status(200).json({
      success: true,
      message: "user registered by success",
      result,
    });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//Login

async function loginUser(req: Request, res: Response) {
  const { userName, password } = req.body as UserInfos;
  if (userName.trim().length <= 3 || userName.trim().length >= 10) {
    return res.status(400).json({
      success: false,
      message: "The username should be between 3 and 10 characters",
    });
  }
  if (password.trim().length <= 6 || password.trim().length > 20) {
    return res.status(400).json({
      success: false,
      message: "The password should be between 6 and 20 characters",
    });
  }
  try {
    const existingUser = await authModel.searchForUser(userName);
    if (existingUser.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      existingUser[0].userPassword,
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or password" });
    }
    return res.status(200).json({
      success: true,
      message: "user registered by success",
      username:existingUser[0].username,
    });
    return 
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const authController = {
  registerUser,
};

export default authController;
