import React from 'react';

const Logo = () => (
  <div className="logo-circle mb-8" style={{
    width: '120px',
    height: '120px',
    border: '2px solid black',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <svg className="logo-building" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="60" height="60">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h1M9 13h1M9 17h1M15 13h1M15 17h1" />
    </svg>
  </div>
);

export default Logo;
