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

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === hackathons.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? hackathons.length - 1 : prevIndex - 1));
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
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

  if (hackathons.length === 0) {
    return <div className="no-hackathons">No hackathons available</div>;
  }

  return (
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
                  <div className="hackathon-image-container">
                    <img 
                      src={hackathon.image} 
                      alt={`${hackathon.title}`} 
                      className="hackathon-image"
                      loading="lazy"
                    />
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
  );
};

export default HackathonCarousel; 