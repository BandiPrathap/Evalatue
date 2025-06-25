import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Tab, Tabs, Card, Button, Spinner
} from 'react-bootstrap';
import { FaBook, FaBriefcase, FaUser, FaCog } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardCard from '../components/dashboard/DashboardCard';
import ProgressBarComponent from '../components/dashboard/ProgressBar';
import UserProfile from '../components/dashboard/UserProfile';
import { useAuth } from '../context/AuthContext';
import { getSavedJobs, unSaveJob, getCoursesProgress,getUserProfile } from '../API/index';

const oneHour = 3600000;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [savedJobs, setSavedJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(); // API call to get user info
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile", error);
      toast.error("Failed to load profile");
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    }

    fetchUserProfile();        // ✅ Fetch profile
    handleTabSelect('profile'); // Default tab load
  }, []);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    }

    handleTabSelect('profile');
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoadingJobs(true);
      const response = await getSavedJobs();
      const freshJobs = response.data || [];
      setSavedJobs(freshJobs);
      localStorage.setItem('savedJobsData', JSON.stringify({ data: freshJobs, timestamp: Date.now() }));
      toast.success("Saved jobs loaded");
    } catch (error) {
      console.error("Error fetching saved jobs", error);
      toast.error("Failed to load saved jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await getCoursesProgress();
      const freshCourses = response.data || [];
      setCourses(freshCourses);
      localStorage.setItem('coursesProgressData', JSON.stringify({ data: freshCourses, timestamp: Date.now() }));
      toast.success("Course progress loaded");
    } catch (error) {
      console.error("Error fetching courses", error);
      toast.error("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
    const now = Date.now();

    if (tabKey === 'jobs') {
      const cached = JSON.parse(localStorage.getItem('savedJobsData'));
      if (cached && (now - cached.timestamp < oneHour)) {
        setSavedJobs(cached.data);
        console.log("Loaded saved jobs from cache");
      } else {
        fetchSavedJobs();
      }
    }

    if (tabKey === 'courses') {
      const cached = JSON.parse(localStorage.getItem('coursesProgressData'));
      if (cached && (now - cached.timestamp < oneHour)) {
        setCourses(cached.data);
        console.log("Loaded courses from cache");
      } else {
        fetchCourses();
      }
    }
  };

  const handleRemoveJob = async (jobId) => {
    try {
      await unSaveJob(jobId);
      const updatedJobs = savedJobs.filter(job => job.id !== jobId);
      setSavedJobs(updatedJobs);
      localStorage.setItem('savedJobsData', JSON.stringify({ data: updatedJobs, timestamp: Date.now() }));
      toast.info("Job removed");
    } catch (error) {
      console.error("Error removing job", error);
      toast.error("Failed to remove job");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Container className="py-5">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <Row className="mb-5">
        <Col>
          <h1 className="fw-bold">Dashboard</h1>
          <p className="text-muted">Welcome back, {user?.name || 'Learner'}! Continue your learning journey.</p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-4">
        <Tab eventKey="profile" title={<><FaUser className="me-1" /> Profile</>}>
          <div className="mt-4" data-aos="fade-up">
            {loadingUser ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" />
                <div className="mt-2 text-muted">Loading profile...</div>
              </div>
            ) : (
              <UserProfile user={user} />
            )}
          </div>
        </Tab>

        <Tab eventKey="courses" title={<><FaBook className="me-1" /> My Courses</>}>
          <Row className="mt-4">
            {loadingCourses ? (
              <Col className="text-center py-5">
                <Spinner animation="border" role="status" />
                <div className="mt-2 text-muted">Loading courses...</div>
              </Col>
            ) : courses.length === 0 ? (
              <Col>
                <p className="text-muted">No courses enrolled.</p>
                  <Button as={Link} to="/courses" variant="primary">
                    Explore Courses
                  </Button>
              </Col>
            ) : (
              courses.map((course, index) => (
                <Col md={6} lg={4} key={course.id} data-aos="fade-up" data-aos-delay={index * 100} className="mb-4">
                  <DashboardCard title={course.course_title} subtitle={`Last accessed: ${course.lastAccessed}`}>
                    <div className="mt-3">
                      <ProgressBarComponent now={course.progress} label={`${course.progress}%`} />
                      <div className="d-flex justify-content-end mt-2">
                        <Button variant="outline-secondary" size="sm" as={Link} to={`/course/${course.id}`}>View Details</Button>
                      </div>
                    </div>
                  </DashboardCard>
                </Col>
              ))
            )}
          </Row>
        </Tab>

        <Tab eventKey="jobs" title={<><FaBriefcase className="me-1" /> Saved Jobs</>}>
          <Row className="mt-4">
            {loadingJobs ? (
              <Col className="text-center py-5">
                <Spinner animation="border" role="status" />
                <div className="mt-2 text-muted">Loading jobs...</div>
              </Col>
            ) : savedJobs.length === 0 ? (
              <Col>
                <p className="text-muted">No saved jobs yet.</p>
                  <Button as={Link} to="/jobs" variant="primary">
                    Explore Jobs
                  </Button> 
              </Col>
            ) : (
              savedJobs.map((job, index) => (
                <Col md={6} key={job.id} data-aos="fade-up" data-aos-delay={index * 100} className="mb-4">
                  <DashboardCard title={job.title} subtitle={job.company_name} rightText={formatDate(job.created_at)}>
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="outline-primary" size="sm" as={Link} to={`/job/${job.id}`}>
                        View Job
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemoveJob(job.id)}>
                        Remove
                      </Button>
                    </div>
                  </DashboardCard>
                </Col>
              ))
            )}
          </Row>
        </Tab>

        <Tab eventKey="settings" title={<><FaCog className="me-1" /> Settings</>}>
          <div className="mt-4" data-aos="fade-up">
            <Card>
              <Card.Body>
                <h5>Change Password</h5>
                <Button variant="outline-primary">Update Password</Button>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
