import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import './Contact.css';

// IMPORTANT: Replace these values with your actual EmailJS credentials
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service (e.g., Gmail, Outlook)
// 3. Create an email template
// 4. Get your public key from Account > API Keys
const EMAILJS_CONFIG = {
  serviceId: 'service_alfqbgb',  
  templateId: 'template_l75hs2v', 
  publicKey: 'vl-PwUUHY2QzZDlfj'  
};

// reCAPTCHA site key - you need to generate a new valid site key
// Go to: https://www.google.com/recaptcha/admin
// Choose "reCAPTCHA v2" and "I'm not a robot" Checkbox
// Add your domain and get a new site key
const RECAPTCHA_SITE_KEY = '6Le40jArAAAAAFt9IWRGr6AcwKQscv353-sn41N9';

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Format current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    setCurrentTime(`${formattedDate} at ${formattedTime}`);
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate reCAPTCHA
    if (!recaptchaValue) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Update the time when sending the form
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(`${formattedDate} at ${formattedTime}`);
      
      // Prepare form data with reCAPTCHA
      if (formRef.current) {
        // Add recaptcha value to form data
        const recaptchaInput = document.createElement('input');
        recaptchaInput.type = 'hidden';
        recaptchaInput.name = 'g-recaptcha-response';
        recaptchaInput.value = recaptchaValue;
        formRef.current.appendChild(recaptchaInput);
      }
      
      // Debug info
      console.log('Sending with credentials:', {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey ? 
          `${EMAILJS_CONFIG.publicKey.substring(0, 4)}...` : 'undefined',
        formRef: formRef.current ? 'Form element exists' : 'No form element',
        recaptcha: recaptchaValue ? 'Verified' : 'Not verified'
      });
      
      // Use EmailJS to send the form
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current!,
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
        setRecaptchaValue(null);
        
        // Remove the temporary recaptcha input
        if (formRef.current) {
          const recaptchaInput = formRef.current.querySelector('input[name="g-recaptcha-response"]');
          if (recaptchaInput) {
            formRef.current.removeChild(recaptchaInput);
          }
        }
      } else {
        throw new Error(`Failed to send message: Status ${result.status}`);
      }
    } catch (err: any) {
      console.error('Error sending email:', err);
      // More detailed error message
      const errorMessage = err.text || err.message || 'Failed to send your message. Please try again later.';
      setError(`Error: ${errorMessage}`);
      
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    } finally {
      setLoading(false);
      
      // Clean up the temporary input if it exists
      if (formRef.current) {
        const recaptchaInput = formRef.current.querySelector('input[name="g-recaptcha-response"]');
        if (recaptchaInput) {
          formRef.current.removeChild(recaptchaInput);
        }
      }
    }
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
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            {success && (
              <div className="form-status success">
                <i className="fas fa-check-circle"></i> Your message has been sent successfully!
              </div>
            )}
            
            {error && (
              <div className="form-status error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}
            
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
            
            {/* Hidden inputs */}
            <input 
              type="hidden" 
              name="to_email" 
              value="kcpersonalacc@gmail.com" 
            />
            
            <input 
              type="hidden" 
              name="time" 
              value={currentTime} 
            />
            
            {/* Google reCAPTCHA */}
            <div className="recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading || !recaptchaValue}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 