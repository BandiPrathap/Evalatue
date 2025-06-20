import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

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
    <Navbar bg="light" expand="lg" expanded={expanded} className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <span className="d-flex align-items-center">
            <img 
              src="https://img.freepik.com/premium-vector/skills-icon-with-settings-sign-skills-icon-customize-setup-manage-process-symbol-vector-icon_775815-966.jpg?w=1380" 
              alt="SkillMaster" 
              width="40" 
              height="40" 
              className="me-2 border rounded-circle"
            />
            SkillMaster
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
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleSearch}>
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
              >
                Dashboard
              </Button>
              <Button variant="outline-danger" onClick={logout}>
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
              <Button variant="primary" as={Link} to="/register">
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