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

export const getAllProducts_db = async () => {
  return await ProductModel.find();
};

export const getProductById_db = async (id: string) => {
  return await ProductModel.findById(id);
};

export const addProduct_db = async (product: any) => {
  const newProduct = new ProductModel(product);
  console.log("🔥  file: product.ts:24  newProduct: ", newProduct);
  return await newProduct.save();
};

export const deleteProduct_db = async (id: string) => {
  return await ProductModel.deleteOne({ _id: id });
};
