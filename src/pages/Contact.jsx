import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const whatsappNumber = '916303343274'; // Replace with your actual number (include country code)

  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to know more about your courses.'
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Contact Us</h1>

      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Type your message here..." />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>

        <Col md={6} className="mt-4 mt-md-0">
          <h5><FaPhoneAlt className="me-2" />Phone</h5>
          <p>+91 99999 99999</p>

          <h5><FaEnvelope className="me-2" />Email</h5>
          <p>support@eduplatform.com</p>

          <h5><FaWhatsapp className="me-2 text-success" />WhatsApp</h5>
          <p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              Message us on WhatsApp
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
