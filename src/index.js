import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InterceptorsComponent from "./layout/InterceptorsComponent";
import store from "./store/store";
import { queryClientConfig } from "./services/utils";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient(queryClientConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <InterceptorsComponent>
        <ConfigProvider
        // theme={{
        //   token: {
        //     colorPrimary: "#228920",
        //     colorLink: "#228920", // Default link color

        //     colorLinkHover: "#228920" // Hover color for links
        //   }
        // }}
        >
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ConfigProvider>
      </InterceptorsComponent>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
