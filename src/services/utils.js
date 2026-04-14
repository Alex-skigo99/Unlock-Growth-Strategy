import { isLocalEnv } from "../config";

// React Query global config — disables retries, enables offline-first in dev
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      networkMode: isLocalEnv ? "offlineFirst" : "online"
    }
  }
};
