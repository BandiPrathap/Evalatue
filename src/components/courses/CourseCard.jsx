import React,{useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaUserGraduate } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CourseCard = ({ course }) => {
  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Card 
      className="h-100 shadow-sm card-hover border-0.5"
      data-aos="fade-up"
    >
      <Card.Img 
        variant="top" 
        src={course.imageurl || "https://via.placeholder.com/300x150"} 
        alt={course.title}
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary">{course.category}</span>
          <span className="text-success fw-bold">
            {course.price === 0 ? 'Free' : `₹${parseFloat(course.price).toFixed(2)}`}
          </span>
        </div>
        
        <Card.Title className="mb-3">{course.title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{course.instructor}</Card.Subtitle>
        
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <span>{course.rating}</span>
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-1" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="badge bg-info">{course.level}</span>
          <Button 
            as={Link} 
            to={`/course/${course.id}`} 
            variant="outline-primary" 
            size="sm"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;