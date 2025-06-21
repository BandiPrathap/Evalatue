import React, { createContext, useState, useContext, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        const dummyCourses = [
          {
            id: '1',
            title: 'Web Development Bootcamp',
            rating: 4.8,
            duration: '32 hours',
            category: 'Web Development',
            language: 'English',
            price: 99,
            discount:'15%',
            description: 'Learn full-stack web development with HTML, CSS, JavaScript, React, Node.js, and more.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            modules: [
              {
                title: 'HTML & CSS Fundamentals',
                lessons: [
                  { title: 'Introduction to HTML', duration: '45 min' },
                  { title: 'CSS Styling', duration: '60 min' },
                  { title: 'Responsive Design', duration: '50 min' },
                  { title: 'CSS Frameworks', duration: '55 min' },
                ]
              },
              {
                title: 'JavaScript Programming',
                lessons: [
                  { title: 'JavaScript Basics', duration: '40 min' },
                  { title: 'DOM Manipulation', duration: '50 min' },
                  { title: 'ES6 Features', duration: '60 min' },
                  { title: 'Async JavaScript', duration: '55 min' },
                ]
              },
              {
                title: 'React Framework',
                lessons: [
                  { title: 'React Components', duration: '50 min' },
                  { title: 'State Management', duration: '60 min' },
                  { title: 'Hooks', duration: '55 min' },
                  { title: 'React Router', duration: '45 min' },
                ]
              }
            ]
          },
          {
            id: '2',
            title: 'Data Science Fundamentals',
            instructor: 'John',
            rating: 4.6,
            reviews: 890,
            duration: '28 hours',
            level: 'Intermediate',
            category: 'Data Science',
            language: 'English',
            price: 79,
            description: 'Master the fundamentals of data science with Python, Pandas, NumPy, and machine learning basics.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: '3',
            title: 'UX Design Principles',
            instructor: 'Alex Johnson',
            rating: 4.9,
            reviews: 956,
            duration: '24 hours',
            level: 'Beginner',
            category: 'Design',
            language: 'English',
            price: 0,
            description: 'Learn the core principles of user experience design and create intuitive user interfaces.',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: '4',
            title: "Full Stack Web Development",
            description: "Learn to build modern web applications using HTML, CSS, JavaScript, React, Node.js, and databases.",
            rating: 4.8,
            duration:'32 hours',
            category: 'web development',
            language:"English",
            imageUrl:"https://image.png",
            price: "199.99",
            discount: "20.00",
            created_at: "2025-05-24T07:37:49.964Z"
          }
        ];
        setCourses(dummyCourses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const getCourseById = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const course = courses.find(c => c.id === id);
        resolve(course || null);
      }, 500);
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, getCourses, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);