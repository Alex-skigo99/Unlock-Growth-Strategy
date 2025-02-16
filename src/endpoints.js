import { apiUrlEndpoint } from "./config";

export const endpoints = {
  // Auth
  registerEmployeeEndpoint: apiUrlEndpoint + "auth/register-employee",
  verifyEmployeeSignupEndpoint: apiUrlEndpoint + "auth/verify-employee-signup",
  employeeLogin: apiUrlEndpoint + "auth/authenticate",
  forgotPasswordInitEndpoint: apiUrlEndpoint + "auth/init-forgot-password",
  checkIsEmailTokenValidEndpoint: apiUrlEndpoint + "auth/check-is-email-token-valid",
  setNewPasswordEmailTokenEndpoint: apiUrlEndpoint + "auth/set-new-password-with-email-token",
  checkIsTokenValidEndpoint: apiUrlEndpoint + "auth/check-is-logged-in"
};
