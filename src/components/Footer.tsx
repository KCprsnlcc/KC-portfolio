import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} KC's Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 