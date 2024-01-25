import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/categories";
export const getAllCategories = () => axios.get(REST_API_BASE_URL);
export const deleteCategory = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
export const getCategory = (id: any) => axios.get(REST_API_BASE_URL + "/" + id);
export const createCategory = (data: any) =>
  axios.post(REST_API_BASE_URL, data);
export const updateCategory = (id: any, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data);
