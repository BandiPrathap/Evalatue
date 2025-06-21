// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './components/courses/CourseDetail';
import Jobs from './pages/Job';
import JobDetail from './components/jobs/JobDetails';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './components/FAQ';
import TermsAndConditions from './components/TermsAndConditions';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import OTPVerification from './components/auth/OTPVerification';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            
            {/* Protected Routes */}
            <Route path="/course/:id" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/job/:id" element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
          </Routes>
        </Layout>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;