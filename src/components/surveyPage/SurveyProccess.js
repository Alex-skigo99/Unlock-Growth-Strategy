import { useState } from "react";
import uiTypesOfAnswers from "../../assets/uiTypesOfAnswers";
import { surveyService } from "../../services/surveyService";
import { typeOfAnswers } from "../../config"; // full or short
import { CustomButton } from "../widgets/Buttons";
import { memsList, memsStages } from "../../assets/memsList";

const answersTypeNumber = uiTypesOfAnswers.listOfNumberAnswers;
const answersTypeColor = uiTypesOfAnswers.listOfColorsAnswersV2;

const SurveyProccess = ({ questionnaire, surveyStatus, isStyleColor, theme, handleEndOfSurvey }) => {
  const id = localStorage.getItem("surveyId");
  const lenghtOfQuestionnare = questionnaire.length;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(surveyStatus.currentAnswerNumber);
  const [currentBarInProgress, setCurrentBarInProgress] = useState(surveyStatus.currentAnswerNumber % 5);
  const [amountQuestionsInBlock, setAmountQuestionsInBlock] = useState(Math.min(5, lenghtOfQuestionnare));
  const [isMemOpen, setIsMemOpen] = useState(false);
  const [memCursor, setMemCursor] = useState(0);
  const widthOfLine = 100 / amountQuestionsInBlock;

  if (lenghtOfQuestionnare === 0) handleEndOfSurvey(id);

  const handleAnswer = (value, index) => {
    const answer = { question: questionnaire[currentQuestionNumber].question };
    if (typeof value === "number") {
      answer.value = value;
    } else {
      answer.value = index + 1;
      answer.valueText = value;
    }
    surveyService.saveAnswerToDB(id, answer);

    if (currentQuestionNumber === lenghtOfQuestionnare - 1) {
      return handleEndOfSurvey(id);
    }

    if (currentBarInProgress === amountQuestionsInBlock - 1) {
      setCurrentBarInProgress(0);
      setAmountQuestionsInBlock(Math.min(amountQuestionsInBlock, lenghtOfQuestionnare - currentQuestionNumber - 1));
      setIsMemOpen(true);
    } else {
      setCurrentBarInProgress(currentBarInProgress + 1);
    }

    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const handleContinue = () => {
    setMemCursor((memCursor + 1) % memsStages.length);
    setIsMemOpen(false);
  };

  const colorShortTypeAnswerView = (
    <div className="flex gap-8 justify-center items-center text-[20px] mobile:flex-col mobile:gap-6">
      <div>
        {questionnaire[currentQuestionNumber]?.answers.length < 2
          ? answersTypeColor[0].answer
          : questionnaire[currentQuestionNumber]?.answers[0]}
      </div>
      {answersTypeColor.map((variant) => (
        <button
          key={variant.value}
          style={{
            width: variant.size,
            height: variant.size,
            backgroundColor: theme === "dark" ? variant.colorDark : variant.colorLight
          }}
          className="rounded-full hover:shadow-lg hover:scale-105 transition-transform"
          onClick={() => handleAnswer(variant.value)}
        />
      ))}
      <div>
        {questionnaire[currentQuestionNumber]?.answers.length < 2
          ? answersTypeColor[answersTypeColor.length - 1].answer
          : questionnaire[currentQuestionNumber]?.answers[questionnaire[currentQuestionNumber]?.answers.length - 1]}
      </div>
    </div>
  );

  const colorFullTypeAnswerView = (
    <div className="flex flex-col gap-8 justify-center text-[20px] mobile:flex-col mobile:gap-6">
      {questionnaire[currentQuestionNumber]?.answers.map((variant, index) => (
        <div key={variant} className="flex gap-4 items-center justify-center">
          <button onClick={() => handleAnswer(variant, index)} className="mobile:w-full">
            <div className="text-[18px] px-8 rounded-2xl bg-[#F0E7DC] text-center py-4 font-dunbar-text dark:bg-[#FFFFFF33] mobile:text-[16px] mobile:w-full hover:shadow-xl hover:scale-105 transition-transform">
              {variant}
            </div>
          </button>
        </div>
      ))}
    </div>
  );

  const numberTypeAnswerView = (
    <div className="flex gap-4 justify-center mobile:flex-col">
      {answersTypeNumber.map((variant, index) => (
        <div key={variant.answer} className="flex flex-col items-center mobile:flex-row mobile:gap-2">
          <button
            className="text-[20px] w-[140px] rounded-xl bg-[#F0E7DC] text-center py-2 mb-2 dark:bg-[#FFFFFF33]"
            onClick={() => handleAnswer(variant.value)}
          >
            {variant.value}
          </button>
          {(index === 0 || index === answersTypeNumber.length - 1) && <div className="text-[15px] font-dunbar-text">{variant.answer}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 px-16 mobile:p-0 mobile:gap-2 tablet:p-6">
      {isMemOpen ? (
        <>
          <div className="w-full flex">
            {new Array(memsStages.length + 1).fill(0).map((stage, index) => (
              <div key={`${index}stage`} className="h-1 px-[.2%] mobile:px-[2px]" style={{ width: `${widthOfLine}%` }}>
                <div
                  className={`h-[5px] w-full ${
                    index <= memCursor ? "bg-[#8471FE] dark:bg-[#FEF371]" : "bg-[#00000066] dark:bg-[#FFFFFF66]"
                  }`}
                />
              </div>
            ))}
          </div>
          {memsList[memCursor].isVertical ? (
            <div className="flex flex-row gap-6 justify-center p-2 mobile:gap-2 mobile:flex-col mobile:items-center">
              <img src={memsList[memCursor].image} className="rounded-[10px] w-[330px] mobile:w-[200px]" alt="mem" />
              <div className="flex flex-col w-1/2 gap-6 items-center justify-center p-0 mobile:p-4 mobile:w-full mobile:gap-4">
                <div className="text-[32px] font-bold text-center mobile:text-[24px]">{memsStages[memCursor].textTitle}</div>
                <div
                  className={`text-[24px] rounded-[30px] p-8 text-bgColor-dark text-center mobile:text-[16px] mobile:p-4 bg-[${memsStages[memCursor].color}]`}
                >
                  {memsStages[memCursor].textColorized}
                </div>
                <div className="text-[24px] font-bold text-center mobile:text-[16px]">{memsStages[memCursor].textBottom}</div>
                <CustomButton title="Continue" onClick={handleContinue} />
              </div>
            </div>
          ) : (
            <div className={`flex gap-6 items-center p-2 mobile:gap-2 flex-col`}>
              <img src={memsList[memCursor].image} width="350px" className="rounded-[10px]" alt="mem" />
              <div className="flex flex-col w-2/3 gap-6 items-center p-0 mobile:p-4 mobile:w-full mobile:gap-4">
                <div className="text-[32px] font-bold text-center mobile:text-[24px]">{memsStages[memCursor].textTitle}</div>
                <div
                  className={`text-[24px] rounded-[30px] p-8 text-bgColor-dark text-center mobile:text-[16px] mobile:p-4 bg-[${memsStages[memCursor].color}]`}
                >
                  {memsStages[memCursor].textColorized}
                </div>
                <div className="text-[24px] font-bold text-center mobile:text-[16px]">{memsStages[memCursor].textBottom}</div>
                <CustomButton title="Continue" onClick={handleContinue} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-[14px] font-dunbar-text text-left mobile:text-[12px]">
            You're halfway through! <span>{Math.round((currentQuestionNumber / lenghtOfQuestionnare) * 100)}</span>% completed – Unlocking
            insights…
          </div>
          <div className="w-full flex">
            {new Array(amountQuestionsInBlock).fill(0).map((_item, index) => (
              <div key={`${index}line`} className="h-1 px-[.2%] mobile:px-[2px]" style={{ width: `${widthOfLine}%` }}>
                <div
                  className={`h-[5px] w-full ${
                    index < currentBarInProgress ? "bg-[#8471FE] dark:bg-[#FEF371]" : "bg-[#00000066] dark:bg-[#FFFFFF66]"
                  }`}
                />
              </div>
            ))}
          </div>
          <div
            className={`text-[28px] font-bold text-center mt-16 mobile:mt-4 ${
              questionnaire[currentQuestionNumber]?.question.length > 150 ? "mobile:text-[14px]" : "mobile:text-[18px]"
            }`}
          >
            {questionnaire[currentQuestionNumber]?.question}
          </div>
          <div className="text-[18px] italic text-center py-4 mobile:text-[14px]">
            {questionnaire[currentQuestionNumber]?.description || ""}
          </div>
          {typeOfAnswers === "full" ? colorFullTypeAnswerView : isStyleColor ? colorShortTypeAnswerView : numberTypeAnswerView}
        </>
      )}
    </div>
  );
};

export default SurveyProccess;
