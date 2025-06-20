// JobFilter.js
import React from 'react';
import { Form, Accordion, Card, Button } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';

const JobFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    location: '',
    types: [],
    salaryRange: ''
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const salaryRanges = [
    { id: 'low', label: 'Up to $50,000' },
    { id: 'medium', label: '$50,000 - $100,000' },
    { id: 'high', label: 'Over $100,000' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const newTypes = checked 
        ? [...filters.types, value] 
        : filters.types.filter(t => t !== value);
      
      const newFilters = { ...filters, types: newTypes };
      setFilters(newFilters);
      onFilterChange(newFilters);
    } else {
      const newFilters = { ...filters, [name]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const newFilters = { location: '', types: [], salaryRange: '' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card className="shadow-sm mb-4" style={{ maxWidth: '350px' }}>
      <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center">
          <FaFilter className="me-2 fs-5" />
          <span className="fw-bold fs-5">Filter Jobs</span>
        </div>
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={clearFilters}
          className="d-flex align-items-center"
        >
          <FaTimes className="me-1" /> Clear
        </Button>
      </Card.Header>
      <Card.Body className="p-3">
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium mb-2">Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="City, state, or remote"
            name="location"
            value={filters.location}
            onChange={handleChange}
            size="lg"
            className="py-2"
          />
        </Form.Group>
        
        <Accordion alwaysOpen className="mb-2">
          <Accordion.Item eventKey="0" className="mb-3 border rounded-3">
            <Accordion.Header className="fw-medium fs-6 py-2 px-3">
              Job Type
            </Accordion.Header>
            <Accordion.Body className="p-3 pt-2">
              <div className="d-flex flex-column">
                {jobTypes.map(type => (
                  <Form.Check 
                    key={type}
                    type="checkbox"
                    name="types"
                    id={`type-${type}`}
                    label={<span className="fs-6">{type}</span>}
                    value={type}
                    checked={filters.types.includes(type)}
                    onChange={handleChange}
                    className="mb-3 py-1"
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1" className="border rounded-3">
            <Accordion.Header className="fw-medium fs-6 py-2 px-3">
              Salary Range
            </Accordion.Header>
            <Accordion.Body className="p-3 pt-2">
              <div className="d-flex flex-column">
                {salaryRanges.map(range => (
                  <Form.Check 
                    key={range.id}
                    type="radio"
                    name="salaryRange"
                    id={`salary-${range.id}`}
                    label={<span className="fs-6">{range.label}</span>}
                    value={range.id}
                    checked={filters.salaryRange === range.id}
                    onChange={handleChange}
                    className="mb-3 py-1"
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default JobFilter;