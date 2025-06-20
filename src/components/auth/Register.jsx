import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container} from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      await register(formData);
    } catch (err) {
      setErrors("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 bg-light" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
          <FaUser size={30} color="white" />
        </div>
        <h2>Create Your Account</h2>
      </div>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <Form.Control
              type="password"
              name="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
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
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            label={
              <span>
                I agree to the <Link to="/terms">Terms and Conditions</Link>
              </span>
            }
            checked={formData.agreeTerms}
            onChange={handleChange}
            isInvalid={!!errors.agreeTerms}
          />
          {errors.agreeTerms && (
            <div className="text-danger small mt-1">{errors.agreeTerms}</div>
          )}
        </Form.Group>
        
        <div className="d-grid mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>
        
        <div className="text-center">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </Form>
    </Container>
  );
};

export default Register;