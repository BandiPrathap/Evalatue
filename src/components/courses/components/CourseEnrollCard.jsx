// CourseEnrollCard.js
import React from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { 
  FaPlay, 
  FaCheckCircle, 
  FaStar, 
  FaDownload,
  FaTag
} from 'react-icons/fa';

const CourseEnrollCard = ({ course, enrolled, paymentProcessing, onEnrollClick }) => {
  // Provide default values if course or its properties are null/undefined
  const price = parseFloat(course?.price ?? 0);
  const discount = parseFloat(course?.discount ?? 0);
  const discountedPrice = price - (price * (discount / 100));
  const imageUrl = course?.imageUrl || 'https://tse3.mm.bing.net/th?id=OIP.qIOXrWlJjB2ymOVHL93MfAHaEw&pid=Api&P=0&h=180';
  const title = course?.title || 'Untitled Course';
  const rating = course?.rating ?? 0;
  const duration = course?.duration || 'N/A';
  const language = course?.language || 'N/A';
  const level = course?.category || 'N/A';

  return (
    <Card className="shadow-sm sticky-top" style={{ top: '20px' }} data-aos="fade-left">
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        alt={title} 
        className="img-fluid"
      />
      <Card.Body>
        <PriceHeader 
          price={price}
          discountedPrice={discountedPrice}
          discount={discount}
          rating={rating} 
        />
        
        <EnrollButton 
          enrolled={enrolled} 
          processing={paymentProcessing} 
          onEnrollClick={onEnrollClick} 
        />
        
        <CourseDetails 
          duration={duration} 
          language={language} 
          level={level}
        />
        
        <DownloadButton />
      </Card.Body>
    </Card>
  );
};

const PriceHeader = ({ price, discountedPrice, discount, rating, reviews }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h4 className="mb-0">
        {price === 0 ? (
          'Free'
        ) : (
          <>
            <span className="text-decoration-line-through text-muted me-2">
              ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-danger fw-bold">
              ₹{discountedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </>
        )}
      </h4>
      <div className="d-flex align-items-center">
        <FaStar className="text-warning" />
        <span className="ms-1">{rating}</span>
      </div>
    </div>
    
    {discount > 0 && (
      <Badge bg="danger" className="d-inline-flex align-items-center">
        <FaTag className="me-1" /> {discount}% OFF
      </Badge>
    )}
  </div>
);

const EnrollButton = ({ enrolled, processing, onEnrollClick }) => (
  enrolled ? (
    <Button variant="success" className="w-100 mb-3" disabled>
      <FaCheckCircle className="me-2" /> Enrolled
    </Button>
  ) : (
    <Button 
      variant="primary" 
      className="w-100 mb-3 py-2 fw-bold" 
      onClick={onEnrollClick} 
      disabled={processing}
    >
      {processing ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Processing Payment...
        </>
      ) : (
        <>
          <FaPlay className="me-2" /> Enroll Now
        </>
      )}
    </Button>
  )
);

const CourseDetails = ({ duration, language, level }) => (
  <ListGroup variant="flush" className="mb-4 border rounded">
    <ListGroup.Item className="d-flex justify-content-between py-3">
      <span>Duration</span>
      <span className="fw-medium">{duration}</span>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between py-3">
      <span>Language</span>
      <span className="fw-medium text-capitalize">{language}</span>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between py-3">
      <span>Category</span>
      <span className="fw-medium text-capitalize">{level}</span>
    </ListGroup.Item>
  </ListGroup>
);

const DownloadButton = () => (
  <div className="d-grid">
    <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
      <FaDownload className="me-2" /> Download Resources
    </Button>
  </div>
);

export default CourseEnrollCard;