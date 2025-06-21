//src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: "https://elevateu-khaki.vercel.app/",
});

// Request interceptor to inject token
API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User from localStorage:', user);
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status
      });
    }
    return Promise.reject({ message: 'Network error' });
  }
);

// Courses API
export const getAllCourses = () => API.get('/api/courses');
export const getAllJobs = () => API.get('/api/jobs');
export const getCourseById = (id) => API.get(`/api/courses/${id}`);
export const getJobById = (id) => API.get(`/api/jobs/${id}`);

// Payment API
export const createPaymentOrder = (data) => API.post('/api/payments/create-order', data);
export const verifyPayment = (data) => API.post('/api/payments/verify', data);

// Enrollment API
export const enrollUser = (courseId) => API.post('/api/enrollments', { course_id: courseId });



export default API;