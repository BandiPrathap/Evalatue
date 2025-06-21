import React, { useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Card, ProgressBar,Button,Form } from 'react-bootstrap';
import { FaBook, FaBriefcase, FaCertificate, FaUser, FaCog } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DashboardCard from '../components/dashboard/DashboardCard';
import ProgressBarComponent from '../components/dashboard/ProgressBar';
import UserProfile from '../components/dashboard/UserProfile';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If there's a redirect state, navigate to that location
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Dummy data
  const enrolledCourses = [
    { id: 1, title: 'Web Development Bootcamp', progress: 65, lastAccessed: 'JavaScript Fundamentals' },
    { id: 2, title: 'Data Science Fundamentals', progress: 30, lastAccessed: 'Pandas Library' },
    { id: 3, title: 'UX Design Principles', progress: 80, lastAccessed: 'User Testing' }
  ];
  
  const savedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', date: '2023-06-15' },
    { id: 2, title: 'Data Analyst', company: 'DataInsights', date: '2023-06-10' }
  ];
  
  const certificates = [
    { id: 1, title: 'JavaScript Mastery', date: '2023-05-20' },
    { id: 2, title: 'React Fundamentals', date: '2023-04-15' }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="fw-bold">Dashboard</h1>
          <p className="text-muted">Welcome back, {user?.name || 'Learner'}! Continue your learning journey.</p>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="courses" className="mb-4">
        <Tab eventKey="courses" title={<><FaBook className="me-1" /> My Courses</>}>
          <div className="mt-4">
            <Row>
              {enrolledCourses.map((course, index) => (
                <Col md={6} lg={4} key={course.id} data-aos="fade-up" data-aos-delay={index * 100} className='mb-4'>
                  <DashboardCard 
                    title={course.title}
                    subtitle={`Last accessed: ${course.lastAccessed}`}
                  >
                    <div className="mt-3">
                      <ProgressBarComponent now={course.progress} label={`${course.progress}%`} />
                      <div className="d-flex justify-content-between mt-2">
                        <Button variant="outline-primary" size="sm">
                          Continue
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </DashboardCard>
                </Col>
              ))}
            </Row>
          </div>
        </Tab>
        <Tab eventKey="jobs" title={<><FaBriefcase className="me-1" /> Saved Jobs</>}>
          <div className="mt-4">
            <Row>
              {savedJobs.map((job, index) => (
                <Col md={6} key={job.id} data-aos="fade-up" data-aos-delay={index * 100} className='mb-4'>
                  <DashboardCard 
                    title={job.title}
                    subtitle={job.company}
                    rightText={job.date}
                  >
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="outline-primary" size="sm">
                        View Job
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Remove
                      </Button>
                    </div>
                  </DashboardCard>
                </Col>
              ))}
            </Row>
          </div>
        </Tab>
        <Tab eventKey="profile" title={<><FaUser className="me-1" /> Profile</>}>
          <div className="mt-4" data-aos="fade-up">
            <UserProfile user={user} />
          </div>
        </Tab>
        <Tab eventKey="settings" title={<><FaCog className="me-1" /> Settings</>}>
          <div className="mt-4" data-aos="fade-up">
            <Card>
              <Card.Body>
                <div className="mt-4">
                  
                    <h5>Change Password</h5>
                    <Button variant="outline-primary">
                      Update Password
                    </Button>
                  
                </div>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;