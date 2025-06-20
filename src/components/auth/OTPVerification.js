import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { temporaryCredentials, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!temporaryCredentials?.email) {
      toast.error('Email not found. Please register again.');
      navigate('/register');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(temporaryCredentials.email, otp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 bg-light" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
          <FaKey size={30} color="white" />
        </div>
        <h2>Verify Your Email</h2>
        <p className="text-muted">
          Enter the OTP sent to {temporaryCredentials?.email || 'your email'}
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>OTP Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-grid mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </div>

        <div className="text-center">
          <p>
            Didn't receive OTP? <Button variant="link">Resend OTP</Button>
          </p>
          <p>
            <Button variant="link" onClick={() => navigate('/register')}>
              Back to Register
            </Button>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default OTPVerification;