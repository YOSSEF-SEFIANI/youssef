import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const GetProducts = () => {
  return productsApi.get("/products");
};
export const GetProductsById = (id) => {
  return productsApi.get(`/products/${id}`);
};
export const AddProducts = (products) => {
  return productsApi.post("/products", products);
};
export const EditProducts = (products) => {
  return productsApi.put(`/products/${products.id}`, products);
};
export const CheckedProduct = (products) => {
  return productsApi.patch(`/products/${products.id}`, {
    checked: !products.checked,
  });
};
export const DeleteProducts = (products) => {
  return productsApi.delete(`/products/${products.id}`);
};
