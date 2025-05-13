import React, { useState, useEffect, useRef } from 'react';
import './ExperienceCarousel.css';

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  duration: string;
  description: string;
  image: string;
}

interface ExpCarouselProps {
  experiences: Experience[];
}

const ExpCarousel: React.FC<ExpCarouselProps> = ({ experiences }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<Experience | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === experiences.length - 1 ? 0 : prevIndex + 1));
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        const nextIndex = currentIndex === experiences.length - 1 ? 0 : currentIndex + 1;
        setFullScreenImage(experiences[nextIndex]);
      }
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? experiences.length - 1 : prevIndex - 1));
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        const prevIndex = currentIndex === 0 ? experiences.length - 1 : currentIndex - 1;
        setFullScreenImage(experiences[prevIndex]);
      }
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        setFullScreenImage(experiences[index]);
      }
    }
  };

  // Handle touch events for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    
    // Clear auto-play when user interacts
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    
    if (isRightSwipe) {
      prevSlide();
    }
    
    // Restart auto-play after interaction
    startAutoPlay();
  };

  // Reset transition state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition time

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-advance slides
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };
  
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Pause auto-play when user hovers over carousel
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };
  
  const handleMouseLeave = () => {
    startAutoPlay();
  };

  // Open full screen preview
  const openFullScreen = (experience: Experience) => {
    setFullScreenImage(experience);
    setIsFullScreen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen
    
    // Pause auto-play when in full screen
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };
  
  // Close full screen preview
  const closeFullScreen = () => {
    setIsFullScreen(false);
    document.body.style.overflow = ''; // Restore scrolling
    startAutoPlay();
  };

  // Handle keyboard navigation in fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;
      
      if (e.key === 'Escape') {
        closeFullScreen();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, currentIndex]);

  if (experiences.length === 0) {
    return <div className="no-experiences">No experiences available</div>;
  }

  return (
    <>
      <div 
        className="experience-carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="carousel-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button 
            className="carousel-button prev-button" 
            onClick={prevSlide}
            aria-label="Previous experience"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="carousel-track-container">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experiences.map((experience) => (
                <div key={experience.id} className="carousel-slide">
                  <div className="experience-card">
                    <div 
                      className="experience-image-container"
                      onClick={() => openFullScreen(experience)}
                    >
                      <img 
                        src={experience.image} 
                        alt={`${experience.title} at ${experience.company}`} 
                        className="experience-image"
                        loading="lazy"
                      />
                      <div className="fullscreen-hint">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                    <div className="experience-info">
                      <h3>{experience.title}</h3>
                      <p className="experience-company">{experience.company} · {experience.type}</p>
                      <p className="experience-period">{experience.period} · {experience.duration}</p>
                      <p className="experience-location">{experience.location}</p>
                      <p className="experience-description">{experience.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="carousel-button next-button" 
            onClick={nextSlide}
            aria-label="Next experience"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {experiences.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Full Screen Modal */}
      {isFullScreen && fullScreenImage && (
        <div className="fullscreen-modal" onClick={closeFullScreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeFullScreen}>
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={fullScreenImage.image} 
              alt={`${fullScreenImage.title} at ${fullScreenImage.company}`} 
              className="fullscreen-image"
            />
            <div className="fullscreen-info">
              <h3>{fullScreenImage.title}</h3>
              <p>{fullScreenImage.company} · {fullScreenImage.type}</p>
              <p>{fullScreenImage.period} · {fullScreenImage.duration}</p>
              <p>{fullScreenImage.description}</p>
            </div>
            <div className="fullscreen-navigation">
              <button 
                className="nav-button prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className="nav-button next" 
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpCarousel; 