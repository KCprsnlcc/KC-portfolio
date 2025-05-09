import React, { useState } from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  image: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Forecast',
      description: 'A Python-based platform that applies time-series models such as ARIMA and Prophet to generate transaction forecasts, model artifacts, and visual analytics.',
      tags: ['Python', 'Time-Series', 'ARIMA', 'Prophet', 'Data Analytics'],
      github: 'https://github.com/KCprsnlcc/AI-Forecast',
      image: '/images/projects/ai-forecast.jpg'
    },  
    {
      id: 2,
      title: 'PilarEaseDJO',
      description: 'A Django web application integrating emotion analysis, sentiment-aware dashboards, user authentication, chatbot responses, and tweet classification.',
      tags: ['Django', 'Python', 'Sentiment Analysis', 'NLP', 'Web App'],
      github: 'https://github.com/KCprsnlcc/PilarEaseDJO',
      image: '/images/projects/pilareasedjo.jpg'
    },
    {
      id: 3,
      title: 'File Manager',
      description: 'A basic cross-platform file manager built with PySide6. Supports file browsing, search, image preview, and basic file operations.',
      tags: ['File Manager', 'Desktop App', 'Python', 'PySide6', 'File Management'],
      github: 'https://github.com/KCprsnlcc/File-Manager',
      image: '/images/projects/filemanager.jpg'
    },
    {
      id: 4,
      title: 'WebcamEmotionMusicPlayer',
      description: 'An experimental project that classifies facial emotions from webcam input and matches them with curated music tracks.',
      tags: ['Computer Vision', 'Emotion Analysis', 'Python', 'OpenCV', 'MediaPipe'],
      github: 'https://github.com/KCprsnlcc/WebcamEmotionMusicPlayer',
      image: '/images/projects/webcam-emotion.jpg'
    },
    {
      id: 5,
      title: 'DTR Calculator',
      description: 'A productivity tool for recording daily time logs, computing deductions, and summarizing attendance-based performance.',
      tags: ['Productivity', 'Time Management', 'Python', 'Calculator', 'Tkinter'],
      github: 'https://github.com/KCprsnlcc/DTR-Calculator',
      image: '/images/projects/dtr-calculator.jpg'
    },
    {
      id: 6,
      title: 'AI Chatbot',
      description: 'AI-powered chatbot using TensorFlow.js for intent recognition, running entirely in the browser with no server-side dependencies.',
      tags: ['TensorFlow.js', 'NLP', 'Front-end', 'Chatbot', 'Typescript', 'React'],
      github: 'https://github.com/KCprsnlcc/chatbot-app',
      image: '/images/projects/ai-chatbot.jpg'
    }
  ];

  const openPreview = (project: Project) => {
    setSelectedProject(project);
  };

  const closePreview = () => {
    setSelectedProject(null);
  };

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
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={`${project.title} screenshot`} 
                  className="project-image"
                  onClick={() => openPreview(project)}
                />
                <div className="project-image-overlay">
                  <button className="preview-btn" onClick={() => openPreview(project)}>
                    <i className="fas fa-search-plus"></i> Preview
                  </button>
                </div>
              </div>
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

      {selectedProject && (
        <div className="image-preview-overlay" onClick={closePreview}>
          <div className="image-preview-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-preview" onClick={closePreview}>
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={selectedProject.image} 
              alt={`${selectedProject.title} screenshot`} 
              className="preview-image"
            />
            <div className="preview-details">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects; 