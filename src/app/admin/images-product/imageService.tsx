import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/images";
export const getAllImageProduct = () => axios.get(REST_API_BASE_URL);
export const deleteImageProduct = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
export const getImageProduct = (id: any) =>
  axios.get(REST_API_BASE_URL + "/" + id);
export const createImageProduct = (data: any) =>
  axios.post(REST_API_BASE_URL, data);
export const updateImageProduct = (id: any, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data);
