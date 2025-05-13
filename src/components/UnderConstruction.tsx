import React, { useEffect, useRef } from 'react';
import './UnderConstruction.css';

interface UnderConstructionProps {
  title?: string;
  message?: string;
  additionalMessage?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title = "Under Construction",
  message = "This section is currently being built.",
  additionalMessage = "Check back soon for exciting content!"
}) => {
  const constructionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP animations if available
    if (typeof window.gsap !== 'undefined' && constructionRef.current) {
      const tl = window.gsap.timeline({ repeat: -1, yoyo: true });
      
      // Animate the gear icons
      tl.to('.gear-icon', {
        rotation: 360,
        duration: 8,
        ease: 'linear',
        stagger: 0.2,
        repeat: -1,
      }, 0);
      
      // Animate the text
      tl.to('.construction-text span', {
        y: -10,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0);
      
      tl.to('.construction-text span', {
        y: 0,
        opacity: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.in',
      }, 1);
    }
  }, []);

  return (
    <div className="construction-container" ref={constructionRef}>
      <div className="construction-animation">
        <div className="gear-container">
          <i className="fas fa-cog gear-icon gear-left"></i>
          <i className="fas fa-cog gear-icon gear-right"></i>
        </div>
        
        <div className="construction-text">
          {Array.from(title).map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        
        <div className="construction-subtext">
          <p>{message}</p>
          {additionalMessage && <p>{additionalMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction; 