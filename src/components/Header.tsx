import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Effect to prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);
  
  // Effect to close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/" onClick={closeMenu}>
              <span className="logo-text">Khadaffe Sulaiman</span>
            </Link>
          </div>
          
          <div className="mobile-actions">
            <button 
              className="theme-toggle-btn mobile-theme-toggle" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
            </button>
            
            <button 
              className={`menu-toggle ${isOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className={isActive('/')}>
                <Link to="/" onClick={closeMenu}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className={isActive('/about')}>
                <Link to="/about" onClick={closeMenu}>
                  <i className="fas fa-user"></i> About
                </Link>
              </li>
              <li className={isActive('/projects')}>
                <Link to="/projects" onClick={closeMenu}>
                  <i className="fas fa-code"></i> Projects
                </Link>
              </li>
              <li className={isActive('/blog')}>
                <Link to="/blog" onClick={closeMenu}>
                  <i className="fas fa-blog"></i> Blog
                </Link>
              </li>
              <li className={isActive('/contact')}>
                <Link to="/contact" onClick={closeMenu}>
                  <i className="fas fa-envelope"></i> Contact
                </Link>
              </li>
              <li className="theme-toggle-item desktop-only">
                <button 
                  className="theme-toggle-btn" 
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <i className="fas fa-moon"></i>
                  ) : (
                    <i className="fas fa-sun"></i>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 