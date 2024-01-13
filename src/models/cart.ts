import mongoose from "mongoose";
import ProductModel from "./product.js";
const cartSchema = new mongoose.Schema({
  prodId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  imgSrc: { type: String, required: true },
  sale: { type: Boolean, required: true },
  inventory: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: String, require: true },
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;

export const getAllCartItems_db = async (userId: string) => {
  return await CartModel.find({ userId: userId }).select({ userId: 0, __v: 0 });
};

export const getCartItemByProductId = async (productId: string, userId: string) => {
  const cartItems = await CartModel.find({ prodId: productId, userId: userId });
  if (cartItems && cartItems.length > 0) {
    return cartItems[0];
  }
  return null;
};

export const getCartItemById_db = async (id: string, userId: string) => {
  return await CartModel.findOne({ _id: id, userId: userId });
};

// TODO cheek for id in cart if exists then update quantity
export const addtoCart_db = async (productId: string, userId: string) => {
  try {
    const { title, price, salePrice, imgSrc, sale, quantity: inventory, _id: temp } = await ProductModel.findById(productId);
    const prodId = temp.toHexString();
    const newCartItem = new CartModel({ title, price, salePrice, imgSrc, sale, inventory, prodId, userId, quantity: 1 });
    await newCartItem.save();
    return newCartItem;
  } catch (error) {
    console.log("🛑  file: cart.ts:31  error: ", error);
    throw Error(`Unable to add to cart Error Occured : ${error.message}`);
  }
};

export const deleteCartItem_db = async (id: string, userId: string) => {
  return await CartModel.deleteOne({ _id: id, userId: userId });
};
