import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-4">
      <Container>
        <Row>
          {/* Brand Info */}
          <Col md={4} className="mb-4">
            <h4 className="text-primary">SkillMaster</h4>
            <p>
              Unlock your potential with expert-led online courses in tech,
              business, and more.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Explore</h5>
            <ul className="list-unstyled">
              <li><a href="/courses" className="text-dark-50 text-decoration-none">Courses</a></li>
              <li><a href="/pricing" className="text-dark-50 text-decoration-none">Pricing</a></li>
              <li><a href="/about" className="text-dark-50 text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-dark-50 text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Help & Support</h5>
            <ul className="list-unstyled">
              <li><a href="/faq" className="text-dark-50 text-decoration-none">FAQs</a></li>
              <li><a href="/contact" className="text-dark-50 text-decoration-none">Customer Support</a></li>
              <li><a href="/terms" className="text-dark-50 text-decoration-none">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-dark-50 text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Social Icons */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-dark-50 fs-5"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-dark-50 fs-5"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-dark-50 fs-5"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-dark-50"><FaLinkedin /></a>
              <a href="https://youtube.com" className="text-dark-50 fs-5"><FaYoutube /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-dark" />

        <Row className="pt-3">
          <Col className="text-center">
            <small className="text-dark-50">
              &copy; {new Date().getFullYear()} SkillMaster. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
