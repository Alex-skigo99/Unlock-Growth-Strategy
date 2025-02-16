import { useDispatch, useSelector } from "react-redux";
import interceptors from "../services/interceptor";
import { setLoaderOn, setLoaderOff } from "../store/reducers/appSettings";
import { Spin } from "antd";

let isInterceptorInitialized = false;

function InterceptorsComponent({ history, children }) {
  const dispatch = useDispatch();
  const isLoaderOn = useSelector((state) => state.appSettings.isLoaderOn);

  const toggleLoader = (isTurnOn) => {
    if (isTurnOn) dispatch(setLoaderOn());
    else dispatch(setLoaderOff());
  };

  if (!isInterceptorInitialized) {
    interceptors.setupInterceptors(history, toggleLoader);
    isInterceptorInitialized = true;
  }

  return (
    <Spin spinning={isLoaderOn} size="large" className="!fixed !top-[50%] -translate-y-1/2 custom-spin">
      {children}
    </Spin>
  );
}

export default InterceptorsComponent;
