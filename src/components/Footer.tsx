import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Khadaffe Sulaiman</h3>
            <p className="footer-description">
              Software developer and AI enthusiast passionate about building intelligent applications that solve real-world problems.
            </p>
            <div className="social-links">
              <a href="https://github.com/KCprsnlcc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/khadaffe-s-232199194/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://web.facebook.com/Daff.Sulaiman/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://m.me/Daff.Sulaiman?hash=AbYeTuN-aK38D32O&source=qr_link_share" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
               <i className="fab fa-facebook-messenger"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Pages</h4>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>
            
            <div className="link-column">
              <h4>Contact</h4>
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:kcpersonalacc@gmail.com">kcpersonalacc@gmail.com</a>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <a href="tel:+639949953785">+639949953785</a>
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                Zamboanga City, Philippines
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Khadaffe Sulaiman. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 