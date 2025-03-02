import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "./components/homePage/HomePage.js";
import SurveyPage from "./components/surveyPage/SurveyPage.js";
import ResultSamplePage from "./components/resultPage/ResultSamplePage.js";
import { questionnaireService } from "./services/questionnaireService.js";
import { useState } from "react";

function App() {
  // localStorage.setItem("theme", "light");
  // document.documentElement.classList.remove("dark");
  const [questionaireOne, setQuestionaireOne] = useState([]);
  const [questionaireTwo, setQuestionaireTwo] = useState([]);

  useQuery({
    queryKey: ["questionnaireLoader"],
    queryFn: questionnaireService.getQuestionnaire,
    onSuccess: (data) => {
      setQuestionaireOne(data.slice(0, 6).map((question) => ({ ...question, value: "" })));
      setQuestionaireTwo(data.slice(10, 12).map((question) => ({ ...question, value: "" })));
    }
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/survey" element={<SurveyPage questionaireOne={questionaireOne} questionaireTwo={questionaireTwo} />} />
      <Route path="/result" element={<ResultSamplePage />} />
    </Routes>
  );
}

export default App;
