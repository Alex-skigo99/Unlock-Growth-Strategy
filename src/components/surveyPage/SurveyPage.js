import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../widgets/Header";
import { CustomButton } from "../widgets/Buttons";
import ThemeToggle from "../widgets/ThemeToggle";
import SurveyProccess from "./SurveyProccess";
import ModalVerifyOwnership from "./ModalVerifyOwnership";
import { surveyService } from "../../services/surveyService";

const SurveyPage = ({ questionaire, youtubeChannelLink, setYoutubeChannelLink }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isStarted, setIsStarted] = useState(false);
  const [isModalVerifyOwnershipOpen, setIsModalVerifyOwnershipOpen] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState({});
  const navigate = useNavigate();
  const isSurveyId = !!localStorage.getItem("surveyId") && localStorage.getItem("surveyId") !== "undefined";

  useQuery({
    queryKey: ["loadSurveyStatus"],
    queryFn: () => {
      return surveyService.getSurveyStatus();
    },
    enabled: isSurveyId && !isStarted,
    onSuccess: (surveyStatus) => {
      setSurveyStatus(surveyStatus);
      setIsModalVerifyOwnershipOpen(surveyStatus.isSurveyCompleted && !surveyStatus.isChannelLinkConfirmed);
    }
  });

  if (!isSurveyId) {
    return <div className="w-full text-center mt-10">You should start from clicking the link in email</div>;
  }

  const handleEndOfSurvey = (id) => {
    surveyService.saveAsCompletedToDB(id);
    return setIsModalVerifyOwnershipOpen(true);
  };

  const getStartedPage = (
    <div className="w-full flex justify-center bg-[#F0E7DC] dark:bg-bgColor-dark rounded-[30px] p-8 mobile:p-4">
      <div className="flex flex-col gap-8 items-center max-w-[600px] mobile:gap-4">
        <div className="violet-stars" />
        <div className="text-[42px] leading-tight font-medium text-center mobile:text-[28px]">Unlock Your YouTube Growth Strategy</div>
        <div className="text-[18px] text-center italic font-dunbar-text flex flex-col gap-4 mobile:text-[14px]">
          <div>
            The goal is to analyze your unique personality and content as a YouTube creator, in order to provide insights that can help
            improve your audience engagement and grow your subscriber base.
          </div>
          <div>The survey will take approximately 5-7 minutes to complete.</div>
        </div>
        <div className="flex flex-col gap-4 items-center p-8 bg-[#2A8E5C] text-white font-dunbar-text rounded-[30px] mobile:p-4">
          <div className="text-[20px] font-bold">⚠️ Important ⚠️</div>
          <div className="text-[16px] text-center mobile:text-[14px]">
            For the most accurate results, it is essential that you, as the owner of the YouTube page, answer all the questions. Your
            personal responses are necessary, as we are analyzing both your personality and your content to provide the best insights
            tailored specifically to you.
          </div>
          {
            <CustomButton
              title={surveyStatus?.currentAnswerNumber === 0 ? "Get started" : "Let continue"}
              onClick={() => setIsStarted(true)}
            />
          }
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-bgColor-light dark:bg-bgColor-dark h-screen dark:text-white">
      <Header theme={theme}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </Header>
      <div className="px-16 py-8 mobile:p-4">
        {!isStarted ? (
          <>
            {!!localStorage.getItem("surveyId") ? (
              getStartedPage
            ) : (
              <div className="flex flex-col gap-10 justify-center items-center h-[80vh]">
                <div className="text-[42px] font-bold leading-tight font-dunbar-tall text-center mobile:text-[28px]">
                  You have already completed the survey. Thank you!
                </div>
                <CustomButton title="Click to take the survey again" onClick={() => navigate("/")} />
              </div>
            )}
          </>
        ) : (
          <SurveyProccess
            questionnaire={questionaire}
            surveyStatus={surveyStatus}
            isStyleColor={true}
            theme={theme}
            handleEndOfSurvey={handleEndOfSurvey}
          />
        )}
      </div>
      <ModalVerifyOwnership
        isModalOpen={isModalVerifyOwnershipOpen}
        setIsModalOpen={setIsModalVerifyOwnershipOpen}
        youtubeChannelLink={youtubeChannelLink}
        setYoutubeChannelLink={setYoutubeChannelLink}
      />
    </div>
  );
};

export default SurveyPage;
