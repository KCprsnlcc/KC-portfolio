import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <section className="home-section">
      <div className="hero-container">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text" data-aos="fade-right" data-aos-delay="100">
              <h1 className="hero-title">Hi, I'm <span className="highlight">Khadaffe</span></h1>
              <h2 className="hero-subtitle">Software Developer & AI Enthusiast</h2>
              <p className="hero-description">
                I specialize in building intelligent applications, from web apps and ML projects to chatbots using Python, Django, React, and AI tools.
              </p>
              <div className="hero-buttons">
                <Link to="/projects" className="btn btn-primary">
                  <i className="fas fa-code"></i> View My Work
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <i className="fas fa-paper-plane"></i> Get in Touch
                </Link>
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="300">
              <div className="image-container">
                <div className="blob-shape"></div>
                <div className="floating-icons">
                  <i className="fab fa-python"></i>
                  <i className="fab fa-react"></i>
                  <i className="fab fa-js"></i>
                  <i className="fab fa-php"></i>
                  <i className="fab fa-github"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div>
            <span className="scroll-text">Scroll</span>
          </div>
        </div>
      </div>
      
      <div className="home-services container" data-aos="fade-up">
        <h2 className="section-title">My Expertise</h2>
        <div className="services-grid">
          <div className="service-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="service-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3>Web Development</h3>
            <p>Building responsive applications with Python (Django, Flask), JavaScript (React, TypeScript), and PHP.</p>
          </div>
          
          <div className="service-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="service-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI & Machine Learning</h3>
            <p>Developing intelligent solutions using Hugging Face, NLTK, TensorFlow, and building chatbots and NLP applications.</p>
          </div>
          
          <div className="service-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="service-icon">
              <i className="fas fa-database"></i>
            </div>
            <h3>Full-Stack Solutions</h3>
            <p>Creating end-to-end applications with database integration (MySQL, SQLite) and RESTful APIs.</p>
          </div>
        </div>
      </div>

      <div className="home-skills container" data-aos="fade-up">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-container">
          <div className="skill-category" data-aos="fade-right" data-aos-delay="100">
            <h3><i className="fas fa-code"></i> Languages & Frameworks</h3>
            <div className="skill-pills">
              <span>Python</span>
              <span>Django</span>
              <span>Flask</span>
              <span>HTML/CSS</span>
              <span>Bootstrap</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>TypeScript</span>
              <span>PHP</span>
            </div>
          </div>
          
          <div className="skill-category" data-aos="fade-right" data-aos-delay="200">
            <h3><i className="fas fa-brain"></i> Machine Learning & AI</h3>
            <div className="skill-pills">
              <span>Hugging Face</span>
              <span>NLTK</span>
              <span>TensorFlow</span>
              <span>Keras</span>
              <span>Scikit-learn</span>
              <span>OpenCV</span>
              <span>Mediapipe</span>
              <span>NLP</span>
            </div>
          </div>
          
          <div className="skill-category" data-aos="fade-right" data-aos-delay="300">
            <h3><i className="fas fa-tools"></i> Tools & Platforms</h3>
            <div className="skill-pills">
              <span>Git</span>
              <span>GitHub</span>
              <span>VS Code</span>
              <span>Jupyter</span>
              <span>Hugging Face Hub</span>
              <span>MySQL</span>
              <span>SQLite</span>
              <span>RESTful APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 