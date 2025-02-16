import { Routes, Route } from "react-router-dom";
import MyComponent from "./components/myComponent/MyComponent.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyComponent />} />
    </Routes>
  );
}

export default App;
