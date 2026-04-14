import { apiUrlEndpoint } from "./config";

// API endpoint map — all backend routes used by the survey flow
export const endpoints = {
  getQuestionnaire: apiUrlEndpoint + "api/get-questionnaire",
  survey: apiUrlEndpoint + "api/survey",
  result: apiUrlEndpoint + "api/survey/result",
  shareEmail: apiUrlEndpoint + "api/survey/share-email"
};
