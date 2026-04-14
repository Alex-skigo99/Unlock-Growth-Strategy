// Resolve API base URL: production endpoint or local dev server
let apiUrlEndpoint;
if (window.location.host.includes("hr.insightgenie.ai")) {
  apiUrlEndpoint = "https://hr-api.insightgenie.ai/";
} else {
  apiUrlEndpoint = "http://localhost:9718/";
}

const isLocalEnv = apiUrlEndpoint.includes("localhost");

export { apiUrlEndpoint, isLocalEnv };
