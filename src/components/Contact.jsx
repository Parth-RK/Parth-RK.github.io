import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    try {
      // Replace this with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-description">
              I'm interested in freelance opportunities, collaborations, and discussing innovative ideas. 
              Feel free to reach out if you have any questions or just want to say hi!
            </p>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <i className='bx bx-map contact-info-icon'></i>
                <div>
                  <h3 className="contact-info-label">Location</h3>
                  <span className="contact-info-value">Toronto, Canada</span>
                </div>
              </div>
              
              <div className="contact-info-item">
                <i className='bx bx-envelope contact-info-icon'></i>
                <div>
                  <h3 className="contact-info-label">Email</h3>
                  <span className="contact-info-value">contact@parthkumar.dev</span>
                </div>
              </div>
              
              <div className="contact-info-item">
                <i className='bx bxl-linkedin-square contact-info-icon'></i>
                <div>
                  <h3 className="contact-info-label">LinkedIn</h3>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-info-value">linkedin.com/in/yourprofile</a>
                </div>
              </div>
            </div>
            
            <div className="contact-social">
              <a href="https://github.com/Parth-RK" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <i className='bx bxl-github'></i>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <i className='bx bxl-twitter'></i>
              </a>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-status">
                {submitStatus === 'success' && (
                  <div className="success-message">
                    <i className='bx bx-check-circle message-icon'></i> Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="error-message">
                    <i className='bx bx-error-circle message-icon'></i> Something went wrong. Please try again.
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="Your Email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message" 
                  className="form-control" 
                  placeholder="Your Message" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-icon"></span>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
