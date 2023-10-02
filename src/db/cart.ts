import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  imgSrc: { type: String, required: true },
  sale: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
});

const CartModel = mongoose.model("Product", cartSchema);
export default CartModel;

export const getAllCartItems = async () => {
  return await CartModel.find();
};

export const getCartItemById = async (id: string) => {
  return await CartModel.find({ _id: id });
};

export const addtoCart = async (product: any) => {
  const newCartItem = new CartModel(product);
  return await newCartItem.save();
};

export const deleteCartItem = async (id: string) => {
  return await CartModel.deleteOne({ _id: id });
};

