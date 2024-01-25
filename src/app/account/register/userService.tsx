import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/accounts";
export const getEmail = (data: any) =>
  axios.post(REST_API_BASE_URL + "/email", data);
export const createUser = (data: any) => axios.post(REST_API_BASE_URL, data);
