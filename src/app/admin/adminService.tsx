import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/accounts";
export const getAllUser = () => axios.get(REST_API_BASE_URL);
export const deleteUser = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
