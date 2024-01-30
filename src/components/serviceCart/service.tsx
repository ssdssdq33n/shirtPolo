import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/carts";
export const postCart = (size: string, data: any) =>
  axios.post(REST_API_BASE_URL + "/" + size, data);
export const postCartAndNumber = (size: string, data: any, quantity: number) =>
  axios.post(REST_API_BASE_URL + "/" + size + "/" + quantity, data);
