//src/components/courses/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../../context/AuthContext';
import CourseHero from './components/CourseHero';
import CourseContent from './components/CourseContent';
import CourseEnrollCard from './components/CourseEnrollCard';
import { getCourseById,createPaymentOrder,verifyPayment} from '../../API/index';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const courseData = useState(JSON.parse(localStorage.getItem("courseData")) || { data: [] });
  const [course, setCourse] = useState(courseData.data || null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const now = Date.now();
  const expiryTime = 3600000; // 1 hour 
  const isCacheFresh = now - courseData.timestamp < expiryTime;
  
  console.log(id);
  useEffect(() => {
    AOS.init({ duration: 800 });
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        const courseData = response.data; 
        setCourse(courseData);
        localStorage.setItem("courseData", JSON.stringify({
          data: courseData,
          timestamp: Date.now()
        }));
        if(courseData.modules[0].lessons[0].video_url){
          setEnrolled(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);

    try {
      // Calculate amount
      const price = parseFloat(course.price);
      const discount = parseFloat(course.discount);
      const discountedPrice = price - (price * (discount / 100));
      const amount = Math.round(discountedPrice);

      // Create payment order
      const orderData = await createPaymentOrder({ 
        amount: amount,
        course_id: parseInt(id)
      });

      // Load Razorpay SDK
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) throw new Error('Failed to load payment processor');
      const order = orderData.data.order;
      if (!order) {
        throw new Error('Failed to create payment order');
      }
      // Initialize payment
      const options = {
        key: 'rzp_test_imrl5UK7barGAX',
        amount: order.amount,
        currency: order.currency,
        name: 'EduPlatform',
        description: `Payment for: ${course.title}`,
        order_id: order.id,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#3399cc' },
        handler: async (response) => {
          try {
            // Verify payment
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              course_id: parseInt(id),
            });
            
            // Update UI
            setEnrolled(true);
            const updatedCourse = await getCourseById(id);
            setCourse(updatedCourse);
          } catch (error) {
            console.error('Payment verification error:', error);
            alert(`Payment failed: ${error.message}`);
          }
        },
        modal: {
          ondismiss: () => {
            alert('Payment was cancelled');
            setPaymentProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading course details...</p>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h2>Course not found</h2>
        <p>The requested course could not be loaded.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <CourseHero 
            title={course.title}
            rating={course.rating}
            duration={course.duration}
            level={course.category}
            language={course.language}
            description={course.description}
          />
          
          <CourseContent 
            modules={course.modules} 
            enrolled={enrolled} 
          />
        </Col>

        {enrolled&&<Col lg={4}>
          <CourseEnrollCard 
            course={course}
            enrolled={enrolled}
            paymentProcessing={paymentProcessing}
            onEnrollClick={handlePayment}
          />
        </Col>}
      </Row>
    </Container>
  );
};

export default CourseDetail;