import React from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Forecast',
      description: 'A Python-based platform that applies time-series models such as ARIMA and Prophet to generate transaction forecasts, model artifacts, and visual analytics.',
      tags: ['Python', 'Time-Series', 'ARIMA', 'Prophet', 'Data Analytics'],
      github: 'https://github.com/KCprsnlcc'
    },  
    {
      id: 2,
      title: 'PilarEaseDJO',
      description: 'A Django web application integrating emotion analysis, sentiment-aware dashboards, user authentication, chatbot responses, and tweet classification.',
      tags: ['Django', 'Python', 'Sentiment Analysis', 'NLP', 'Web App'],
      github: 'https://github.com/KCprsnlcc'
    },
    {
      id: 3,
      title: 'ExpenseMate',
      description: 'A budget management desktop application that helps users visualize spending trends and maintain financial discipline.',
      tags: ['Finance', 'Desktop App', 'Data Visualization'],
      github: 'https://github.com/KCprsnlcc'
    },
    {
      id: 4,
      title: 'WebcamEmotionMusicPlayer',
      description: 'An experimental project that classifies facial emotions from webcam input and matches them with curated music tracks.',
      tags: ['Computer Vision', 'Emotion Analysis', 'OpenCV', 'MediaPipe'],
      github: 'https://github.com/KCprsnlcc'
    },
    {
      id: 5,
      title: 'DTR-Calculator',
      description: 'A productivity tool for recording daily time logs, computing deductions, and summarizing attendance-based performance.',
      tags: ['Productivity', 'Time Management', 'Calculator'],
      github: 'https://github.com/KCprsnlcc'
    },
    {
      id: 6,
      title: 'AI Chatbot',
      description: 'AI-powered chatbot using TensorFlow.js for intent recognition, running entirely in the browser with no server-side dependencies.',
      tags: ['TensorFlow.js', 'NLP', 'Front-end', 'Chatbot'],
      github: 'https://github.com/KCprsnlcc'
    }
  ];

  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-header" data-aos="fade-up">
          <h1 className="section-title">My Projects</h1>
          <p className="projects-intro">Showcasing my work in software development, AI, and machine learning.</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id} data-aos="fade-up" data-aos-delay={project.id * 100}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span className="project-tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 