import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <section className="home-section">
      <div className="hero">
        <h1>Welcome to KC's Portfolio</h1>
        <p>I'm a professional developer passionate about creating meaningful digital experiences.</p>
        <div className="cta-buttons">
          <Link to="/projects" className="btn btn-primary">View My Work</Link>
          <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default Home; 