import axios from "axios";
import { endpoints } from "../endpoints";

export const authService = {
  registerEmployee: async ({ repeatPassword, ...rest }) => {
    const response = await axios.post(endpoints.registerEmployeeEndpoint, rest);
    return response.data;
  },

  verifyEmployeeSignup: async (verificationToken) => {
    const response = await axios.post(endpoints.verifyEmployeeSignupEndpoint, { verificationToken });
    return response.data;
  },

  employeeLogin: async ({ email, password }, isEmployee) => {
    const response = await axios.post(endpoints.employeeLogin, { email, password, isEmployee });
    return response.data;
  },

  forgotPasswordInit: async (forgotPasswordInit) => {
    const response = await axios.post(endpoints.forgotPasswordInitEndpoint, { forgotPasswordInit });
    return response.data;
  },

  setNewPassword: async (emailConfToken, newPassword) => {
    const response = await axios.post(endpoints.setNewPasswordEmailTokenEndpoint, { emailConfToken, newPassword });
    return response.data;
  },

  checkIsEmailTokenValid: async (emailConfToken) => {
    const response = await axios.post(endpoints.checkIsEmailTokenValidEndpoint, { emailConfToken });
    return response.data;
  },

  // Check if user is logged in
  checkIsTokenValid: async (token) => {
    const response = await axios.get(`${endpoints.checkIsTokenValidEndpoint}?token=${token}`);
    return response.data;
  }
};
