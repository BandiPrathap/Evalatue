import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const JobCard = ({ job }) => {
  return (
    <Card 
      className="h-100 shadow-sm card-hover border-0.5
      "
      data-aos="fade-up"
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-1">{job.title}</Card.Title>
            <Card.Subtitle className="text-muted mb-3">{job.company}</Card.Subtitle>
          </div>
          <Badge bg="success" className="fs-6">New</Badge>
        </div>
        
        <div className="d-flex flex-wrap gap-2 mb-4">
          <div className="d-flex align-items-center text-muted">
            <FaMapMarkerAlt className="me-2" />
            <span>{job.location}</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <FaBriefcase className="me-2" />
            <span>{job.type}</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <FaMoneyBillWave className="me-2" />
            <span>{job.salary}</span>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-info">{job.category}</span>
          <Button 
            as={Link} 
            to={`/job/${job.id}`} 
            variant="outline-primary" 
            size="sm"
          >
            view details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;