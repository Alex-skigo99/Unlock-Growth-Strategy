import { useNavigate } from "react-router-dom";

export const CustomButton = ({ title = "Click", onClick, extraClass = "bg-primaryColor" }) => {
  return (
    <button
      className={` text-white text-[16px] font-medium py-2 px-5 rounded-xl hover:bg-darkColor mobile:text-[12px] ${extraClass}`}
      onClick={onClick || (() => {})}
    >
      {title}
    </button>
  );
};

export const SurveyButton = ({ extraClass, onClick }) => {
  return <CustomButton title="Take free test" extraClass={extraClass} onClick={onClick} />;
};

export const SampleResultButton = ({ extraClass }) => {
  const navigate = useNavigate();
  return (
    <CustomButton
      title="See a sample result"
      extraClass={`bg-opacity-100 border-[1px] ${extraClass}`}
      onClick={() => {
        window.scrollTo(0, 0);
        navigate("/resultSample");
      }}
    />
  );
};

export const GetStartedButton = ({ extraClass, onClick }) => {
  return <CustomButton title="Get started" extraClass={extraClass} onClick={onClick} />;
};
