//src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: "https://elevateu-khaki.vercel.app/",
});

// const API = axios.create({
//   baseURL: "http://localhost:5000/",
// });

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

export const getUserProfile = ()=>API.get('/api/user/profile');

// Courses API
export const getAllCourses = () => API.get('/api/courses');
export const getAllJobs = () => API.get('/api/jobs');
export const getCourseById = (id) => API.get(`/api/courses/${id}`);
export const getCoursesProgress = () => API.get('/api/progress');
export const updateCourseProgress = (data) => API.post('/api/progress',data);


export const getJobById = (id) => API.get(`/api/jobs/${id}`);
export const getSavedJobs = () => API.get(`/api/jobs/saved`);
export const saveJob = (id) => API.post(`/api/jobs/save/${id}`);
export const unSaveJob = (id) => API.delete(`api/jobs/saved/${id}`);

// Payment API
export const createPaymentOrder = (data) => API.post('/api/payments/create-order', data);
export const verifyPayment = (data) => API.post('/api/payments/verify', data);

// Enrollment API
export const enrollUser = (courseId) => API.post('/api/enrollments', { course_id: courseId });





export default API;