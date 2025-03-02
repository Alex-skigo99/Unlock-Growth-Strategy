import axios from "axios";
import { endpoints } from "../endpoints";

export const surveyService = {
  createSurvey: async (email, link) => {
    const response = await axios.post(endpoints.survey, { email, link });
    return response;
  },

  saveAnswerToDB: async (id, answer) => {
    const response = await axios.patch(endpoints.survey + "/" + id, { answer });
    return response.data;
  },

  saveAsCompletedToDB: async (id) => {
    const response = await axios.patch(endpoints.survey + "/" + id, { isCompleted: true });
    return response.data;
  },

  saveAsConfirmedToDB: async (id) => {
    const response = await axios.patch(endpoints.survey + "/" + id, { isConfirmed: true });
    return response.data;
  }
};
