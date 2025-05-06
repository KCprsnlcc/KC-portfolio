import React, { useState } from 'react';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thanks for your message! This is a demo, so no message was actually sent.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-header" data-aos="fade-up">
        <h1 className="section-title">Get in Touch</h1>
        <p className="contact-intro">
          Have a question or want to collaborate on a project? Feel free to reach out!
        </p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info" data-aos="fade-right" data-aos-delay="100">
          <div className="info-card">
            <h2><i className="fas fa-map-marker-alt"></i> Location</h2>
            <p>Zamboanga City, Philippines</p>
          </div>
          
          <div className="info-card">
            <h2><i className="fas fa-envelope"></i> Email</h2>
            <p><a href="mailto:kcpersonalacc@gmail.com">kcpersonalacc@gmail.com</a></p>
          </div>
          
          <div className="info-card">
            <h2><i className="fas fa-phone"></i> Phone</h2>
            <p><a href="tel:+639949953785">+639949953785</a></p>
          </div>
          
          <div className="info-card">
            <h2><i className="fas fa-globe"></i> Social Profiles</h2>
            <div className="social-links">
              <a href="https://github.com/KCprsnlcc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/khadaffe-s-232199194/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://web.facebook.com/Daff.Sulaiman/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://m.me/Daff.Sulaiman?hash=AbYeTuN-aK38D32O&source=qr_link_share" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
                <i className="fab fa-facebook-messenger"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container" data-aos="fade-left" data-aos-delay="200">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 