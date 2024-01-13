import express from "express";
import { restrictTo } from "../middlewares/auth.js";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.js";
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", restrictTo(["ADMIN"]), addNewProduct);

router.get("/:id", restrictTo(["ADMIN"]), deleteProduct);

export default router;
