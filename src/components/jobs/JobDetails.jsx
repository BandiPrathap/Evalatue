import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  BriefcaseFill, GeoAltFill, PeopleFill, CashStack, ClockHistory,
  BoxArrowUpRight, Building, Calendar2Check, ChevronLeft, Heart, HeartFill
} from 'react-bootstrap-icons';
import { getJobById, getSavedJobs, saveJob, unSaveJob } from '../../API/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const jobId = String(id);
  const oneHour = 3600000;
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
  const [isSaved, setIsSaved] = useState(false);

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

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await getSavedJobs();
        const saved = response.data || [];
        const found = saved.some((savedJob) => String(savedJob.id) === jobId);
        setIsSaved(found);
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
      }
    };
    fetchSaved();
  }, [jobId]);

  const ONE_HOUR = 60 * 60 * 1000; // in milliseconds

  const handleToggleSave = async () => {
    try {
      if (isSaved) {
        await unSaveJob(jobId);
        toast.info("Job removed from saved jobs");
      } else {
        await saveJob(jobId);
        toast.success("Job saved successfully");
      }

      const savedJobs = await getSavedJobs();

      // Store in localStorage with timestamp
      const savedJobsData = {
        data: savedJobs.data,
        timestamp: Date.now()
      };
      localStorage.setItem("savedJobsData", JSON.stringify(savedJobsData));

      setIsSaved(!isSaved);
    } catch (error) {
      toast.error("Failed to update saved job status");
    }
  };


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-muted">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3">
        <div className="bg-white p-5 rounded-4 shadow-sm w-100 border" style={{ maxWidth: 500 }}>
          <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
            <Building className="text-danger" size={36} />
          </div>
          <h1 className="h3 fw-bold text-dark mb-3">Job Not Found</h1>
          <p className="text-muted mb-4">
            The job you're looking for doesn't exist or may have been removed.
          </p>
          <a href="/jobs" className="btn btn-primary d-inline-flex align-items-center px-4">
            <ChevronLeft className="me-1" /> Back to jobs list
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <ToastContainer position="top-center" autoClose={3000} />

      <a href="/jobs" className="d-inline-flex align-items-center text-decoration-none mb-4">
        <ChevronLeft className="me-1" /> <span className="text-primary fw-medium">Back to jobs</span>
      </a>

      <div className="bg-white rounded-4 shadow-sm overflow-hidden border">
        {/* Header with company info */}
        <div className="bg-light p-4 border-bottom">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white border rounded p-2 me-3">
                  <Building className="text-primary" size={28} />
                </div>
                <div>
                  <h1 className="h2 fw-bold text-dark mb-1">{job.title}</h1>
                  <h2 className="h5 text-muted mb-0">{job.company_name}</h2>
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill d-flex align-items-center">
                  <GeoAltFill className="me-1" size={14} /> {job.location}
                </span>
                <span className="badge bg-info bg-opacity-10 text-info py-2 px-3 rounded-pill">
                  {job.job_type}
                </span>
                <span className="badge bg-success bg-opacity-10 text-success py-2 px-3 rounded-pill">
                  {job.mode}
                </span>
              </div>
              
              <div className="text-muted d-flex align-items-center">
                <ClockHistory className="me-1" size={14} />
                <span>Posted: {formatPostedDate(job.created_at)}</span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-danger'} rounded-circle p-2`}
                onClick={handleToggleSave}
                aria-label={isSaved ? "Unsave job" : "Save job"}
              >
                {isSaved ? <HeartFill size={20} /> : <Heart size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Key Info Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="border rounded-3 p-4 h-100">
                <h3 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center">
                  <BriefcaseFill className="text-primary me-2" />
                  Job Details
                </h3>
                
                <div className="d-grid gap-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded-circle p-2 me-3">
                      <PeopleFill className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted small">Openings</div>
                      <div className="fw-medium">{job.openings || 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded-circle p-2 me-3">
                      <CashStack className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted small">Package</div>
                      <div className="fw-medium">{job.package || 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded-circle p-2 me-3">
                      <Calendar2Check className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted small">Work Mode</div>
                      <div className="fw-medium">{job.mode || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-4 h-100">
                <h3 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center">
                  <BoxArrowUpRight className="text-primary me-2" />
                  Application
                </h3>
                
                <div className="d-flex flex-column h-100">
                  <p className="text-muted mb-3">Apply directly through this link:</p>
                  
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto d-inline-flex align-items-center justify-content-center w-100"
                  >
                    Apply Now <BoxArrowUpRight className="ms-2" />
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
                <div className="border rounded-3 p-4 bg-light">
                  <p className="mb-0">{job.description}</p>
                </div>
              ) : (
                <div className="fst-italic text-center py-4 border rounded-3 bg-light">
                  No description provided for this position
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;