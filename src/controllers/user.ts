import UserModel from "../models/user.js";
import { setUser } from "../service/auth.js";
import bcrypt from "bcrypt";

export const handleUserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await UserModel.create({ username, email, password: hash });

  const token = setUser(newUser);
  return res.status(200).json({
    token: token,
  });
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User Doesn't Exists or Email or Password are not Correct.",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({
      message: "User Doesn't Exists or Email or Password are not Correct.",
    });
  }

  const token = setUser(user);

  req.token = token;

  return res.status(200).json({ token: token });
};
