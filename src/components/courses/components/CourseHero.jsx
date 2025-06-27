// CourseHero.js
import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaStar, FaClock } from 'react-icons/fa';

const CourseHero = ({ title, rating, duration, level, language, description }) => (
  <div className="mb-4" data-aos="fade-right">
    <h1 className="fw-bold mb-3">{title}</h1>
    <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
      <span className="d-flex align-items-center">
        <FaStar className="text-warning me-1" /> 
        <span className="ms-1">{rating}</span>
      </span>
      <span className="d-flex align-items-center">
        <FaClock className="text-primary me-1" /> 
        <span className="ms-1">{duration}</span>
      </span>
      <Badge bg="info" className="text-capitalize">{level}</Badge>
      <Badge bg="success" className="text-capitalize">{language}</Badge>
    </div>
    <p className="lead text-muted">{description}</p>
  </div>
);

export default CourseHero;