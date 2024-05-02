import React from 'react';
import './TestButton.css';
import { Link } from 'react-router-dom';

const STYLES = ['test-button--primary', 'test-button--outline', 'test-button--test'];

const SIZES = ['test-button--medium', 'test-button--large'];

export const TestButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to='/sign-up' className='test-button-mobile'>
      <button
        className={`test-button ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};