import React, { useState, useEffect, useRef } from 'react';
import './HackathonCarousel.css';

export interface Hackathon {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
}

interface HackathonCarouselProps {
  hackathons: Hackathon[];
}

const HackathonCarousel: React.FC<HackathonCarouselProps> = ({ hackathons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<Hackathon | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === hackathons.length - 1 ? 0 : prevIndex + 1));
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        const nextIndex = currentIndex === hackathons.length - 1 ? 0 : currentIndex + 1;
        setFullScreenImage(hackathons[nextIndex]);
      }
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? hackathons.length - 1 : prevIndex - 1));
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        const prevIndex = currentIndex === 0 ? hackathons.length - 1 : currentIndex - 1;
        setFullScreenImage(hackathons[prevIndex]);
      }
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      
      // Update full screen image if in full screen mode
      if (isFullScreen) {
        setFullScreenImage(hackathons[index]);
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
  const openFullScreen = (hackathon: Hackathon) => {
    setFullScreenImage(hackathon);
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

  if (hackathons.length === 0) {
    return <div className="no-hackathons">No hackathons available</div>;
  }

  return (
    <>
      <div 
        className="hackathon-carousel"
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
            aria-label="Previous hackathon"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="carousel-track-container">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="carousel-slide">
                  <div className="hackathon-card">
                    <div 
                      className="hackathon-image-container"
                      onClick={() => openFullScreen(hackathon)}
                    >
                      <img 
                        src={hackathon.image} 
                        alt={`${hackathon.title}`} 
                        className="hackathon-image"
                        loading="lazy"
                      />
                      <div className="fullscreen-hint">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                    <div className="hackathon-info">
                      <h3>{hackathon.title}</h3>
                      <p className="hackathon-date">{hackathon.date}</p>
                      <p className="hackathon-description">{hackathon.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="carousel-button next-button" 
            onClick={nextSlide}
            aria-label="Next hackathon"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {hackathons.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Full Screen Preview */}
      {isFullScreen && fullScreenImage && (
        <div className="fullscreen-preview">
          <div className="fullscreen-overlay" onClick={closeFullScreen}></div>
          <div className="fullscreen-content">
            <button 
              className="fullscreen-close" 
              onClick={closeFullScreen}
              aria-label="Close fullscreen preview"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="fullscreen-image-container">
              <img 
                src={fullScreenImage.image} 
                alt={`${fullScreenImage.title}`} 
                className="fullscreen-image"
              />
            </div>
            
            <div className="fullscreen-info">
              <h2>{fullScreenImage.title}</h2>
              <p className="fullscreen-date">{fullScreenImage.date}</p>
              <p className="fullscreen-description">{fullScreenImage.description}</p>
            </div>
            
            <button 
              className="fullscreen-nav prev-button" 
              onClick={prevSlide}
              aria-label="Previous hackathon"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className="fullscreen-nav next-button" 
              onClick={nextSlide}
              aria-label="Next hackathon"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            <div className="fullscreen-indicators">
              {hackathons.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HackathonCarousel; 