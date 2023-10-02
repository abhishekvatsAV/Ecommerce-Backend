import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import pkg from "body-parser";
import { addProduct, deleteProduct, getAllProducts } from "./db/product.js";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const { json } = pkg;
const app = express();
app.use(json()); // this will parse any request and get any json inside any req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.ljptmfg.mongodb.net/`
  )
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

app.get("/", (req, res, next): RequestHandler => {
  res.json({ message: "hello world" });
  return;
});

// products routes - start

app.get("/products", async (req, res, next) => {
  const products = await getAllProducts();
  res.json({ products: products });
  return;
});

app.post("/products", async (req: Request, res: Response, next) => {
  const product = req.body;
  await addProduct(product);
  res.status(200).json({ message: "product created" });
  return;
});

app.delete("/products/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log("id: ", id);
  await deleteProduct(id);
  res.status(200).json({ message: "product deleted" });
  return;
});

// products routes - end

// cart routes - start



// cart routes - end
