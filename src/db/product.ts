import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  imgSrc: { type: String, required: true },
  sale: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;

export const getAllProducts = async () => {
  return await ProductModel.find();
};

export const getProductById = async (id: string) => {
  return await ProductModel.find({ _id: id });
};

export const addProduct = async (product: any) => {
  const newProduct = new ProductModel(product);
  return await newProduct.save();
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.deleteOne({ _id: id });
};
