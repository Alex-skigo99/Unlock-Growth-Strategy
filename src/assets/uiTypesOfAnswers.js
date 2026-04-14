// Answer option presets used by SurveyProcess to render different question types
const uiTypesOfAnswers = {
  // Color-coded Likert scale (Agree/Disagree) with themed dot buttons
  listOfColorsAnswersV2: [
    {
      value: 1,
      colorDark: "#FEF371",
      colorLight: "#8471FE",
      answer: "Agree",
      size: "64px"
    },
    {
      value: 2,
      colorDark: "#FEF371",
      colorLight: "#8471FE",
      answer: "",
      size: "64px"
    },
    {
      value: 3,
      colorDark: "#FEF371",
      colorLight: "#8471FE",
      answer: "",
      size: "64px"
    },
    {
      value: 4,
      colorDark: "#FEF371",
      colorLight: "#8471FE",
      answer: "Disagree",
      size: "64px"
    }
  ],
  listOfNumberAnswers: [
    {
      value: 1,
      answer: "Very low"
    },
    {
      value: 2,
      answer: "Low"
    },
    {
      value: 3,
      answer: "Medium"
    },
    {
      value: 4,
      answer: "High"
    },
    {
      value: 5,
      answer: "Very high"
    }
  ]
};

export default uiTypesOfAnswers;
