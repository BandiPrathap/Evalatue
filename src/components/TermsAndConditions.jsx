import React, { useState } from 'react';
import { Container, Accordion } from 'react-bootstrap';

const TermsAndConditions = () => {
  const [activeKey, setActiveKey] = useState('0');

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">SkillMaster Terms & Conditions</h1>
        <p className="text-muted">Last Updated: June 20, 2025</p>
      </div>

      <div className="bg-white shadow rounded-3 p-4 mb-5">
        <p className="lead text-center">
          By accessing or using our platform, you agree to comply with and be bound by these terms.
        </p>
      </div>

      <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        {sections.map((section, index) => (
          <Accordion.Item eventKey={String(index)} key={index} className="mb-3">
            <Accordion.Header className="fw-bold fs-5">
              {section.title}
            </Accordion.Header>
            <Accordion.Body className="text-muted">
              {section.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      
    </Container>
  );
};

// Minimized content sections
const sections = [
  {
    title: "1. Account Registration",
    content: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and all activities under your account."
  },
  {
    title: "2. Course Access & License",
    content: "We grant you a limited, non-exclusive license to access course materials for personal, non-commercial use. You may not share, resell, reproduce, or distribute any content without explicit permission."
  },
  {
    title: "3. User Responsibilities",
    content: "You agree not to misuse the platform, upload harmful content, or engage in any activity that disrupts service. User-generated content must comply with our community guidelines."
  },
  {
    title: "4. Payments & Refunds",
    content: "All course fees are non-refundable after 14 days from purchase. We reserve the right to change pricing and modify or discontinue any service."
  },
  {
    title: "5. Intellectual Property",
    content: "All platform content, including courses, text, graphics, and logos, are owned by ElevateU or its licensors and protected by copyright laws."
  },
  {
    title: "6. Privacy",
    content: "Your use is subject to our Privacy Policy. We collect and use information as described in that policy."
  },
  {
    title: "7. Modifications",
    content: "We may update these Terms periodically. Continued use after changes constitutes acceptance. Check this page regularly for updates."
  },
  {
    title: "8. Termination",
    content: "We may suspend or terminate accounts for violations of these Terms. You may terminate your account at any time."
  },
  {
    title: "9. Disclaimer",
    content: "Services are provided 'as is' without warranties. We don't guarantee specific results from course completion."
  }
];

export default TermsAndConditions;