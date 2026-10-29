import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ReadingPage from "./pages/ReadingPage/ReadingPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recommended" element={<RecommendedPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/reading" element={<ReadingPage />} />

      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
