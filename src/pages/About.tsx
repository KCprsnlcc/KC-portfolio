import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-header" data-aos="fade-up">
          <h1 className="section-title">About Me</h1>
        </div>
        
        <div className="about-content">
          <div className="about-text" data-aos="fade-right" data-aos-delay="100">
            <h2><i className="fas fa-user"></i> Who I Am</h2>
            <p>
              I am a software developer and AI enthusiast from Zamboanga City, Philippines. I graduated from Pilar College of Zamboanga City, Inc. with a Bachelor of Science in Information Technology (BSIT). My passion lies in building intelligent applications that solve real-world problems.
            </p>
            <p>
              I work on a variety of projects including web applications, machine learning models, and chatbots using tools like Python, Django, Hugging Face, and NLTK. I enjoy the process of turning ideas into working systems that help people tackle their challenges effectively.
            </p>
            
            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            <div className="education-item">
              <h3>Bachelor of Science in Information Technology</h3>
              <p>Pilar College of Zamboanga City, Inc.</p>
            </div>
            
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
            <p>View my complete certification collection: <a href="https://github.com/KCprsnlcc/Certificates" target="_blank" rel="noopener noreferrer">GitHub Certificates Repository</a></p>
            
            <h2><i className="fas fa-trophy"></i> Hackathons & Conferences</h2>
            <ul className="event-list">
              <li>
                <strong>Hack4Gov Cyber Challenge 2023</strong>
                <p>Participated in national-level exercises focused on digital security and forensic analysis.</p>
              </li>
              <li>
                <strong>BlueCode Hackathon</strong>
                <p>Developed a functional prototype addressing real-time data visualization.</p>
              </li>
              <li>
                <strong>Google I/O Extended 2023 & 2024</strong>
                <p>Participated in Google-led workshops on open-source technologies and development tooling.</p>
              </li>
            </ul>
          </div>
          
          <div className="about-experience" data-aos="fade-left" data-aos-delay="200">
            <div className="experience-card">
              <h2><i className="fas fa-briefcase"></i> Professional Interests</h2>
              <p>
                I focus on building scalable systems that utilize machine learning and intelligent automation to solve real-world challenges. My work reflects a balance between academic rigor and practical development. I'm particularly interested in:
              </p>
              <ul>
                <li>Full-stack web development with Django and React</li>
                <li>Natural Language Processing applications</li>
                <li>Time-series forecasting models</li>
                <li>Computer vision and emotion analysis</li>
                <li>AI-powered chatbots and assistants</li>
              </ul>
            </div>
            
            <div className="experience-card">
              <h2><i className="fas fa-code"></i> Technical Skills</h2>
              <div className="skills-categories">
                <div className="skill-category">
                  <h3>Languages & Frameworks</h3>
                  <div className="skills-list">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Django</span>
                    <span className="skill-tag">Flask</span>
                    <span className="skill-tag">HTML/CSS</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">PHP</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h3>Machine Learning & AI</h3>
                  <div className="skills-list">
                    <span className="skill-tag">Hugging Face</span>
                    <span className="skill-tag">NLTK</span>
                    <span className="skill-tag">TensorFlow</span>
                    <span className="skill-tag">Scikit-learn</span>
                    <span className="skill-tag">Keras</span>
                    <span className="skill-tag">ARIMA</span>
                    <span className="skill-tag">Prophet</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h3>Tools & Platforms</h3>
                  <div className="skills-list">
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">GitHub</span>
                    <span className="skill-tag">VS Code</span>
                    <span className="skill-tag">Jupyter</span>
                    <span className="skill-tag">MySQL</span>
                    <span className="skill-tag">SQLite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 