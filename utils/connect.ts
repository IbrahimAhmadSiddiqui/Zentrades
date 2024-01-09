import axios from "axios";

export const BASE_CONNECTOR = axios.create({
  baseURL: "https://s3.amazonaws.com",
});
