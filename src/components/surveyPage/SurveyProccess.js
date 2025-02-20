import { useState } from "react";

const listOfColorsAnswers = [
  {
    value: 1,
    colorDark: "#2A8E5C",
    colorLight: "#2A8E5C",
    answer: "Agree",
    size: "64px"
  },
  {
    value: 2,
    colorDark: "#2A8E5CB2",
    colorLight: "#2A8E5CB2",
    answer: "",
    size: "56px"
  },
  {
    value: 3,
    colorDark: "#2A8E5C80",
    colorLight: "#2A8E5C80",
    answer: "",
    size: "48px"
  },
  {
    value: 4,
    colorDark: "#FFFFFF33",
    colorLight: "#66666633",
    answer: "Neutral",
    size: "36px"
  },
  {
    value: 5,
    colorDark: "#EA313180",
    colorLight: "#EA313180",
    answer: "",
    size: "48px"
  },
  {
    value: 6,
    colorDark: "#EA3131B2",
    colorLight: "#EA3131B2",
    answer: "",
    size: "56px"
  },
  {
    value: 7,
    colorDark: "#EA3131",
    colorLight: "#EA3131",
    answer: "Disagree",
    size: "64px"
  }
];

const listOfNumberAnswers = [
  {
    value: 1,
    answer: "Strongly agree"
  },
  {
    value: 2,
    answer: "Agree"
  },
  {
    value: 3,
    answer: "Neutral"
  },
  {
    value: 4,
    answer: "Disagree"
  },
  {
    value: 5,
    answer: "Strongly disagree"
  }
];

const SurveyProccess = ({ questionnare, isStyleColor, theme, isFirstQuestionnare, setIsFirstQuestionnare }) => {
  const lenghtOfQuestionnare = questionnare.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const widthOfLine = 100 / lenghtOfQuestionnare;

  const handleAnswer = (value) => {
    questionnare[currentQuestion].value = value;
    if (currentQuestion === lenghtOfQuestionnare - 1) {
      if (isFirstQuestionnare) {
        setIsFirstQuestionnare(false);
        setCurrentQuestion(0);
        console.log("questionnare", questionnare);
        return;
      }
      console.log("questionnare", questionnare);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (!questionnare) return null;

  return (
    <div className="w-full flex flex-col gap-4 px-16 mobile:p-0 mobile:gap-2">
      <div className="text-[14px] font-dunbar-text text-left mobile:text-[12px]">
        You're halfway through! <span>{Math.round((currentQuestion / lenghtOfQuestionnare) * 100)}</span>% completed – Unlocking insights…
      </div>
      <div className="w-full flex">
        {questionnare.map((question, index) => (
          <div key={`${index}line`} className="h-1 px-[.2%] mobile:px-[2px]" style={{ width: `${widthOfLine}%` }}>
            <div
              className={`h-[5px] w-full ${
                index < currentQuestion ? "bg-[#8471FE] dark:bg-[#FEF371]" : "bg-[#00000066] dark:bg-[#FFFFFF66]"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="text-[28px] font-bold text-center mt-16 mobile:mt-4 mobile:text-[22px]">{questionnare[currentQuestion].question}</div>
      <div className="text-[18px] italic text-center py-4 mobile:text-[14px]">{questionnare[currentQuestion].description || ""}</div>
      {isStyleColor ? (
        <div className="flex gap-4 justify-center items-center text-[20px] mobile:flex-col mobile:gap-2">
          <div>{listOfColorsAnswers[0].answer}</div>
          {listOfColorsAnswers.map((variant) => (
            <button
              key={variant.color}
              style={{
                width: variant.size,
                height: variant.size,
                backgroundColor: theme === "dark" ? variant.colorDark : variant.colorLight,
                borderRadius: "50%"
              }}
              onClick={() => handleAnswer(variant.value)}
            />
          ))}
          <div>{listOfColorsAnswers[listOfColorsAnswers.length - 1].answer}</div>
        </div>
      ) : (
        <div className="flex gap-4 justify-center mobile:flex-col">
          {listOfNumberAnswers.map((variant, index) => (
            <div key={variant.answer} className="flex flex-col items-center mobile:flex-row mobile:gap-2">
              <button
                className="text-[20px] w-[140px] rounded-xl bg-[#F0E7DC] text-center py-2 mb-2 dark:bg-[#FFFFFF33]"
                onClick={() => handleAnswer(variant.value)}
              >
                {variant.value}
              </button>
              {(index === 0 || index === listOfNumberAnswers.length - 1) && (
                <div className="text-[15px] font-dunbar-text">{variant.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyProccess;
