import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "./components/homePage/HomePage.js";
import SurveyPage from "./components/surveyPage/SurveyPage.js";
import ResultPage from "./components/resultPage/ResultPage.js";
import { questionnaireService } from "./services/questionnaireService.js";
import { useState } from "react";

/**
 * Root component — defines the SPA routing and prefetches the questionnaire.
 *
 * Routes:
 *   /             – Landing page with survey CTA (receives ?email & ?link query params)
 *   /survey       – Multi-step personality survey
 *   /result       – AI-generated personal growth recommendation
 *   /resultSample – Static demo of the result page
 */
function App() {
  const [questionaire, setQuestionaire] = useState([]);
  const [youtubeChannelLink, setYoutubeChannelLink] = useState("");

  useQuery({
    queryKey: ["questionnaireLoader"],
    queryFn: questionnaireService.getQuestionnaire,
    enabled: questionaire.length === 0,
    onSuccess: (data) => {
      setQuestionaire(data);
    }
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage setYoutubeChannelLink={setYoutubeChannelLink} />} />
      <Route
        path="/survey"
        element={
          <SurveyPage questionaire={questionaire} youtubeChannelLink={youtubeChannelLink} setYoutubeChannelLink={setYoutubeChannelLink} />
        }
      />
      <Route path="/resultSample" element={<ResultPage isSamplePage={true} />} />
      <Route path="/result" element={<ResultPage isSamplePage={false} />} />
    </Routes>
  );
}

export default App;
