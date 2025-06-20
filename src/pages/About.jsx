import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">About EduPlatform</h1>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <Image
            src="https://source.unsplash.com/600x400/?online,education"
            alt="Online Learning"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <h4>Empowering Learners Everywhere</h4>
          <p>
            EduPlatform is your go-to destination for quality online education. Whether you want to build new skills, prepare for jobs, or explore your passion, we provide industry-relevant courses designed by experts.
          </p>
          <p>
            Our mission is to make learning accessible, affordable, and effective for everyone. We believe that education has the power to transform lives—and we’re here to make that happen.
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={4}>
          <h5>🎯 Mission</h5>
          <p>
            To deliver high-quality, affordable education that empowers individuals to grow personally and professionally.
          </p>
        </Col>
        <Col md={4}>
          <h5>🌍 Vision</h5>
          <p>
            To become a trusted global platform for online learning that fosters lifelong skill development.
          </p>
        </Col>
        <Col md={4}>
          <h5>🤝 Values</h5>
          <p>
            Integrity, accessibility, innovation, and a learner-first approach.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
