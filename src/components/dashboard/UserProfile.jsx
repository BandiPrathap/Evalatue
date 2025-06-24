import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const UserProfile = ({ user }) => {
  return (
    <Card className="p-4 shadow-sm">
      <Row className="align-items-center">
        <Col md={3} className="text-center mb-3 mb-md-0">
          <Image 
            src={user?.profileImage || "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"} 
            alt="Profile" 
            roundedCircle 
            fluid 
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={9} className='text-center'>
          <h4 className="mb-1">{user?.name || 'John Doe'}</h4>
          <p className="text-muted mb-0">{user?.email || 'john.doe@example.com'}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
