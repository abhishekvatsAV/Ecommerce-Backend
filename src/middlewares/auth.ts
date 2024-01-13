import { NextFunction, Request, Response } from "express";
import { getUser } from "../service/auth.js";
import UserModel from "../models/user.js";
import { UserRequest } from "../types.js";

export const checkAuth = async (req: UserRequest, res: Response, next: NextFunction) => {
  // bearer token(jwt token) will be present in header of the request
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ message: "Login First!" });
  }

  const token = authHeader.split(" ")[1]; // to get the token
  const user = getUser(token); // to get the user(payload)

  // user._id is checked as we have attached this
  // while generating token on payload see setUser fnx
  if (!user || !user._id) {
    return res.status(401).json({ message: "Invalid Token." });
  }

  // there might be case that token is valid
  // but user got deleted from the db
  const dbUser = await UserModel.findOne({ _id: user._id });
  if (!dbUser) {
    return res.status(403).json({ message: "User Doesn't Exist." });
  }

  // attaching user for next api's
  if (!req.user) {
    req.user = {} as { _id: string; email: string };
  }
  req.user._id = dbUser._id.toString();
  req.user.email = dbUser.email;

  next();
};

export const restrictTo = (roles: Array<string>) => {
  // when calling this restrictTo fxn we will get the roles arr
  // so we have to check if the req.user is have the role that present
  // in the roles arr so we can allow the user to go forward
  return function (req, res, next) {
    if (!req.user) return res.status(400).json({ message: "Login First" });

    if (!roles.includes(req.user.role)) {
      // if user role is not present in roles array
      return res.status(403).json({ message: "Unauthorized" });
    }

    // if user is allowed to access further
    next();
  };
};
