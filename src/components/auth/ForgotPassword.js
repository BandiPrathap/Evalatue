import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await forgotPassword(email);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 bg-light" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
          <FaEnvelope size={30} color="white" />
        </div>
        <h2>Reset Your Password</h2>
        <p className="text-muted">
          Enter your email to receive a password reset OTP
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </div>

        <div className="text-center">
          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;