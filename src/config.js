let webDomain = "https://hr.insightgenie.ai/";

let apiUrlEndpoint;
if (window.location.host.includes("hr.insightgenie.ai")) {
  apiUrlEndpoint = "https://hr-api.insightgenie.ai/";
} else apiUrlEndpoint = "http://localhost:9718/";

const isLocalEnv = apiUrlEndpoint.includes("localhost");

if (isLocalEnv) webDomain = "http://localhost:3000/";

const MAX_RETRIES_QUERY_RETRY = 3;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

const IMG_UPLOAD_LIMIT = 25 * 1024 * 1024; // 5 MB
const VIDEO_UPLOAD_LIMIT = 50 * 1024 * 1024; // 50 MB

const typeOfAnswers = "full"; // "full" or "short"

export {
  webDomain,
  apiUrlEndpoint,
  isLocalEnv,
  MAX_RETRIES_QUERY_RETRY,
  HTTP_STATUS_TO_NOT_RETRY,
  IMG_UPLOAD_LIMIT,
  VIDEO_UPLOAD_LIMIT,
  typeOfAnswers
};
