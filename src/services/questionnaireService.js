import axios from "axios";
import { endpoints } from "../endpoints";

// Fetches the list of survey questions from the backend
export const questionnaireService = {
  getQuestionnaire: async () => {
    const response = await axios.get(endpoints.getQuestionnaire);
    return response.data;
  }
};
