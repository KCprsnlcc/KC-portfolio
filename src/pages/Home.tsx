import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ScrollToTop from '../components/ScrollToTop';

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
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  
  // Handle CV download with loading state
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDownloading) {
      e.preventDefault();
      return;
    }
    
    setIsDownloading(true);
    // Reset download state after a timeout (in case download doesn't trigger properly)
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };
  
  useEffect(() => {
    // Add listener for actual download completion
    const handleBeforeUnload = () => {
      if (isDownloading) {
        setIsDownloading(false);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDownloading]);
  
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
    card.style.transform = 'scale3d(1.05, 1.05, 1.05)';
    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  };
  
  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale3d(1, 1, 1)';
    card.style.boxShadow = '';
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
                <a 
                  href="/assets/Khadaffe Sulaiman - CV (2025).pdf" 
                  download 
                  className={`btn btn-cv btn-glow ${isDownloading ? 'is-loading' : ''}`}
                  onClick={handleDownload}
                >
                  {isDownloading ? (
                    <>
                      <div className="btn-loader"></div> Download CV
                    </>
                  ) : (
                    <>
                  <i className="fas fa-download"></i> Download CV
                    </>
                  )}
                </a>
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
              <i className="fa-solid fa-code"></i>
            </div>
            <h3>Web Development</h3>
            <p>Building responsive web applications with Python (Django, Flask), JavaScript (React, TypeScript), and PHP.</p>
          </div>
          
          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="200"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fa-solid fa-microchip"></i>
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
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <h3>Desktop Development</h3>
            <p>Creating powerful desktop applications using Python with PyQt/Tkinter, providing native-like experiences across platforms.</p>
          </div>
          
          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="400"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <h3>Full-Stack Solutions</h3>
            <p>Creating end-to-end applications with database integration (PostgreSQL, MySQL, SQLite) and RESTful APIs.</p>
          </div>

          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="500"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fa-solid fa-gear"></i>
            </div>
            <h3>IT Support</h3>
            <p>Providing software support including system formatting, maintenance, driver updates, software installation, and troubleshooting.</p>
          </div>

          <div 
            className="service-card" 
            data-aos="zoom-in" 
            data-aos-delay="600"
            onMouseMove={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="service-icon">
              <i className="fa-solid fa-plug"></i>
            </div>
            <h3>API Integrations</h3>
            <p>Integrating third-party APIs and services, building custom API solutions, and implementing webhooks for automated workflows.</p>
          </div>
        </div>
      </div>

      <div className="home-skills container" data-aos="fade-up" ref={skillsRef}>
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-rows">
          {/* Row 1: Languages & Frameworks */}
          <div className="skills-scroll-container">
            <div className="skill-category">
              <div className="skill-category-header">
                <i className="fas fa-code"></i>
                <span>Languages & Frameworks</span>
              </div>
              <p className="skill-category-description">Building applications with modern technologies</p>
            </div>
            <div className="skills-scroll">
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/python/python-original.svg" alt="Python" /> Python</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/django/django-plain.svg" alt="Django" /> Django</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/flask/flask-original.svg" alt="Flask" /> Flask</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/html5/html5-original.svg" alt="HTML5" /> HTML</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/css3/css3-original.svg" alt="CSS3" /> CSS</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" /> Tailwind CSS</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" /> Bootstrap</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/javascript/javascript-original.svg" alt="JavaScript" /> JavaScript</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/react/react-original.svg" alt="React" /> React</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/typescript/typescript-original.svg" alt="TypeScript" /> TypeScript</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/nodejs/nodejs-original.svg" alt="Node.js" /> Node.js</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/php/php-original.svg" alt="PHP" /> PHP</div>
              {/* Duplicate items for loop */}
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/python/python-original.svg" alt="Python" /> Python</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/django/django-plain.svg" alt="Django" /> Django</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/flask/flask-original.svg" alt="Flask" /> Flask</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/html5/html5-original.svg" alt="HTML5" /> HTML</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/css3/css3-original.svg" alt="CSS3" /> CSS</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" /> Tailwind CSS</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" /> Bootstrap</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/javascript/javascript-original.svg" alt="JavaScript" /> JavaScript</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/react/react-original.svg" alt="React" /> React</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/typescript/typescript-original.svg" alt="TypeScript" /> TypeScript</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/nodejs/nodejs-original.svg" alt="Node.js" /> Node.js</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/php/php-original.svg" alt="PHP" /> PHP</div>
            </div>
          </div>

          {/* Row 2: Machine Learning & AI */}
          <div className="skills-scroll-container reverse">
            <div className="skill-category">
              <div className="skill-category-header">
                <i className="fas fa-brain"></i>
                <span>Machine Learning & AI</span>
              </div>
              <p className="skill-category-description">Creating intelligent systems and data-driven solutions</p>
            </div>
            <div className="skills-scroll">
              <div className="skill-item"><img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" /> Hugging Face</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pandas/pandas-original.svg" alt="Pandas" /> Pandas</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /> TensorFlow</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pytorch/pytorch-original.svg" alt="PyTorch" /> PyTorch</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/keras/keras-original.svg" alt="Keras" /> Keras</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" /> Scikit-learn</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/opencv/opencv-original.svg" alt="OpenCV" /> OpenCV</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/numpy/numpy-original.svg" alt="Mediapipe" /> Mediapipe</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" /> Matplotlib</div>
              {/* Duplicate items for loop */}
              <div className="skill-item"><img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" /> Hugging Face</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pandas/pandas-original.svg" alt="Pandas" /> Pandas</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /> TensorFlow</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pytorch/pytorch-original.svg" alt="PyTorch" /> PyTorch</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/keras/keras-original.svg" alt="Keras" /> Keras</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" /> Scikit-learn</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/opencv/opencv-original.svg" alt="OpenCV" /> OpenCV</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/numpy/numpy-original.svg" alt="Mediapipe" /> Mediapipe</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" /> Matplotlib</div>
            </div>
          </div>

          {/* Row 3: Tools & Platforms */}
          <div className="skills-scroll-container">
            <div className="skill-category">
              <div className="skill-category-header">
                <i className="fas fa-tools"></i>
                <span>Tools & Platforms</span>
              </div>
              <p className="skill-category-description">Essential tools for development, version control, and databases</p>
            </div>
            <div className="skills-scroll">
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/git/git-original.svg" alt="Git" /> Git</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/github/github-original.svg" alt="GitHub" /> GitHub</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/vscode/vscode-original.svg" alt="VS Code" /> VS Code</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pycharm/pycharm-original.svg" alt="PyCharm" /> PyCharm</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" alt="Supabase" /> Supabase</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/apache/apache-original.svg" alt="Apache" /> Apache</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/vercel/vercel-original.svg" alt="Vercel" /> Vercel</div>
              <div className="skill-item"><img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face Hub" /> Hugging Face Hub</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" /> PostgreSQL</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/mysql/mysql-original.svg" alt="MySQL" /> MySQL</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/sqlite/sqlite-original.svg" alt="SQLite" /> SQLite</div>
              {/* Duplicate items for loop */}
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/git/git-original.svg" alt="Git" /> Git</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/github/github-original.svg" alt="GitHub" /> GitHub</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/vscode/vscode-original.svg" alt="VS Code" /> VS Code</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/pycharm/pycharm-original.svg" alt="PyCharm" /> PyCharm</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" alt="Supabase" /> Supabase</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/apache/apache-original.svg" alt="Apache" /> Apache</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/vercel/vercel-original.svg" alt="Vercel" /> Vercel</div>
              <div className="skill-item"><img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face Hub" /> Hugging Face Hub</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" /> PostgreSQL</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/mysql/mysql-original.svg" alt="MySQL" /> MySQL</div>
              <div className="skill-item"><img src="https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/sqlite/sqlite-original.svg" alt="SQLite" /> SQLite</div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};

export default Home; 