import { BASE_CONNECTOR } from "@/utils/connect";
import axios from "axios";

export const fetchApiData = async <T>(): Promise<T | null> => {
  try {
    const res = await BASE_CONNECTOR.get<T>("/open-to-cors/assignment.json");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const SendMail = async () => {
  try {
    const response = await axios.post("/api/sendmail");
    console.log(response.data);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};
