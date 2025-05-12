import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

declare global {
  interface Window {
    particlesJS: any;
    Typed: any;
    gsap: any;
  }
}

const Home: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize particles background
    if (typeof window.particlesJS !== 'undefined') {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    // Initialize typing effect
    if (typedRef.current && typeof window.Typed !== 'undefined') {
      const typed = new window.Typed(typedRef.current, {
        strings: ['Software Developer', 'AI Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });
      
      return () => {
        typed.destroy();
      };
    }

    // Initialize GSAP animations for skills
    if (typeof window.gsap !== 'undefined' && skillsRef.current) {
      const skillPills = skillsRef.current.querySelectorAll('.skill-pills span');
      
      window.gsap.from(skillPills, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, []);

  // Interactive card hover effect
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (x - centerX) / centerX * 10;
    const tiltY = (y - centerY) / centerY * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'all 0.5s ease';
  };

  return (
    <section className="home-section">
      <div className="hero-container">
        <div id="particles-js" className="particles-container"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate__animated animate__fadeInLeft">
              <h1 className="hero-title">Hi, I'm <span className="highlight">Khadaffe</span></h1>
              <h2 className="hero-subtitle">I'm a <span ref={typedRef}></span></h2>
              <p className="hero-description">
                I specialize in building intelligent applications, from web apps and ML projects to chatbots using Python, Django, React, and AI tools.
              </p>
              <div className="hero-buttons">
                <Link to="/projects" className="btn btn-primary btn-glow">
                  <i className="fas fa-code"></i> View My Work
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-glow">
                  <i className="fas fa-paper-plane"></i> Get in Touch
                </Link>
              </div>
            </div>
            <div className="hero-image animate__animated animate__fadeInRight">
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
        
        <div className="scroll-indicator animate__animated animate__fadeIn animate__delay-1s">
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
          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="100"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3>Web Development</h3>
            <p>Building responsive applications with Python (Django, Flask), JavaScript (React, TypeScript), and PHP.</p>
          </div>
          
          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="200"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI & Machine Learning</h3>
            <p>Developing intelligent solutions using Hugging Face, NLTK, TensorFlow, and building chatbots and NLP applications.</p>
          </div>
          
          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="300"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fas fa-database"></i>
            </div>
            <h3>Full-Stack Solutions</h3>
            <p>Creating end-to-end applications with database integration (MySQL, SQLite) and RESTful APIs.</p>
          </div>
        </div>
      </div>

      <div className="home-skills container" data-aos="fade-up" ref={skillsRef}>
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-container">
          <div className="skill-category" data-aos="fade-right" data-aos-delay="100">
            <h3><i className="fas fa-code"></i> Languages & Frameworks</h3>
            <div className="skill-pills">
              <span className="interactive-pill">Python</span>
              <span className="interactive-pill">Django</span>
              <span className="interactive-pill">Flask</span>
              <span className="interactive-pill">HTML/CSS</span>
              <span className="interactive-pill">Bootstrap</span>
              <span className="interactive-pill">JavaScript</span>
              <span className="interactive-pill">React</span>
              <span className="interactive-pill">TypeScript</span>
              <span className="interactive-pill">PHP</span>
            </div>
          </div>
          
          <div className="skill-category" data-aos="fade-right" data-aos-delay="200">
            <h3><i className="fas fa-brain"></i> Machine Learning & AI</h3>
            <div className="skill-pills">
              <span className="interactive-pill">Hugging Face</span>
              <span className="interactive-pill">NLTK</span>
              <span className="interactive-pill">TensorFlow</span>
              <span className="interactive-pill">Keras</span>
              <span className="interactive-pill">Scikit-learn</span>
              <span className="interactive-pill">OpenCV</span>
              <span className="interactive-pill">Mediapipe</span>
              <span className="interactive-pill">NLP</span>
            </div>
          </div>
          
          <div className="skill-category" data-aos="fade-right" data-aos-delay="300">
            <h3><i className="fas fa-tools"></i> Tools & Platforms</h3>
            <div className="skill-pills">
              <span className="interactive-pill">Git</span>
              <span className="interactive-pill">GitHub</span>
              <span className="interactive-pill">VS Code</span>
              <span className="interactive-pill">Jupyter</span>
              <span className="interactive-pill">Hugging Face Hub</span>
              <span className="interactive-pill">MySQL</span>
              <span className="interactive-pill">SQLite</span>
              <span className="interactive-pill">RESTful APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 