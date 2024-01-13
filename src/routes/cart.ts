import express from "express";
import {
  addCartItem,
  decreaseCartItemQuantityBy1,
  deleteCartItem,
  getAllCartItems,
  increaseCartItemQuantityBy1,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/", getAllCartItems);
router.post("/", addCartItem);
router.delete("/:id", deleteCartItem);
router.put("/incqtyby1", increaseCartItemQuantityBy1);
router.put("/decqtyby1", decreaseCartItemQuantityBy1);

export default router;
