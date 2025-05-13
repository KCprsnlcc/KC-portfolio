import React from 'react';
import './Blog.css';
import UnderConstruction from '../components/UnderConstruction';

const Blog: React.FC = () => {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header" data-aos="fade-up">
          <h1 className="section-title">Blog</h1>
        </div>
        
        <div data-aos="fade-up">
          <UnderConstruction 
            title="Blog Coming Soon" 
            message="Our blog section is currently being built." 
            additionalMessage="Check back soon for articles on tech, projects, and hackathons!"
          />
        </div>
      </div>
    </section>
  );
};

export default Blog; 