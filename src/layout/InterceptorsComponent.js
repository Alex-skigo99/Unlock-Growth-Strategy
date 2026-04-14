import { useDispatch, useSelector } from "react-redux";
import interceptors from "../services/interceptor";
import { setLoaderOn, setLoaderOff } from "../store/reducers/appSettings";
import { Spin } from "antd";

let isInterceptorInitialized = false;

/**
 * Wraps the app tree to:
 *  1. Set up axios interceptors once (request loader + error modals)
 *  2. Render a full-screen Spin overlay while any API request is in-flight
 */
function InterceptorsComponent({ children }) {
  const dispatch = useDispatch();
  const isLoaderOn = useSelector((state) => state.appSettings.isLoaderOn);

  const toggleLoader = (isTurnOn) => {
    if (isTurnOn) dispatch(setLoaderOn());
    else dispatch(setLoaderOff());
  };

  if (!isInterceptorInitialized) {
    interceptors.setupInterceptors(toggleLoader);
    isInterceptorInitialized = true;
  }

  return (
    <Spin spinning={isLoaderOn} size="large" className="!fixed !top-[50%] -translate-y-1/2 custom-spin">
      {children}
    </Spin>
  );
}

export default InterceptorsComponent;
