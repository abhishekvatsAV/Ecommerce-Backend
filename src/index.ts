import express, { Request, Response, NextFunction, RequestHandler } from "express";
import pkg from "body-parser";
const { json } = pkg;
const app = express();

app.use(json()); // this will parse any request and get any json inside any req.body

// middleware routes

app.get("/", (req, res, next):RequestHandler => {
  res.json({ message: "hello world" });
  return;
});

app.listen(4000, () => {
  console.log("listening to port : ", 4000);
});
