import React, { useEffect, useRef } from 'react';
import './About.css';
import CertificateCarousel from '../components/CertificateCarousel';
import HackathonCarousel from '../components/HackathonCarousel';
import { certificates } from '../data/certificates';
import { hackathons } from '../data/hackathons';

declare global {
  interface Window {
    gsap: any;
  }
}

const About: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize GSAP animations for skills
    if (typeof window.gsap !== 'undefined' && skillsRef.current) {
      const skillTags = skillsRef.current.querySelectorAll('.skill-tag');
      
      window.gsap.from(skillTags, {
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
    <section className="about-section">
      <div className="container">
        <div className="about-header" data-aos="fade-up">
          <h1 className="section-title">About Me</h1>
        </div>
        
        <div className="about-content">
          <div className="about-card" data-aos="fade-up" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-user"></i> Who I Am</h2>
            <p>
              I am a software developer and AI enthusiast from Zamboanga City, Philippines. I graduated from Pilar College of Zamboanga City, Inc. with a Bachelor of Science in Information Technology (BSIT). My passion lies in building intelligent applications that solve real-world problems.
            </p>
            <p>
              I work on a variety of projects including web applications, machine learning models, and chatbots using tools like Python, Django, Hugging Face, and NLTK. I enjoy the process of turning ideas into working systems that help people tackle their challenges effectively.
            </p>
          </div>
          
          <div className="about-card" data-aos="fade-up" data-aos-delay="100" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-briefcase"></i> Professional Interests</h2>
            <p>
              I focus on building scalable systems that utilize machine learning and intelligent automation to solve real-world challenges. My work reflects a balance between academic rigor and practical development. I'm particularly interested in:
            </p>
            <ul className="interests-list">
              <li className="interest-item">Full-stack web development with Django and React</li>
              <li className="interest-item">Natural Language Processing applications</li>
              <li className="interest-item">Time-series forecasting models</li>
              <li className="interest-item">Computer vision and emotion analysis</li>
              <li className="interest-item">AI-powered chatbots and assistants</li>
            </ul>
          </div>
          
          <div className="about-card" data-aos="fade-up" data-aos-delay="150" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-award"></i> Certifications</h2>
            <p>
              I continuously expand my knowledge through professional development and certifications in various disciplines including:
            </p>
            <ul className="certification-list">
              <li>Software Development (Python, Django, PHP)</li>
              <li>Machine Learning and AI (ML with Python, NLP, Data Analytics)</li>
              <li>Cybersecurity (Ethical Hacking, Threat Mitigation)</li>
              <li>Digital Skills & Strategy</li>
            </ul>
            <p>View my complete certification collection: <a href="https://github.com/KCprsnlcc/Certificates" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub Certificates Repository</a></p>
            
            {/* Certificate Carousel */}
            <div className="certificate-showcase" data-aos="fade-up">
              <h3>Featured Certificates</h3>
              <CertificateCarousel certificates={certificates} />
            </div>
          </div>
          
          <div className="about-card" data-aos="fade-up" data-aos-delay="200" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-trophy"></i> Hackathons & Conferences</h2>
            <p>
              I actively participate in tech events to stay connected with the developer community and challenge myself with new problems. These experiences help me grow as a developer and expand my network.
            </p>
            <ul className="event-list">
            <li> Hack4Gov Cyber Challenge 2023: A National-level cybersecurity exercises focused on digital security and forensic analysis.</li>
            <li> BlueCode Hackathon '25: Developed a functional prototype addressing real-time data visualization challenges.</li>
            <li> Google I/O Extended 2023 & 2024: Attended Google-led workshops on open-source technologies and development tooling.</li>
            </ul>
            <p>View my complete hackathon & conference experiences: <a href="#" target="_blank" rel="noopener noreferrer" className="link-hover">Blog Section</a></p>
            
            {/* Hackathon Carousel */}
            <div className="hackathon-showcase" data-aos="fade-up">
              <h3>Featured Events</h3>
              <HackathonCarousel hackathons={hackathons} />
            </div>
          </div>
           
          <div className="about-card" data-aos="fade-up" data-aos-delay="250" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            <div className="education-timeline">
              <div className="education-item">
                <h3>Bachelor of Science in Information Technology</h3>
                <span className="education-date">2021 - 2025</span>
                <p>Pilar College of Zamboanga City, Inc.</p>
                <div className="achievement">
                  <span className="achievement-title">Dean's Lister - First Year, First Semester</span>
                  <p>Achieved academic excellence with a GPA in the top percentile of the class.</p>
                </div>
                <div className="achievement">
                  <span className="achievement-title">Dean's Lister - First Year, Second Semester</span>
                  <p>Maintained outstanding academic performance throughout the first year.</p>
                </div>
                <div className="achievement">
                  <span className="achievement-title">Dean's Lister - Second Year, First Semester</span>
                  <p>Continued academic excellence with high marks in core IT subjects.</p>
                </div>
                <div className="achievement">
                  <span className="achievement-title">Dean's Lister - Second Year, Second Semester</span>
                  <p>Recognized for consistent top performance in programming and systems analysis courses.</p>
                </div>
              </div>
              <div className="education-item">
                <h3>Senior High School - STEM Track</h3>
                <span className="education-date">2017 - 2019</span>
                <p>Brent Hospital Colleges & Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 