import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to update profile
      setTimeout(() => {
        console.log('Profile updated:', formData);
        setSuccess(true);
        setLoading(false);
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
    } catch (err) {
      setError('Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h3 className="mb-4">Your Profile</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Profile updated successfully!</Alert>}
        
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
                value={formData.name}
                onChange={handleChange}
                required
              />
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
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaPhone />
              </span>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </Form.Group>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              <FaSave className="me-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;