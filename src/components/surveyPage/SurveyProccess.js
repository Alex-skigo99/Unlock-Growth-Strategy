import { useEffect, useState } from "react";
import uiTypesOfAnswers from "../../assets/uiTypesOfAnswers";
import ModalMem from "./ModalMem";
import { surveyService } from "../../services/surveyService";

const answersTypeNumber = uiTypesOfAnswers.listOfNumberAnswers;
const answersTypeColor = uiTypesOfAnswers.listOfColorsAnswersV2;

const SurveyProccess = ({ questionnaire, isStyleColor, theme, handleEndOfSurvey }) => {
  const lenghtOfQuestionnare = questionnaire.length;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [amountQuestionsInBlock, setAmountQuestionsInBlock] = useState(Math.min(5, lenghtOfQuestionnare));
  const [isMemModalOpen, setIsMemModalOpen] = useState(false);
  const id = localStorage.getItem("surveyId");
  const widthOfLine = 100 / amountQuestionsInBlock;

  const handleAnswer = (value) => {
    questionnaire[currentQuestionNumber].value = value;
    surveyService.saveAnswerToDB(id, { question: questionnaire[currentQuestionNumber].question, value: value });

    if (currentQuestionNumber === lenghtOfQuestionnare - 1) {
      setCurrentLine(0);
      setCurrentQuestionNumber(0);
      setIsMemModalOpen(true);
      return handleEndOfSurvey(id);
    }
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    if (currentLine === amountQuestionsInBlock - 1) {
      setCurrentLine(0);
      setAmountQuestionsInBlock(Math.min(amountQuestionsInBlock, lenghtOfQuestionnare - currentQuestionNumber - 1));
      setIsMemModalOpen(true);
    } else {
      setCurrentLine(currentLine + 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 px-16 mobile:p-0 mobile:gap-2 tablet:p-6">
      <div className="text-[14px] font-dunbar-text text-left mobile:text-[12px]">
        You're halfway through! <span>{Math.round((currentQuestionNumber / lenghtOfQuestionnare) * 100)}</span>% completed – Unlocking
        insights…
      </div>
      <div className="w-full flex">
        {new Array(amountQuestionsInBlock).fill(0).map((_item, index) => (
          <div key={`${index}line`} className="h-1 px-[.2%] mobile:px-[2px]" style={{ width: `${widthOfLine}%` }}>
            <div
              className={`h-[5px] w-full ${index < currentLine ? "bg-[#8471FE] dark:bg-[#FEF371]" : "bg-[#00000066] dark:bg-[#FFFFFF66]"}`}
            />
          </div>
        ))}
      </div>
      <div className="text-[28px] font-bold text-center mt-16 mobile:mt-4 mobile:text-[18px]">
        {questionnaire[currentQuestionNumber]?.question}
      </div>
      <div className="text-[18px] italic text-center py-4 mobile:text-[14px]">
        {questionnaire[currentQuestionNumber]?.description || ""}
      </div>
      {isStyleColor ? (
        <div className="flex gap-8 justify-center items-center text-[20px] mobile:flex-col mobile:gap-6">
          <div>{answersTypeColor[0].answer}</div>
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
          <div>{answersTypeColor[answersTypeColor.length - 1].answer}</div>
        </div>
      ) : (
        <div className="flex gap-4 justify-center mobile:flex-col">
          {answersTypeNumber.map((variant, index) => (
            <div key={variant.answer} className="flex flex-col items-center mobile:flex-row mobile:gap-2">
              <button
                className="text-[20px] w-[140px] rounded-xl bg-[#F0E7DC] text-center py-2 mb-2 dark:bg-[#FFFFFF33]"
                onClick={() => handleAnswer(variant.value)}
              >
                {variant.value}
              </button>
              {(index === 0 || index === answersTypeNumber.length - 1) && (
                <div className="text-[15px] font-dunbar-text">{variant.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
      <ModalMem isModalOpen={isMemModalOpen} setIsModalOpen={setIsMemModalOpen} />
    </div>
  );
};

export default SurveyProccess;
