import { useState } from "react";
import Header from "../widgets/Header";
import { GetStartedButton } from "../widgets/Buttons";
import ThemeToggle from "../widgets/ThemeToggle";
import questionnareOne from "../../assets/questionnareOne.json";
import questionnareTwo from "../../assets/questionnareTwo.json";
import SurveyProccess from "./SurveyProccess";

const questionnareOneList = questionnareOne.map((question) => ({ ...question, value: "" }));
const questionnareTwoList = questionnareTwo.map((question) => ({ ...question, value: "" }));

const SurveyPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isStarted, setIsStarted] = useState(false);
  const [isFirstQuestionnare, setIsFirstQuestionnare] = useState(true);

  return (
    <div className="bg-bgColor-light dark:bg-bgColor-dark h-screen dark:text-white">
      <Header theme={theme}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </Header>
      <div className="px-16 py-8 mobile:p-6">
        {!isStarted ? (
          <div className="w-full flex justify-center bg-[#F0E7DC] dark:bg-bgColor-dark rounded-[30px] p-8 mobile:p-4">
            <div className="flex flex-col gap-8 items-center max-w-[600px] mobile:gap-4">
              <div className="violet-stars" />
              <div className="text-[42px] leading-tight font-medium text-center mobile:text-[28px]">
                Unlock Your YouTube Growth Strategy
              </div>
              <div className="text-[18px] text-center italic font-dunbar-text flex flex-col gap-4 mobile:text-[14px]">
                <div>
                  The goal is to analyze your unique personality and content as a YouTube creator, in order to provide insights that can
                  help improve your audience engagement and grow your subscriber base.
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
                <GetStartedButton onClick={() => setIsStarted(true)} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {isFirstQuestionnare ? (
              <SurveyProccess
                questionnare={questionnareOneList}
                isFirstQuestionnare={isFirstQuestionnare}
                setIsFirstQuestionnare={setIsFirstQuestionnare}
              />
            ) : (
              <SurveyProccess
                questionnare={questionnareTwoList}
                isStyleColor={true}
                theme={theme}
                isFirstQuestionnare={isFirstQuestionnare}
                setIsFirstQuestionnare={setIsFirstQuestionnare}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
