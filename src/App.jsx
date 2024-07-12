import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import RegiserPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GoogleLogin from "./pages/GoogleLogin";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
     return (
          <Router>
               <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegiserPage />} />
                    <Route path="/login/google" element={<GoogleLogin />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/problem/:problemId" element={<ProblemPage />} />
               </Routes>
          </Router>
     )
}

export default App
