import React, { useState, useEffect, useRef } from 'react';
import './CertificateCarousel.css';

interface Certificate {
  id: number;
  title: string;
  image: string;
  issuer: string;
  date: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

const CertificateCarousel: React.FC<CertificateCarouselProps> = ({ certificates }) => {
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
      setCurrentIndex((prevIndex) => (prevIndex === certificates.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? certificates.length - 1 : prevIndex - 1));
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

  if (certificates.length === 0) {
    return <div className="no-certificates">No certificates available</div>;
  }

  return (
    <div 
      className="certificate-carousel"
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
          aria-label="Previous certificate"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="carousel-track-container">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {certificates.map((certificate) => (
              <div key={certificate.id} className="carousel-slide">
                <div className="certificate-card">
                  <div className="certificate-image-container">
                    <img 
                      src={certificate.image} 
                      alt={`${certificate.title} Certificate`} 
                      className="certificate-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="certificate-info">
                    <h3>{certificate.title}</h3>
                    <p><strong>Issuer:</strong> {certificate.issuer}</p>
                    <p><strong>Date:</strong> {certificate.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="carousel-button next-button" 
          onClick={nextSlide}
          aria-label="Next certificate"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="carousel-indicators">
        {certificates.map((_, index) => (
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

export default CertificateCarousel; 