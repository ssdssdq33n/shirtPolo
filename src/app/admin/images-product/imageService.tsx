import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/images";
export const getAllImageProduct = () => axios.get(REST_API_BASE_URL);
export const deleteImageProduct = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
export const getImageProduct = (id: any) =>
  axios.get(REST_API_BASE_URL + "/" + id);
export const getProductId = (id: any) =>
  axios.get(REST_API_BASE_URL + "/api/" + id);
export const getFileImageProduct = (file: any) =>
  axios.get(REST_API_BASE_URL + "/imagesUpload/" + file);
export const createImageProduct = (id: number, data: any) =>
  axios.post(REST_API_BASE_URL + "/" + id, data);
export const updateImageProduct = (id: number, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data);
export const ImageUploadProduct = (id: number, data: any) =>
  axios.post(REST_API_BASE_URL + "/layra/" + id, data);
