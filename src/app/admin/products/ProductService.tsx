import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/products";
export const getAllProduct = () => axios.get(REST_API_BASE_URL);
export const deleteProduct = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
export const getProduct = (id: any) => axios.get(REST_API_BASE_URL + "/" + id);
export const createProduct = (data: any) => axios.post(REST_API_BASE_URL, data);
export const updateProduct = (id: any, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data);

export const nodeService = {
  getDataSize() {
    return [
      {
        key: "1",
        value: "S",
      },
      {
        key: "2",
        value: "M",
      },
      {
        key: "3",
        value: "L",
      },
      {
        key: "4",
        value: "XL",
      },
      {
        key: "5",
        value: "XXL",
      },
    ];
  },
};
