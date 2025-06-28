import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../Assests/Logo.jpg'

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/courses?search=${query}`);
  };

  return (
    <Navbar bg="light" expand="lg" expanded={expanded} className="shadow-sm fixed-top" style={{ width: '100vw' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <span className="d-flex align-items-center">
            <img 
              src = {Logo}
              alt="SkillMaster" 
              width="40" 
              height="40" 
              className="me-2 border rounded-circle object-fit-cover"
            />
            JoinSchooling
          </span>
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="navbar" 
          onClick={() => setExpanded(!expanded)}
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar">
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>About</Nav.Link>
            <Nav.Link as={Link} to="/courses" onClick={() => setExpanded(false)}>Courses</Nav.Link>
            <Nav.Link as={Link} to="/practice" onClick={() => setExpanded(false)}>Practice</Nav.Link>
            <Nav.Link as={Link} to="/jobs" onClick={() => setExpanded(false)}>Jobs</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleSearch} onClick={() => setExpanded(false)}>
            <Form.Control
              type="search"
              placeholder="Search courses..."
              name="search"
              className="rounded-pill"
            />
            <Button 
              variant="outline-primary" 
              className="ms-2 rounded-circle"
              type="submit"
            >
              <FaSearch />
            </Button>
          </Form>
          
          {user ? (
            <div className="d-flex mt-2">
              <Button 
                variant="outline-primary" 
                as={Link} 
                to="/dashboard"
                className="me-2"
                onClick={() => setExpanded(false)}
              >
                Dashboard
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  logout();
                  setExpanded(false);
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex mt-2">
              <Button 
                variant="outline-primary" 
                as={Link} 
                to="/login"
                className="me-2"
              >
                Login
              </Button>
              <Button variant="primary" as={Link} to="/register" onClick={() => setExpanded(false)}>
                Sign Up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
