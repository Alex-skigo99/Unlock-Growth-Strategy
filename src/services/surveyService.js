import axios from "axios";
import { endpoints } from "../endpoints";

/**
 * Survey API service — handles the full lifecycle of a survey instance.
 *
 * Flow:
 *  1. createSurvey     – initialised when youtuber opens the email link (email + channel URL)
 *  2. saveAnswerToDB   – persists each answer individually (PATCH) for resume support
 *  3. saveAsCompleted  – marks the survey as finished
 *  4. saveAsConfirmed  – youtuber confirms channel ownership
 *  5. getSurveyResult  – fetches the AI-generated personality report
 *  6. saveShareEmail   – sends the survey link to another creator
 */
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
