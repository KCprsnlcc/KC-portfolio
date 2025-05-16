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
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      
      // Create a form data object with all needed values including recaptcha
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: currentTime,
        to_email: 'kcpersonalacc@gmail.com',
        'g-recaptcha-response': recaptchaValue
      };
      
      // Debug info
      console.log('Sending with credentials:', {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey ? 
          `${EMAILJS_CONFIG.publicKey.substring(0, 4)}...` : 'undefined',
        recaptcha: recaptchaValue ? 'Verified' : 'Not verified'
      });
      
      // Use EmailJS to send the form directly with templateParams instead of form element
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setSuccess(true);
        setFormSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
        setRecaptchaValue(null);
        
        // Reset form submitted state after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          setSuccess(false);
        }, 5000);
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
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-header" data-aos="fade-up">
        <h1 className="section-title">Get in Touch</h1>
        <p className="contact-intro">
          Have a question or want to collaborate on a project? Reach out below!
        </p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info" data-aos="fade-right" data-aos-delay="100">
          {[
            {
              icon: "fas fa-map-marker-alt",
              title: "Location",
              content: "Zamboanga City, Philippines",
              link: null
            },
            {
              icon: "fas fa-envelope",
              title: "Email",
              content: "kcpersonalacc@gmail.com",
              link: "mailto:kcpersonalacc@gmail.com"
            },
            {
              icon: "fas fa-phone",
              title: "Phone",
              content: "+639949953785",
              link: "tel:+639949953785"
            },
            {
              icon: "fas fa-globe",
              title: "Social Profiles",
              content: null,
              social: [
                { icon: "fab fa-github", url: "https://github.com/KCprsnlcc", label: "GitHub" },
                { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/khadaffe-s-232199194/", label: "LinkedIn" },
                { icon: "fab fa-facebook", url: "https://web.facebook.com/Daff.Sulaiman/", label: "Facebook" },
                { icon: "fab fa-facebook-messenger", url: "https://m.me/Daff.Sulaiman?hash=AbYeTuN-aK38D32O&source=qr_link_share", label: "Messenger" }
              ]
            }
          ].map((item, index) => (
            <div 
              className="info-card" 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={100 + index * 50}
              onMouseMove={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <h2><i className={item.icon}></i> {item.title}</h2>
              {item.content && (
                <p>
                  {item.link ? (
                    <a href={item.link} className="link-hover">
                      {item.content}
                    </a>
                  ) : (
                    item.content
                  )}
                </p>
              )}
              {item.social && (
            <div className="social-links">
                  {item.social.map((social, idx) => (
                    <a 
                      href={social.url} 
                      key={idx} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={social.label}
                      className="social-link-hover"
                    >
                      <i className={social.icon}></i>
              </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div 
          className={`contact-form-container ${formSubmitted ? 'form-submitted' : ''}`} 
          data-aos="fade-left" 
          data-aos-delay="200"
        >
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
            
            {['name', 'email', 'message'].map((field, index) => (
              <div 
                className="form-group" 
                key={field}
                data-aos="fade-up" 
                data-aos-delay={200 + index * 50}
              >
                <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    name={field}
                    rows={5}
                    value={formData[field as keyof FormData]}
                onChange={handleChange}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
                    className="input-field"
                  ></textarea>
                ) : (
              <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                onChange={handleChange}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
                    className="input-field"
              />
                )}
            </div>
            ))}
            
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
            <div 
              className="recaptcha-container"
              data-aos="fade-up" 
              data-aos-delay="350"
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading || !recaptchaValue}
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              <span className="btn-text">
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
              </span>
              <span className="btn-shine"></span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 