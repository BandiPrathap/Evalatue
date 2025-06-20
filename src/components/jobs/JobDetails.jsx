import React from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import {
  FaMapMarkerAlt, FaBriefcase, FaClock, FaMoneyBillWave,
  FaUserFriends, FaBuilding, FaGlobe, FaCalendarAlt
} from 'react-icons/fa';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

const JobDetail = ({ job }) => {
  job = {
    "id": 1,
    "title": "Frontend Developer",
    "company_name": "TechNova Solutions",
    "location": "Bangalore, India",
    "job_type": "full-time",
    "mode": "hybrid",
    "openings": 2,
    "package": "INR 8 LPA",
    "description": "Looking for a React.js developer with 2+ years of experience. Should be good with CSS, REST APIs, and Git.",
    "apply_link": "https://www.linkedin.com/jobs/view/3890513911/",
    "posted_by": 3,
    "created_at": "2025-05-25T00:14:50.565Z"
  };

  if (!job) return <div className="text-center py-5">Loading job details...</div>;

  const postedDate = formatDate(job.created_at);

  const jobTypeMap = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    contract: 'Contract',
    internship: 'Internship',
    remote: 'Remote'
  };

  const jobModeMap = {
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site'
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-lg">
        <Card.Body className="p-4">
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="mb-1">{job.title}</h1>
                <h3 className="text-primary mb-3">{job.company_name}</h3>
              </div>
              <Badge bg="success" className="fs-5 px-3 py-2">Active</Badge>
            </div>

            <div className="d-flex flex-wrap gap-4 mb-4">
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="text-muted me-2 fs-5" />
                <span className="fs-5">{job.location}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaBriefcase className="text-muted me-2 fs-5" />
                <span className="fs-5">{jobTypeMap[job.job_type] || job.job_type}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaBuilding className="text-muted me-2 fs-5" />
                <span className="fs-5">{jobModeMap[job.mode] || job.mode}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaMoneyBillWave className="text-muted me-2 fs-5" />
                <span className="fs-5">{job.package}</span>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-4">
              <div className="d-flex align-items-center">
                <FaUserFriends className="text-muted me-2" />
                <span>Openings: {job.openings}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted me-2" />
                <span>Posted: {postedDate}</span>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <Row>
            <Col lg={8}>
              <div className="mb-5">
                <h4 className="mb-3">Job Description</h4>
                <div className="lh-lg" style={{ whiteSpace: 'pre-line' }}>
                  {job.description}
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                <Card.Body className="p-4">
                  <h5 className="mb-4">Apply for this position</h5>

                  <div className="d-grid gap-3">
                    <Button
                      as="a"
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="lg"
                    >
                      Apply Now
                    </Button>

                    <Button
                      variant="outline-primary"
                      size="lg"
                    >
                      Save Job
                    </Button>
                  </div>

                  <hr className="my-4" />

                  <div>
                    <h6 className="mb-3">Job Overview</h6>
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex">
                        <FaBriefcase className="text-muted me-3 mt-1" />
                        <div>
                          <small className="text-muted">Job Type</small>
                          <div>{jobTypeMap[job.job_type] || job.job_type}</div>
                        </div>
                      </li>
                      <li className="mb-3 d-flex">
                        <FaMapMarkerAlt className="text-muted me-3 mt-1" />
                        <div>
                          <small className="text-muted">Location</small>
                          <div>{job.location}</div>
                        </div>
                      </li>
                      <li className="mb-3 d-flex">
                        <FaMoneyBillWave className="text-muted me-3 mt-1" />
                        <div>
                          <small className="text-muted">Salary</small>
                          <div>{job.package}</div>
                        </div>
                      </li>
                      <li className="mb-3 d-flex">
                        <FaClock className="text-muted me-3 mt-1" />
                        <div>
                          <small className="text-muted">Posted</small>
                          <div>{postedDate}</div>
                        </div>
                      </li>
                      <li className="d-flex">
                        <FaGlobe className="text-muted me-3 mt-1" />
                        <div>
                          <small className="text-muted">Work Mode</small>
                          <div>{jobModeMap[job.mode] || job.mode}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetail;
