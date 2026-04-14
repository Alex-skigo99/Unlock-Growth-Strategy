import { Modal } from "antd";
import axios from "axios";

/**
 * Global Axios interceptors:
 *  • Request  – attaches JWT token, increments active-request counter, shows loader
 *  • Response – decrements counter, hides loader, shows error modals by HTTP status
 */

const SESSION_EXPIRED_ERR_MSG = "Session expired: Your session has timed out. Please log in again to continue.";
const ACCESS_DENIED_ERR_MSG = "Access denied or action doesnt exist";
const NOT_FOUND_MSG = "Sorry but we didnt find what you were after";
const DATA_AVAILABLE_ERR_MSG = "No data available.";
const USER_ALREADY_EXISTS = "User already exists";

let isModalNowOpen = false;
let activeRequests = 0;

const interceptors = {
  setupInterceptors: (toggleLoader) => {
    axios.interceptors.request.use((config) => {
      if (!config.preventLoading) {
        activeRequests++;
        if (activeRequests === 1) toggleLoader(true);
      }
      const token = localStorage.getItem("token");
      if (!config.headers["Content-Type"]) config.headers["Content-Type"] = "application/json";
      if (token && !config.skipAuthorizationHeader) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    axios.interceptors.response.use(
      (res) => {
        if (!res.config.preventLoading) {
          activeRequests--;
          if (activeRequests === 0) toggleLoader(false);
        }
        return res;
      },
      (err) => {
        toggleLoader(false);
        const serverErrorMsg = DATA_AVAILABLE_ERR_MSG;

        let errorMessage;
        switch (err.response?.status) {
          case 401:
            // If user is not logged in, in homepage, clear the local storage and reload the page
            if (window.location.pathname === "/") {
              localStorage.clear();
              document.location.reload();
              return;
            }
            if (!isModalNowOpen) {
              isModalNowOpen = true;
              Modal.info({
                content: SESSION_EXPIRED_ERR_MSG,
                centered: true,
                onOk: () => {
                  document.location.href = "/signin";
                  localStorage.clear();
                }
              });
            }
            return Promise.reject(err);
          case 403:
            if (!isModalNowOpen) {
              isModalNowOpen = true;
              return Modal.info({
                content: ACCESS_DENIED_ERR_MSG,
                centered: true,
                onOk: () => {
                  document.location.href = "/signin";
                  localStorage.clear();
                }
              });
            }
            return Promise.reject(err);
          case 404:
            errorMessage = NOT_FOUND_MSG;
            break;
          case 409:
            errorMessage = err?.response?.data?.msg || USER_ALREADY_EXISTS;
            break;
          default:
            errorMessage = serverErrorMsg;
            break;
        }

        if (!isModalNowOpen) {
          isModalNowOpen = true;
          Modal.error({
            title: "Oops... something went wrong",
            content: errorMessage,
            okButtonProps: { className: "bg-brandColor" },
            centered: true,
            onOk: () => {
              isModalNowOpen = false;
            },
            onCancel: () => {
              isModalNowOpen = false;
            }
          });
        }

        if (!err.response) {
          err.response = { data: { success: false } };
        }

        return Promise.reject(err);
      }
    );
  }
};

export default interceptors;
