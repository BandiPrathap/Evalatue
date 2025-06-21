import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(formData);
      if (success) {
        navigate(from, { replace: true }); // Redirect to the intended page
      }
    } catch (err) {
      setError('Invalid email or password');
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
        <h2>Login to Your Account</h2>
      </div>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </Form.Group>
        
        <div className="d-grid mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        
        <div className="text-center mb-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        
        <div className="text-center">
          <p>Don't have an account? <Link to="/register">Register now</Link></p>
        </div>
      </Form>
    </Container>
  );
};

export default Login;