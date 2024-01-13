import express from "express";
import pkg from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

import { checkAuth } from "./middlewares/auth.js";

const { json } = pkg;
const app = express();
app.use(json()); // this will parse any request and get any json inside any req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then((res) => {
    if (res) {
      app.listen(4000, () => {
        console.log("connected to db and listening to port : ", 4000);
      });
    }
  })
  .catch((err) => {
    console.log("🛑 error in connecting with db : ", err);
  });

// app.get("/", (req, res, next): RequestHandler => {
//   res.status(200).json({ message: "how u doin?" });
// });

app.use("/user", userRoutes);
app.use(checkAuth);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// admin@gmail.com
// 123

// TODO add ts-node to use nodemon