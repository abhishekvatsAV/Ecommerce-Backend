import { Request, Response } from "express";
import {
  addProduct_db,
  deleteProduct_db,
  getAllProducts_db,
} from "../models/product.js";

export const getAllProducts = async (req: Request, res: Response, next) => {
  const products = await getAllProducts_db();
  res.json({ products: products });
  return;
};

export const addNewProduct = async (req: Request, res: Response, next) => {
  const product = req.body;
  await addProduct_db(product);
  res.status(200).json({ message: "product created" });
  return;
};

export const deleteProduct = async (req: Request, res: Response, next) => {
  const id = req.params.id;
  await deleteProduct_db(id);
  res.status(200).json({ message: "product deleted" });
  return;
};
