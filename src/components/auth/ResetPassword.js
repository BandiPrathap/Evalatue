import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FaLock, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { temporaryCredentials, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!otp) newErrors.otp = 'OTP is required';
    if (!newPassword) newErrors.newPassword = 'Password is required';
    else if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!temporaryCredentials?.email) {
      toast.error('Email not found. Please try again.');
      navigate('/forgot-password');
      return;
    }
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      await resetPassword(
        temporaryCredentials.email, 
        otp, 
        newPassword
      );
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
          <FaLock size={30} color="white" />
        </div>
        <h2>Reset Your Password</h2>
        <p className="text-muted">
          Create a new password for {temporaryCredentials?.email || 'your account'}
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>OTP Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the OTP you received"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            isInvalid={!!errors.otp}
          />
          <Form.Control.Feedback type="invalid">
            {errors.otp}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <Form.Control
              type="password"
              placeholder="Create a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isInvalid={!!errors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaCheck />
            </span>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <div className="d-grid mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ResetPassword;