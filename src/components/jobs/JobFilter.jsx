import { useState, useEffect } from 'react';
import { 
  BriefcaseFill, 
  GeoAltFill, 
  PeopleFill, 
  ClockHistory,
  Building,
  Search
} from 'react-bootstrap-icons';

const JobFilters = ({ jobs = [], onFilterChange }) => {
  // State for filter criteria
  const [filters, setFilters] = useState({
    jobType: [],
    workMode: [],
    location: '',
    company: ''
  });

  // Extract unique values for filter options
  const jobTypes = [...new Set(jobs.map(job => job.job_type))];
  const workModes = [...new Set(jobs.map(job => job.mode))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const companies = [...new Set(jobs.map(job => job.company_name))];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'location' || filterType === 'company') {
        return { ...prev, [filterType]: value };
      }
      
      // Toggle array values for multi-select filters
      const newValues = prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  // Apply filters whenever they change
    useEffect(() => {
      onFilterChange(filters); // ✅ send filters instead of filtered jobs
    }, [filters, jobs, onFilterChange]);


  // Clear all filters
  const clearFilters = () => {
    setFilters({
      jobType: [],
      workMode: [],
      location: '',
      company: ''
    });
  };

  return (
    <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold mb-0">Filter Jobs</h2>
        <button 
          onClick={clearFilters}
          className="btn btn-sm btn-outline-secondary"
        >
          Clear All
        </button>
      </div>

      {/* Job Type Filter */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <BriefcaseFill className="text-primary me-2" />
          <h3 className="h6 fw-semibold mb-0">Job Type</h3>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {jobTypes.map(type => (
            <button
              key={type}
              onClick={() => handleFilterChange('jobType', type)}
              className={`btn btn-sm ${
                filters.jobType.includes(type)
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Work Mode Filter */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <ClockHistory className="text-primary me-2" />
          <h3 className="h6 fw-semibold mb-0">Work Mode</h3>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {workModes.map(mode => (
            <button
              key={mode}
              onClick={() => handleFilterChange('workMode', mode)}
              className={`btn btn-sm ${
                filters.workMode.includes(mode)
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <GeoAltFill className="text-primary me-2" />
          <h3 className="h6 fw-semibold mb-0">Location</h3>
        </div>
        <div className="input-group">
          <span className="input-group-text">
            <Search />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search locations..."
            value={filters.location}
            onChange={e => handleFilterChange('location', e.target.value)}
            list="locationOptions"
          />
          <datalist id="locationOptions">
            {locations.map(loc => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Company Filter */}
      <div>
        <div className="d-flex align-items-center mb-2">
          <Building className="text-primary me-2" />
          <h3 className="h6 fw-semibold mb-0">Company</h3>
        </div>
        <div className="input-group">
          <span className="input-group-text">
            <Search />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search companies..."
            value={filters.company}
            onChange={e => handleFilterChange('company', e.target.value)}
            list="companyOptions"
          />
          <datalist id="companyOptions">
            {companies.map(company => (
              <option key={company} value={company} />
            ))}
          </datalist>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;