import axios from "axios";
import { endpoints } from "../endpoints";

export const questionnaireService = {
  getQuestionnaire: async () => {
    const response = await axios.get(endpoints.getQuestionnaire);
    return response.data;
  }
};
