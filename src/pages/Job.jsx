import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  Briefcase,
  Funnel,
  Search,
  PencilSquare,
  CurrencyDollar,
  X,
  ChevronDown,
  ChevronUp
} from 'react-bootstrap-icons';

import JobCard from '../components/jobs/JobCard';
import { getAllJobs } from '../API/index';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    mode: '',
    minSalary: ''
  });
  const [showFilters, setShowFilters] = useState(true); // New state for filter visibility

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getAllJobs();
      const allJobs = response.data;
      setJobs(allJobs);
      localStorage.setItem("jobsData", JSON.stringify({
        data: allJobs,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("jobsData"));
    if (cached?.data?.length > 0) {
      setJobs(cached.data);
      setLoading(false);
    } else {
      fetchJobs();
    }
  }, []);

  // Unique options for filters
  const jobTypes = [...new Set(jobs.map(job => job.job_type))];
  const modes = [...new Set(jobs.map(job => job.mode))];

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.jobType || job.job_type === filters.jobType;
      const matchesMode = !filters.mode || job.mode === filters.mode;
      const matchesSalary = !filters.minSalary || Number(job.salary) >= Number(filters.minSalary);

      return matchesSearch && matchesType && matchesMode && matchesSalary;
    });
  }, [jobs, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      jobType: '',
      mode: '',
      minSalary: ''
    });
    setSearchTerm('');
  };

  // Count active filters
  const activeFilters = [
    filters.jobType ? 1 : 0,
    filters.mode ? 1 : 0,
    filters.minSalary ? 1 : 0,
    searchTerm ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  if (loading) {
    return <div className="text-center p-5">Loading jobs...</div>;
  }

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div className="d-flex align-items-center gap-2">
          <h1 className="h2 fw-bold mb-0 d-flex align-items-center">
            <Briefcase className="me-2" />
            Job Listings
          </h1>
        </div>
        
        {/* Toggle Filters Button */}
        <Button 
          variant="outline-secondary" 
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Funnel size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Search & Filters - Conditionally Rendered */}
      {showFilters && (
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              {/* Search input */}
              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search jobs, companies, or keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Dropdown filters */}
              <div className="col-12 col-md-8">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <div className="d-flex align-items-center me-2">
                    <Funnel className="me-2" />
                    <strong>Filters:</strong>
                  </div>

                  {/* Job Type */}
                  <select
                    className="form-select w-auto"
                    value={filters.jobType}
                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                  >
                    <option value="">All Types</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  {/* Mode */}
                  <select
                    className="form-select w-auto"
                    value={filters.mode}
                    onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
                  >
                    <option value="">All Modes</option>
                    {modes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>

                  {/* Salary Filter */}
                  <div className="input-group w-auto">
                    <span className="input-group-text">
                      <CurrencyDollar size={14} />
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min Salary"
                      value={filters.minSalary}
                      onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                      min="0"
                    />
                  </div>

                  {/* Clear Button */}
                  {activeFilters > 0 && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={clearFilters}
                    >
                      <X className="me-1" />
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <p className="mb-0 text-muted">
          Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs
        </p>
        
        {/* Active filters badge */}
        {activeFilters > 0 && (
          <div>
            <span className="badge bg-light text-dark me-2">
              {activeFilters} active filter{activeFilters !== 1 ? 's' : ''}
            </span>
            <Button 
              variant="link" 
              className="text-decoration-none p-0"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-5">
          <h4>No jobs found</h4>
          <p>Try changing filters or search keywords.</p>
          <Button variant="outline-primary" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <Row>
          {filteredJobs.map(job => (
            <Col md={6} lg={4} key={job.id} className="mb-4">
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Jobs;