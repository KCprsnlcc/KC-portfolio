import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1>About Me</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Who I Am</h2>
            <p>
              A tech savvy programmer with a passion for coding and technology. I love to learn new things and solve problems. I am always looking for new challenges and opportunities to grow.
              I have experience in various programming languages and frameworks, and I enjoy working on projects that make a difference. In my free time, I like to read tech blogs, watch coding tutorials, and contribute to open source projects.
            </p>
            
            <h2>My Skills</h2>
            <div className="skills-list">
              <span className="skill-tag">Test1</span>
              <span className="skill-tag">Test2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 