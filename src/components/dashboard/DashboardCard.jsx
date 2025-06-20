import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardCard = ({ 
  title, 
  subtitle, 
  rightText, 
  children, 
  actionText, 
  actionLink,
  secondaryActionText,
  secondaryAction
}) => {
  return (
    <Card className="h-100 shadow-sm border-0 card-hover">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="fw-bold mb-1">{title}</Card.Title>
            <Card.Subtitle className="text-muted">{subtitle}</Card.Subtitle>
          </div>
          {rightText && <span className="text-muted small">{rightText}</span>}
        </div>
        
        {children}
        
        {(actionText || secondaryActionText) && (
          <div className="d-flex justify-content-between mt-3">
            {actionText && actionLink && (
              <Button 
                as={Link} 
                to={actionLink}
                variant="outline-primary" 
                size="sm"
              >
                {actionText}
              </Button>
            )}
            
            {secondaryActionText && (
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={secondaryAction}
              >
                {secondaryActionText}
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;