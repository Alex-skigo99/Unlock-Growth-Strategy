import { Routes, Route } from "react-router-dom";
import MyComponent from "./components/myComponent/MyComponent.js";
import HomePage from "./components/homePage/HomePage.js";
import SurveyPage from "./components/surveyPage/SurveyPage.js";

function App() {
  localStorage.setItem("theme", "light");
  document.documentElement.classList.remove("dark");

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/result" element={<MyComponent />} />
    </Routes>
  );
}

export default App;
