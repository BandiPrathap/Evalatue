import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

const Faq = () => {
  return (
    <Container className="my-5">
      {/* <h2 className="text-center mb-4">Frequently Asked Questions</h2> */}
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What do I get after purchasing a course?</Accordion.Header>
          <Accordion.Body>
            You get lifetime access to the course, including all future updates, downloadable resources, and a certificate of completion.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Can I access the course on mobile?</Accordion.Header>
          <Accordion.Body>
            Yes! Our platform is fully responsive. You can access the course on any device – mobile, tablet, or desktop.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>What if I have doubts during the course?</Accordion.Header>
          <Accordion.Body>
            Each course includes a discussion section where you can post your doubts. Our instructors or community members will respond quickly.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Is there a refund policy?</Accordion.Header>
          <Accordion.Body>
            Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us within 7 days for a full refund.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Faq;
