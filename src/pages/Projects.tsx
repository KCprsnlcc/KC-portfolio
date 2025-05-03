import React from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'Test2',
      tags: ['Test', 'Demo'],
    },  
    {
      id: 2,
      title: 'Project Two',
      description: 'Test2',
      tags: ['Test', 'Demo'],
    },  
  ];

  return (
    <section className="projects-section">
      <div className="projects-container">
        <h1>My Projects</h1>
        <p className="projects-intro">Here are some of the projects I've worked on.</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span className="project-tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 