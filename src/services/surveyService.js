import axios from "axios";
import { endpoints } from "../endpoints";

export const surveyService = {
  createSurvey: async (email, link) => {
    const response = await axios.post(endpoints.survey, { email, link, isWebsiteOpened: true });
    return response;
  },

  saveAnswerToDB: async (id, answer) => {
    const response = await axios.patch(endpoints.survey + "/" + id, { answer });
    return response;
  },

  saveAsCompletedToDB: async (id) => {
    return await axios.patch(endpoints.survey + "/" + id, { isSurveyCompleted: true });
  },

  saveAsConfirmedToDB: async (id, newChannelLinkToSave) => {
    const body = { isChannelLinkConfirmed: true };
    if (newChannelLinkToSave) body.newYoutubersChannelLink = newChannelLinkToSave;
    return await axios.patch(endpoints.survey + "/" + id, body);
  },

  getSurveyStatus: async () => {
    const id = localStorage.getItem("surveyId");
    const response = await axios.get(endpoints.survey + "/" + id);
    return await response.data; // { currentAnswerNumber, isSurveyCompleted, isChannelLinkConfirmed }
  },

  getSurveyResult: async (id) => {
    return await axios.get(endpoints.result + "/" + id);
  },

  saveShareEmail: async (id, email) => {
    if (!email) return;
    if (!id) id = 0;
    return await axios.post(endpoints.shareEmail + "/" + id, { email });
  }
};
