import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import RegiserPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GoogleLogin from "./pages/GoogleLogin";
import NotFoundPage from "./pages/NotFoundPage";
import ProblemsPage from "./pages/ProblemsPage";

import { AuthContext } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

const AuthenticatedRoute = ({ children }) => {

     const { isAuthenticated } = React.useContext(AuthContext);

     if (isAuthenticated())
          return children;
     else
          return <Navigate to={"/login"} />
}

function App() {

     return (
          <Router>
               <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegiserPage />} />
                    <Route path="/login/google" element={<GoogleLogin />} />
                    <Route path="/dashboard" element={
                         <AuthenticatedRoute>
                              <DashboardPage />
                         </AuthenticatedRoute>
                    } />
                    <Route path="/problem/:problemId" element={
                         <AuthenticatedRoute>
                              <ProblemPage />
                         </AuthenticatedRoute>
                    } />
                    <Route path="/problems" element={
                         <AuthenticatedRoute>
                              <ProblemsPage />
                         </AuthenticatedRoute>
                    } />,
                    <Route path={"/profile"} element={
                         <AuthenticatedRoute>
                              <ProfilePage />
                         </AuthenticatedRoute>
                    } />
                    <Route path={"/editprofile"} element={
                         <AuthenticatedRoute>
                              <EditProfilePage />
                         </AuthenticatedRoute>
                    } />
               </Routes>
          </Router>
     )
}

export default App
