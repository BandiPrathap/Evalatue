import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressBarComponent = ({ now, label }) => {
  const getVariant = (percentage) => {
    if (percentage < 30) return 'danger';
    if (percentage < 70) return 'warning';
    return 'success';
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between mb-1">
        <small>Progress</small>
        <small>{label || `${now}%`}</small>
      </div>
      <ProgressBar 
        now={now} 
        variant={getVariant(now)} 
        animated={now < 100}
        label={`${now}%`} 
        style={{ height: '10px' }}
      />
    </div>
  );
};

export default ProgressBarComponent;