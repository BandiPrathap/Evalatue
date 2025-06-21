import React, { useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const JobCard = ({ job }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Format the date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-100 shadow-sm card-hover border-0.5" data-aos="fade-up">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-1">{job.title}</Card.Title>
            <Card.Subtitle className="text-muted mb-3">{job.company_name}</Card.Subtitle>
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
            <span>{job.job_type}</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <FaMoneyBillWave className="me-2" />
            <span>{job.package}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Posted on: {formatDate(job.created_at)}</small>
          <Button 
            as={Link} 
            to={`/job/${job.id}`} 
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

export default JobCard;
