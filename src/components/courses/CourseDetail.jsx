import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Accordion, Card, Badge } from 'react-bootstrap';
import { FaPlay, FaLock, FaCheckCircle, FaStar, FaClock, FaDownload } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getCourseById } = useCourses();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    AOS.init();
    const fetchCourse = async () => {
      const data = await getCourseById(id);
      setCourse(data);
      
      // Check if user is enrolled
      if (user && user.enrolledCourses?.includes(id)) {
        setEnrolled(false);
      }
    };
    
    fetchCourse();
  }, [id, user, getCourseById]);



  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    // 1. Call backend to create order
    const orderResponse = await fetch('http://localhost:5000/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NDk4MTM0Mzd9.hI3lVsc-ya3M-qgY-MntWL_yE8D2bEzP7qlGB7BA5XE`, // Your auth token
      },
      body: JSON.stringify({ amount:99 }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      alert('Failed to create order');
      setLoading(false);
      return;
    }

    // 2. Load Razorpay script
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Failed to load Razorpay SDK');
      setLoading(false);
      return;
    }

    // 3. Create Razorpay options object
    const options = {
      key: 'rzp_test_imrl5UK7barGAX', // Replace with your Razorpay key id
      amount: orderData.order.amount, // amount in paise
      currency: orderData.order.currency,
      name: 'EduPlatform',
      description: 'Course Payment',
      order_id: orderData.order.id,
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#3399cc',
      },
      handler: async function (response) {
        // 4. Verify payment on backend
        const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NDk4MTM0Mzd9.hI3lVsc-ya3M-qgY-MntWL_yE8D2bEzP7qlGB7BA5XE`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            course_id: 1,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok) {
          alert('Payment successful and enrolled!');
        } else {
          alert('Payment verification failed: ' + verifyData.message);
        }
      },
      modal: {
        ondismiss: function () {
          alert('Payment popup closed');
        },
      },
    };

    // 5. Open Razorpay payment form
    const rzp = new window.Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <div className="mb-4" data-aos="fade-right">
            <h1 className="fw-bold mb-3">{course.title}</h1>
            <div className="d-flex align-items-center mb-3">
              <span className="me-3">
                <FaStar className="text-warning me-1" /> {course.rating}
              </span>
              <span className="me-3">
                <FaClock className="text-primary me-1" /> {course.duration}
              </span>
              <Badge bg="info" className="me-2">
                {course.level}
              </Badge>
              <Badge bg="success">
                {course.language}
              </Badge>
            </div>
            <p className="lead">{course.description}</p>
          </div>

          <div data-aos="fade-right">
            <h3 className="mb-4">Course Content</h3>
            <Accordion defaultActiveKey="0" flush>
              {course.modules.map((module, moduleIndex) => (
                <Accordion.Item 
                  key={moduleIndex} 
                  eventKey={moduleIndex.toString()}
                  className="mb-3 border rounded"
                >
                  <Accordion.Header>
                    <div className="d-flex align-items-center">
                      <span className="me-3 fw-bold">Module {moduleIndex + 1}</span>
                      <span>{module.title}</span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-group list-group-flush">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li 
                          key={lessonIndex} 
                          className={`list-group-item d-flex justify-content-between align-items-center ${
                            !enrolled && lessonIndex > 1 ? 'blur-item' : ''
                          }`}
                        >
                          <div className="d-flex align-items-center">
                            {enrolled || lessonIndex < 2 ? (
                              <FaPlay className="text-primary me-3" />
                            ) : (
                              <FaLock className="text-secondary me-3" />
                            )}
                            <span>
                              Lesson {lessonIndex + 1}: {lesson.title}
                              {lessonIndex < 2 && !enrolled && (
                                <span className="badge bg-success ms-2">Preview</span>
                              )}
                            </span>
                          </div>
                          <span className="text-muted">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Col>

        <Col lg={4} data-aos="fade-left">
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Img 
              variant="top" 
              src={course.image} 
              alt={course.title} 
              className="img-fluid"
            />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">
                  {course.price === 0 ? 'Free' : `₹${parseFloat(course.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                </h4>

                <div>
                  <FaStar className="text-warning" />
                  <span className="ms-1">{course.rating} ({course.reviews} reviews)</span>
                </div>
              </div>
              
              {enrolled ? (
                <Button variant="success" className="w-100 mb-3">
                  <FaCheckCircle className="me-2" /> Enrolled
                </Button>
              ) : (
                <Button variant="primary" className="w-100 mb-3" onClick={handlePayment} disabled={loading}>
                  {loading ? 'Processing...' : <FaPlay className="me-2" />}
                  Enroll Now
                </Button>
              )}
              
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Duration</span>
                  <span>{course.duration}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Language</span>
                  <span>{course.language}</span>
                </li>
              </ul>
              
              <div className="d-grid">
                <Button variant="outline-secondary">
                  <FaDownload className="me-2" /> Download Resources
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;