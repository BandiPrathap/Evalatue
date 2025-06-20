import React, { useState, useEffect, useMemo } from 'react';
import JobFilter from '../components/jobs/JobFilter';
import JobCard from '../components/jobs/JobCard';
import { Container, Row, Col } from 'react-bootstrap';

// Moved sampleData outside the component to avoid dependency issues
const sampleData = [
  { 
    id: 1, 
    title: 'Frontend Developer', 
    company: 'TechCorp', 
    location: 'Remote, USA',
    type: 'Full-time',
    salaryRange: 'high'
  },
  { 
    id: 2, 
    title: 'Data Analyst', 
    company: 'DataInsights', 
    location: 'New York, NY',
    type: 'Part-time',
    salaryRange: 'medium'
  },
  { 
    id: 3, 
    title: 'UI/UX Designer', 
    company: 'DesignHub', 
    location: 'San Francisco, CA',
    type: 'Contract',
    salaryRange: 'high'
  },
  { 
    id: 4, 
    title: 'Backend Engineer', 
    company: 'ServerStack', 
    location: 'Remote, Canada',
    type: 'Full-time',
    salaryRange: 'high'
  },
  { 
    id: 5, 
    title: 'Marketing Intern', 
    company: 'GrowthHackers', 
    location: 'Chicago, IL',
    type: 'Internship',
    salaryRange: 'low'
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    types: [],
    salaryRange: ''
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API here
        // const response = await fetch('/api/jobs');
        // const data = await response.json();
        // setJobs(data);
        
        setJobs(sampleData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array since sampleData is now constant

  // Filter jobs based on filter criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Location filter (case-insensitive)
      if (filters.location && 
          !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Job type filter (multiple selection)
      if (filters.types.length > 0 && !filters.types.includes(job.type)) {
        return false;
      }
      
      // Salary range filter
      if (filters.salaryRange && job.salaryRange !== filters.salaryRange) {
        return false;
      }
      
      return true;
    });
  }, [jobs, filters]);

  if (loading) {
    return <div className="text-center p-5">Loading jobs...</div>;
  }

  return (
    <div className="p-3">
      <h2 className="text-center mb-4">Job Opportunities</h2>
      
      <Container>
        <Row>
          {/* Filter Column - fixed width */}
          {/* <Col lg={3} className="mb-4">
            <JobFilter onFilterChange={setFilters} />
          </Col> */}
          
          {/* Job Listings Column - fluid width */}
          <Col >
            <section>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-5">
                  <h4>No jobs match your filters</h4>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                <Row>
                  {filteredJobs.map((job) => (
                    <Col md={6} lg={4} key={job.id} className='mb-4'>
                      <JobCard job={job} />
                    </Col>
                  ))}
                </Row>
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;