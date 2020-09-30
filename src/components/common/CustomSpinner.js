import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomSpinner = ({ className }) => {
  return (
    <div className={`custom-spinner text-center h-100 w-100 ${className}`}>
      <Spinner animation="border" className="m-auto" />
    </div>
  );
};

CustomSpinner.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
};
export default CustomSpinner;
