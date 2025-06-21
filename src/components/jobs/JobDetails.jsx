import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  BriefcaseFill, GeoAltFill, PeopleFill, CashStack, ClockHistory,
  BoxArrowUpRight, Building, Calendar2Check, ChevronLeft
} from 'react-bootstrap-icons';
import { getJobById } from '../../API/index';

// Format ISO date to readable format (e.g., Jun 21, 2025)
const formatPostedDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const JobDetails = () => {
  const { id } = useParams();
  const jobId = String(id); // Ensure consistent comparison
  const oneHour = 3600000; // 1 hour
  const now = Date.now();

  const cachedJobs = JSON.parse(localStorage.getItem("jobsData")) || { data: [], timestamp: 0 };
  const jobFromList = cachedJobs.data.find(job => String(job.id) === jobId);
  const isListCacheFresh = now - cachedJobs.timestamp < oneHour;

  const cachedJobDetail = JSON.parse(localStorage.getItem("jobData")) || { data: null, timestamp: 0 };
  const isDetailCacheFresh = now - cachedJobDetail.timestamp < oneHour && cachedJobDetail.data?.id === jobId;

  const [job, setJob] = useState(
    isListCacheFresh && jobFromList
      ? jobFromList
      : isDetailCacheFresh
        ? cachedJobDetail.data
        : null
  );
  const [loading, setLoading] = useState(false);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await getJobById(jobId);
      const jobDetails = response.data;
      setJob(jobDetails);

      localStorage.setItem(
        "jobData",
        JSON.stringify({ data: jobDetails, timestamp: now })
      );
    } catch (error) {
      console.error("Error fetching job details:", error);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!job) {
      fetchJobDetails();
    }
  }, [jobId, job]);

  // Loader
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Job not found
  if (!job) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3">
        <div className="bg-light p-5 rounded-4 shadow-sm w-100" style={{ maxWidth: 400 }}>
          <h1 className="h4 fw-bold text-dark mb-3">Job Not Found</h1>
          <p className="text-muted mb-4">
            The job you're looking for doesn't exist or may have been removed.
          </p>
          <a href="/jobs" className="d-inline-flex align-items-center text-primary fw-medium">
            <ChevronLeft className="me-1" /> Back to jobs list
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2" style={{ maxWidth: 900 }}>
      {/* <a href="/jobs" className="d-inline-flex align-items-center text-primary mb-3 fw-medium">
        <ChevronLeft className="me-1" /> Back to jobs
      </a> */}

      <div className="bg-white rounded-4 shadow overflow-hidden border">
        <div className="bg-primary bg-opacity-10 p-4 border-bottom">
          <div className="row align-items-center">
            <div className="col-md">
              <h1 className="h3 fw-bold text-dark mb-2">{job.title}</h1>
              <p className="text-muted small mb-1">
                Posted on: {formatPostedDate(job.created_at)}
              </p>
              <div className="d-flex align-items-center mb-2">
                <Building className="text-secondary me-2" />
                <span className="text-muted fw-medium">{job.company_name}</span>
                <span className="mx-2 text-secondary">•</span>
                <GeoAltFill className="text-secondary me-2" />
                <span className="text-muted">{job.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="bg-light rounded-3 p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <BriefcaseFill className="text-primary fs-4 me-2" />
                  <h3 className="h6 fw-semibold text-dark mb-0">Job Details</h3>
                </div>
                {[
                  ["Job Type", job.job_type],
                  ["Work Mode", job.mode],
                  ["Openings", job.openings],
                  ["Package", job.package],
                ].map(([label, value], i) => (
                  <div className="mb-2 d-flex" key={i}>
                    <div className="w-50 text-secondary d-flex align-items-center">
                      {label === "Job Type" && <ClockHistory className="me-2" />}
                      {label === "Work Mode" && <Calendar2Check className="me-2" />}
                      {label === "Openings" && <PeopleFill className="me-2" />}
                      {label === "Package" && <CashStack className="me-2" />}
                      {label}
                    </div>
                    <div className="w-50 fw-medium">{value || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-light rounded-3 p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <BoxArrowUpRight className="text-primary fs-4 me-2" />
                  <h3 className="h6 fw-semibold text-dark mb-0">Application</h3>
                </div>
                <div className="mb-3">
                  <p className="text-muted mb-1">Apply directly through this link:</p>
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-inline-flex align-items-center text-primary text-break"
                  >
                    {job.apply_link}
                    <BoxArrowUpRight className="ms-1 fs-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="border-top pt-4">
            <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center">
              <BriefcaseFill className="me-2 text-primary" />
              Job Description
            </h2>
            <div className="text-muted">
              {job.description ? (
                <p>{job.description}</p>
              ) : (
                <div className="fst-italic">No description provided for this position.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
