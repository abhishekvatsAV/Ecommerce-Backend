import { NextFunction, Request, Response } from "express";
import {
  addtoCart_db,
  deleteCartItem_db,
  getAllCartItems_db,
  getCartItemById_db,
  getCartItemByProductId,
} from "../models/cart.js";
import { UserRequest } from "../types.js";

export const getAllCartItems = async (req: UserRequest, res: Response, next: NextFunction) => {
  const cartItems = await getAllCartItems_db(req.user._id);
  res.json({ cartItems: cartItems });
  return;
};

export const addCartItem = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id: productId } = req.body;
  try {
    const cartItem = await getCartItemByProductId(productId, req.user._id);
    if (cartItem) {
      if (cartItem.quantity < cartItem.inventory) {
        cartItem.quantity += 1;
        await cartItem.save();

        res.status(200).json({ message: "item already in the cart so increased the quantity." });
        return;
      }
      res.status(406).json({ message: "item is already in the cart and cannot be increased in quantity further" });
      return;
    }

    const newCartItem = await addtoCart_db(productId, req.user._id);
    // TODO : remove this new Cart item
    res.status(201).json({ newCartItem: newCartItem, message: "cartItem got created and added to cart" });
    return;
  } catch (err) {
    console.log("error: ", err.message);
    res.status(406).json({ message: err.message });
    return;
  }
};

export const deleteCartItem = async (req: UserRequest, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await deleteCartItem_db(id, req.user._id);
    res.status(200).json({ message: "item deleted from cart" });
  } catch (error) {
    res.status(400).json({ message: "some error occur try again" });
  }
  return;
};

export const increaseCartItemQuantityBy1 = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { _id } = req.body;
  const cartItem = await getCartItemById_db(_id, req.user._id);
  if (cartItem.quantity >= cartItem.inventory) {
    res.status(406).json({
      message: "product is out of stock unable to increase the quantity",
    });
    return;
  }
  cartItem.quantity += 1;
  await cartItem.save();

  res.status(200).json({ message: "increase quantity of cartItem by 1" });
  return;
};

export const decreaseCartItemQuantityBy1 = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { _id } = req.body;
  const cartItem = await getCartItemById_db(_id, req.user._id);
  if (cartItem.quantity <= 1) {
    res.status(406).json({ message: "item quantity is less and 2 delete the item from the cart itself." });
    return;
  }
  cartItem.quantity -= 1;
  await cartItem.save();

  res.status(200).json({ message: "decrease quantity of cartItem by 1" });
  return;
};
