import React, { useEffect } from 'react';
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

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Dummy data
  const popularCourses = [
    { id: 1, title: 'Web Development Bootcamp', rating: 4.8 },
    { id: 2, title: 'Data Science Fundamentals', rating: 4.6 },
    { id: 3, title: 'UX Design Principles', rating: 4.9 }
  ];

  const jobListings = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote' },
    { id: 2, title: 'Data Analyst', company: 'DataInsights', location: 'New York' },
    { id: 3, title: 'UI/UX Designer', company: 'DesignHub', location: 'San Francisco' }
  ];

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
                <Button variant="outline-light">
                  Get Started Free
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
            {popularCourses.map((course, index) => (
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
            {jobListings.map((job, index) => (
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