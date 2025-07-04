import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Projects.css';
import ScrollToTop from '../components/ScrollToTop';
import { Project, projects, featuredProject } from '../data/projects';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [projectCarouselStates, setProjectCarouselStates] = useState<{ [key: number]: number }>({});
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [featuredImageIndex, setFeaturedImageIndex] = useState<number>(0);
  const [shareMessage, setShareMessage] = useState<string>('');
  
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
    card.style.transform = 'scale3d(1.05, 1.05, 1.05)';
    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  };
  
  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale3d(1, 1, 1)';
    card.style.boxShadow = '';
    card.style.transition = 'all 0.5s ease';
  };

  const changeFeaturedImage = (index: number) => {
    setFeaturedImageIndex(index);
  };

  // Share project function
  const shareProject = (project: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const shareData = {
      title: `${project.title} - Khadaffe's Portfolio`,
      text: `Check out ${project.title}: ${project.description.substring(0, 100)}...`,
      url: project.liveUrl || project.github || window.location.href
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      // Web Share API is supported
      navigator.share(shareData)
        .then(() => setShareMessage('Shared successfully!'))
        .catch((error) => {
          console.error('Error sharing:', error);
          setShareMessage('');
        });
    } else {
      // Fallback: Copy to clipboard
      const shareUrl = project.liveUrl || project.github || window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setShareMessage('Link copied to clipboard!');
          setTimeout(() => setShareMessage(''), 2000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
          setShareMessage('');
        });
    }
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
                <button className="preview-btn btn btn-glow" onClick={() => openPreview(featuredProject)}>
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
              <div className="project-links featured-links hero-buttons">
                {featuredProject.github && (
                  <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-glow">
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {featuredProject.liveUrl && (
                  <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                <button onClick={(e) => shareProject(featuredProject, e)} className="btn btn-tertiary btn-glow">
                  <i className="fas fa-share-alt"></i> Share
                </button>
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
                  <button className="preview-btn btn btn-glow" onClick={() => openPreview(project)}>
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
              <div className="project-links hero-buttons">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-glow btn-sm">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow btn-sm">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                <button onClick={(e) => shareProject(project, e)} className="btn btn-tertiary btn-glow btn-sm">
                  <i className="fas fa-share-alt"></i> Share
                </button>
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
                    className="carousel-nav prev btn btn-glow" 
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    className="carousel-nav next btn btn-glow" 
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
              <div className="preview-links hero-buttons">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-glow"
                  >
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-glow"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                <button 
                  onClick={(e) => shareProject(selectedProject, e)} 
                  className="btn btn-tertiary btn-glow"
                >
                  <i className="fas fa-share-alt"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ScrollToTop />
      {shareMessage && (
        <div className="share-message">
          <p>{shareMessage}</p>
        </div>
      )}
    </section>
  );
};

export default Projects; 