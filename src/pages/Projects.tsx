import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
  images: string[];
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [projectCarouselStates, setProjectCarouselStates] = useState<{ [key: number]: number }>({});
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [featuredImageIndex, setFeaturedImageIndex] = useState<number>(0);
  
  // Define the featured project
  const featuredProject: Project = {
    id: 2,
    title: 'PilarEaseDJO',
    description: 'A Django web application integrating emotion analysis, sentiment-aware dashboards, user authentication, chatbot responses, and tweet classification. This emotional platform was designed to enhance student support services through AI-powered sentiment analysis and interactive data visualization. The system provides administrators with real-time insights into student feedback and emotional trends, enabling more responsive and personalized support.',
    tags: ['Django', 'Python', 'Sentiment Analysis', 'NLP', 'Web App', 'Data Visualization', 'Authentication', 'NLTK', 'PostgreSQL'],
    github: 'https://github.com/KCprsnlcc/PilarEaseDJO',
    liveUrl: 'https://pilarease-demo.netlify.app',
    images: [
      '/images/projects/pilareasedjo.jpg',
      '/images/projects/pilareasedjo-1.jpg',
      '/images/projects/pilareasedjo-2.jpg',
      '/images/projects/pilareasedjo-3.jpg',
      '/images/projects/pilareasedjo-4.jpg'
    ]
  };
  
  const projects: Project[] = [
    {
      id: 6,
      title: 'AI Chatbot',
      description: 'AI-powered chatbot using TensorFlow.js for intent recognition, running entirely in the browser with no server-side dependencies.',
      tags: ['TensorFlow.js', 'NLP', 'Front-end', 'Chatbot', 'Typescript', 'React'],
      github: 'https://github.com/KCprsnlcc/chatbot-app',
      liveUrl: 'https://chatbot-app-beryl-six.vercel.app/',
      images: [
        '/images/projects/ai-chatbot.jpg',
        '/images/projects/ai-chatbot-1.jpg',
        '/images/projects/ai-chatbot-2.jpg'
      ]
    },
    {
      id: 1,
      title: 'AI-Forecast',
      description: 'A Python-based platform that applies time-series models such as ARIMA and Prophet to generate transaction forecasts, model artifacts, and visual analytics.',
      tags: ['Python', 'Time-Series', 'PySide6', 'ARIMA', 'Prophet', 'Data Analytics'],
      github: 'https://github.com/KCprsnlcc/AI-Forecast',
      liveUrl: 'https://ai-forecast-demo.herokuapp.com',
      images: [
        '/images/projects/ai-forecast.jpg',
        '/images/projects/ai-forecast-1.jpg',
        '/images/projects/ai-forecast-2.jpg'
      ]
    },
    {
      id: 5,
      title: 'DTR Calculator',
      description: 'A productivity tool for recording daily time logs, computing deductions, and summarizing attendance-based performance.',
      tags: ['Productivity', 'Time Management', 'Python', 'Calculator', 'Tkinter'],
      github: 'https://github.com/KCprsnlcc/DTR-Calculator',
      liveUrl: 'https://github.com/KCprsnlcc/DTR-Calculator/releases',
      images: [
        '/images/projects/dtr-calculator.jpg',
        '/images/projects/dtr-calculator-1.jpg',
        '/images/projects/dtr-calculator-2.jpg'
      ]
    },
    {
      id: 3,
      title: 'File Manager',
      description: 'A basic cross-platform file manager built with PySide6. Supports file browsing, search, image preview, and basic file operations.',
      tags: ['File Manager', 'Desktop App', 'Python', 'PySide6', 'File Management'],
      github: 'https://github.com/KCprsnlcc/File-Manager',
      liveUrl: 'https://github.com/KCprsnlcc/File-Manager/releases',
      images: [
        '/images/projects/filemanager.jpg',
        '/images/projects/filemanager-1.jpg',
        '/images/projects/filemanager-2.jpg'
      ]
    },
    {
      id: 4,
      title: 'Webcam Emotion Music Player',
      description: 'An experimental project that classifies facial emotions from webcam input and matches them with curated music tracks.',
      tags: ['Computer Vision', 'Emotion Analysis', 'Python', 'OpenCV', 'MediaPipe'],
      github: 'https://github.com/KCprsnlcc/WebcamEmotionMusicPlayer',
      liveUrl: 'https://github.com/KCprsnlcc/WebcamEmotionMusicPlayer/releases',
      images: [
        '/images/projects/webcam-emotion.jpg',
        '/images/projects/webcam-emotion-1.jpg',
        '/images/projects/webcam-emotion-2.jpg'
      ]
    }
  ];
  
  // Filter out the featured project from the regular projects list
  const regularProjects = projects.filter(project => project.id !== featuredProject.id);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-rotate featured project images
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedImageIndex(prevIndex => 
        (prevIndex + 1) % featuredProject.images.length
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredProject.images.length]);
  
  // Prevent body scrolling when preview is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // Reset current image index when a new project is selected
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      switch (e.key) {
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'Escape':
          closePreview();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  // Initialize project carousel states
  useEffect(() => {
    const initialStates: { [key: number]: number } = {};
    regularProjects.forEach(project => {
      initialStates[project.id] = 0;
    });
    setProjectCarouselStates(initialStates);

    // Auto-rotate images in project cards
    const interval = setInterval(() => {
      setProjectCarouselStates(prevStates => {
        const newStates = { ...prevStates };
        regularProjects.forEach(project => {
          const currentIndex = prevStates[project.id] || 0;
          newStates[project.id] = (currentIndex + 1) % project.images.length;
        });
        return newStates;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [regularProjects]);

  const openPreview = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closePreview = () => {
    setSelectedProject(null);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!selectedProject) return;
    
    const minSwipeDistance = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const setProjectImage = (projectId: number, index: number) => {
    setProjectCarouselStates(prev => ({
      ...prev,
      [projectId]: index
    }));
  };

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

  const changeFeaturedImage = (index: number) => {
    setFeaturedImageIndex(index);
  };

  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-header" data-aos="fade-up">
          <h1 className="section-title">My Projects</h1>
          <p className="projects-intro">Showcasing my work in software development, AI, and machine learning.</p>
        </div>
        
        {/* Featured Project */}
        <div className="featured-project" data-aos="fade-up">
          <h2 className="featured-label">Featured Project</h2>
          <div className="featured-project-content">
            <div className="featured-project-image-container">
              <div className="featured-project-carousel">
                {featuredProject.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${featuredProject.title} screenshot ${index + 1}`} 
                    className={`featured-project-image ${index === featuredImageIndex ? 'active' : ''}`}
                    onClick={() => openPreview(featuredProject)}
                    loading="lazy"
                  />
                ))}
                <div className="featured-project-indicators">
                  {featuredProject.images.map((_, index) => (
                    <span 
                      key={index} 
                      className={`indicator ${index === featuredImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeFeaturedImage(index);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                          changeFeaturedImage(index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Show image ${index + 1} of project ${featuredProject.title}`}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="featured-project-overlay">
                <button className="preview-btn" onClick={() => openPreview(featuredProject)}>
                  <i className="fas fa-search-plus"></i> Preview
                </button>
              </div>
            </div>
            <div className="featured-project-details">
              <h2>{featuredProject.title}</h2>
              <p>{featuredProject.description}</p>
              <div className="project-tags featured-tags">
                {featuredProject.tags.map((tag, index) => (
                  <span className="project-tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links featured-links">
                {featuredProject.github && (
                  <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="project-link link-hover">
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {featuredProject.liveUrl && (
                  <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live-link link-hover">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="other-projects-title" data-aos="fade-up">Other Projects</h2>
        
        <div className="projects-grid">
          {regularProjects.map((project) => (
            <div 
              className="project-card" 
              key={project.id} 
              data-aos="fade-up" 
              data-aos-delay={project.id * 100}
              onMouseMove={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="project-image-container">
                <div className="project-carousel">
                  {project.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${project.title} screenshot ${index + 1}`} 
                      className={`project-image ${index === (projectCarouselStates[project.id] || 0) ? 'active' : ''}`}
                      onClick={() => openPreview(project)}
                      loading="lazy"
                    />
                  ))}
                  {project.images.length > 1 && (
                    <div className="project-image-indicators">
                      {project.images.map((_, index) => (
                        <span 
                          key={index} 
                          className={`indicator ${index === (projectCarouselStates[project.id] || 0) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjectImage(project.id, index);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                              setProjectImage(project.id, index);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`Show image ${index + 1} of project ${project.title}`}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
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
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link link-hover">
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live-link link-hover">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="image-preview-overlay" onClick={closePreview}>
          <div 
            className={`image-preview-container ${isMobile ? 'mobile-preview' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-preview" 
              onClick={closePreview}
              aria-label="Close preview"
            >
              <i className="fas fa-times"></i>
            </button>

            <div 
              className="preview-carousel" 
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={selectedProject.images[currentImageIndex]} 
                alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`} 
                className="preview-image"
                loading="eager"
              />
              
              {selectedProject.images.length > 1 && (
                <>
                  <button 
                    className="carousel-nav prev" 
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    className="carousel-nav next" 
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  
                  <div className="carousel-indicators">
                    {selectedProject.images.map((_, index) => (
                      <button 
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                        onKeyPress={(e) => e.key === 'Enter' && goToImage(index)}
                        aria-label={`Go to image ${index + 1}`}
                        tabIndex={0}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="preview-details">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              <div className="preview-links">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link preview-link link-hover"
                  >
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link preview-link live-link link-hover"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects; 