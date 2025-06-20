import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = 'https://elevateu-khaki.vercel.app';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [temporaryCredentials, setTemporaryCredentials] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      setTemporaryCredentials({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      toast.success('OTP sent to your email. Please verify.');
      navigate('/verify-otp');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');
      
      // Automatically login after verification
      await login({ email, password: temporaryCredentials.password });
      toast.success('Email verified and account created successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      const userData = {
        token: data.token,
        role: data.role,
        email: credentials.email
      };

      if (data.role === 'admin') {
        toast.error('Admins cannot log in through this portal');
        return;
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Password reset failed');
      
      setTemporaryCredentials({ email });
      toast.success('OTP sent to email');
      navigate('/verify-reset-otp');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const verifyResetOtp = async (email, otp) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');
      
      toast.success('OTP verified');
      navigate('/reset-password');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Password reset failed');
      
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setTemporaryCredentials(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      temporaryCredentials,
      register, 
      verifyOtp, 
      login, 
      forgotPassword,
      verifyResetOtp,
      resetPassword,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);