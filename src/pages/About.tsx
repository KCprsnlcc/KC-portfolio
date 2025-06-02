import React, { useEffect, useRef } from 'react';
import './About.css';
import CertificateCarousel from '../components/CertificateCarousel';
import HackathonCarousel from '../components/HackathonCarousel';
// import ExperienceCarousel from '../components/ExperienceCarousel';
import ExpCarousel from '../components/ExpCarousel';
import ScrollToTop from '../components/ScrollToTop';
import { certificates } from '../data/certificates';
import { hackathons } from '../data/hackathons';
import { experiences } from '../data/experiences';

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
    // Skip effect if target is inside a carousel or an interactive element
    if (e.target instanceof Element && 
        (e.target.closest('.certificate-carousel') || 
         e.target.closest('.hackathon-carousel') || 
         e.target.closest('.experience-carousel'))) {
      return;
    }
    
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
    <section className="about-section">
      <div className="container">
        <div className="about-header" data-aos="fade-up">
          <h1 className="section-title">About Me</h1>
          <p className="about-intro">Want to know more about me? Follow my journey below!</p>
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
            <h2><i className="fas fa-briefcase"></i> Areas of Interest</h2>
            <p>
              I am keen on developing practical applications and continuously learning in the field of technology. I'm particularly interested in exploring:
            </p>
            <ul className="interests-list">
              <li className="interest-item">Web development, including both front-end and back-end technologies like React and Django.</li>
              <li className="interest-item">Applications of Natural Language Processing.</li>
              <li className="interest-item">Data analysis and time-series forecasting.</li>
              <li className="interest-item">The potential of computer vision, including emotion analysis.</li>
              <li className="interest-item">Building helpful AI-powered chatbots and assistants.</li>
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
            <p>View my complete hackathon & conference experiences: <a href="/blog" className="link-hover">Blog Section</a></p>
            
            {/* Hackathon Carousel */}
            <div className="hackathon-showcase" data-aos="fade-up">
              <h3>Featured Events</h3>
              <HackathonCarousel hackathons={hackathons} />
            </div>
          </div>
          
          <div className="about-card" data-aos="fade-up" data-aos-delay="250" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
            <h2><i className="fas fa-briefcase"></i> Experience</h2>
            <div className="experience-timeline">
              <div className="experience-item">
                <h3>Computer Programmer</h3>
                <span className="experience-date">Dec 2024 - Apr 2025 · 5 mos</span>
                <p>Department of Health (Philippines) · Internship</p>
                <p>Upper Calarian, Zamboanga City, Philippines · On-site</p>
                <ul className="experience-bullets">
                  <li>Developed and enhanced the Employee Management System (EMS) using Django, including modular HR features like Attendance Tracking, Leave Management, Personal Data Sheet (PDS) Management.</li>
                  <li>Developed a custom-built Daily Time Record (DTR) Calculator using Python with Tkinter, enabling automatic computation of Supposed Time-In and Supposed Time-Out based on a formula provided by the Assistant Administrator.</li>
                  <li>Created and maintained database models for employee records and attendance tracking, ensuring data accuracy and consistency. Converted legacy PHP-based modules into Django applications to modernize the system performance.</li>
                  <li>Provided IT support across departments by resolving hardware, network, and software issues, and setting up workstations. Assisted staff during presentations and training sessions, ensuring smooth technical operations.</li>
                  <li>Led requirements gathering sessions with other Interns, documented system specifications, and planned development cycles. Presented system proposals to stakeholders and managed the software development lifecycle from design to testing.</li>
                </ul>
              </div>
            </div>
            
            {/* Experience Carousel - temporarily commented out */}
            <div className="experience-showcase" data-aos="fade-up">
              <h3>Featured Work</h3>
              {/* <ExperienceCarousel experiences={experiences} /> */}
              <ExpCarousel experiences={experiences} />
            </div>
          </div>
           
          <div className="about-card" data-aos="fade-up" data-aos-delay="300" onMouseMove={handleCardHover} onMouseLeave={handleCardLeave}>
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
      <ScrollToTop />
    </section>
  );
};

export default About; 