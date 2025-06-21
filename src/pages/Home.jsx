import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaBook, FaBriefcase, FaRocket } from 'react-icons/fa';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CourseCard from '../components/courses/CourseCard';
import JobCard from '../components/jobs/JobCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQ from '../components/FAQ';
import {getAllCourses,getAllJobs} from '../API/index'

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const fetchData = async () => {
    const now = Date.now();
    const expiryTime = 3600000; // 1 hour

    const cachedCourses = JSON.parse(localStorage.getItem("coursesData"));
    const cachedJobs = JSON.parse(localStorage.getItem("jobsData"));

    if (
      cachedCourses &&
      cachedJobs &&
      now - cachedCourses.timestamp < expiryTime &&
      now - cachedJobs.timestamp < expiryTime
    ) {
      // Use only top 3 and latest 3 from cached full data
      const sortedCourses = cachedCourses.data
        .sort((a, b) => b.rating === a.rating
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : b.rating - a.rating)
        .slice(0, 3);

      const latestJobs = cachedJobs.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setCourses(sortedCourses);
      setJobs(latestJobs);
      return;
    }

    try {
      const courseRes = await getAllCourses();
      const jobRes = await getAllJobs();

      const allCourses = courseRes.data;
      const allJobs = jobRes.data;

      const sortedCourses = allCourses
        .sort((a, b) => b.rating === a.rating
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : b.rating - a.rating)
        .slice(0, 3);

      const latestJobs = allJobs
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      // Store complete data in localStorage
      localStorage.setItem("coursesData", JSON.stringify({ data: allCourses, timestamp: now }));
      localStorage.setItem("jobsData", JSON.stringify({ data: allJobs, timestamp: now }));

      // Use filtered data for homepage
      setCourses(sortedCourses);
      setJobs(latestJobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();  
  }, []);


  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center py-5">
            <Col md={6} data-aos="fade-right">
              <h1 className="display-4 fw-bold mb-4">Learn New Skills Online, Anytime</h1>
              <p className="lead mb-4">Master industry-relevant courses and land your dream job</p>
              <div className="d-flex gap-3">
                <Button variant="light" as={Link} to="/courses">
                  Browse Courses
                </Button>
                <Button variant="outline-light" as={Link} to="/jobs">
                  Browse Jobs
                </Button>
              </div>
            </Col>
            <Col md={6} data-aos="fade-left" className='mt-3'>
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Learning online" 
                  className="img-fluid rounded shadow-lg"
                />
                <div className="position-absolute top-0 start-0 bg-warning text-dark p-2 rounded m-3 shadow">
                  <FaRocket className="me-1" /> 5000+ Students Enrolled
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Courses */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Popular Courses</h2>
          <Row>
            {courses.map((course, index) => (
              <Col md={4} key={course.id} data-aos="fade-up" data-aos-delay={index * 100} className='mb-3'>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4" data-aos="fade-up">
            <Button variant="primary" as={Link} to="/courses">
              View All Courses
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">How It Works</h2>
          <Row>
            <Col md={4} className="text-center mb-4" data-aos="fade-up">
              <div className="mb-3">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center p-3" style={{width: '100px', height: '100px'}}>
                  <FaUser size={40} />
                </div>
              </div>
              <h3>1. Sign Up</h3>
              <p className="px-4">Create your free account in seconds</p>
            </Col>
            <Col md={4} className="text-center mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-3">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center p-3" style={{width: '100px', height: '100px'}}>
                  <FaBook size={40} />
                </div>
              </div>
              <h3>2. Learn from Experts</h3>
              <p className="px-4">Access high-quality courses from industry professionals</p>
            </Col>
            <Col md={4} className="text-center mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="mb-3">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center p-3" style={{width: '100px', height: '100px'}}>
                  <FaBriefcase size={40} />
                </div>
              </div>
              <h3>3. Land Your Dream Job</h3>
              <p className="px-4">Apply to relevant jobs with your new skills</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Latest Job Opportunities</h2>
          <Row className='d-flex justify-content-column m-lg-5'>
            {jobs.map((job, index) => (
              <Col md={4} key={job.id} data-aos="fade-up" data-aos-delay={index * 100} className='mb-3'>
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4" data-aos="fade-up">
            <Button variant="outline-primary" as={Link} to="/jobs">
              View All Jobs
            </Button>
          </div>
        </Container>
      </section>
      {/* FAQ Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Frequently Asked Questions</h2>
          <FAQ />
        </Container>
      </section>

    </>
  );
};

export default HomePage;