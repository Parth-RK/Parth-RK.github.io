import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaGithub, FaLinkedin, FaSpinner } from 'react-icons/fa';
import { MdSend, MdCheckCircle, MdError } from 'react-icons/md';
import '../styles/Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Form Data Submitted:", formData);

      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const formVariants = {
     hidden: { opacity: 0, scale: 0.9 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  }

   const inputFocusVariants = {
     focus: {
        borderColor: "var(--primary-glow)",
        boxShadow: "0 0 10px var(--shadow-color)",
        transition: { duration: 0.2 }
     },
     rest: {
         borderColor: "var(--border-color)",
         boxShadow: "none",
         transition: { duration: 0.2 }
     }
   }

   const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px var(--shadow-color)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
    submitting: {
        opacity: 0.6,
      
    }
   }

   const statusMessageVariants = {
       hidden: { opacity: 0, height: 0, marginTop: 0, y: -10 },
       visible: { opacity: 1, height: 'auto', marginTop: 'var(--space-4)', y: 0, transition: { duration: 0.3 } },
       exit: { opacity: 0, height: 0, marginTop: 0, y: -10, transition: { duration: 0.3 } }
   }

  return (
    <motion.section
        id="contact"
        className="contact-section"
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
    >
      <div className="container contact-container">
        <motion.h2 className="contact-title section-title" variants={itemVariants}>
          Get In <span className="highlight">Touch</span>
        </motion.h2>

        <div className="contact-grid">
          {/* Contact Info Side */}
          <motion.div className="contact-info glass-card" variants={itemVariants}>
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-description">
              Interested in collaborating, freelance opportunities, or just want to chat about tech? Feel free to reach out!
            </p>

            <ul className="contact-details-list">
              <motion.li className="contact-detail-item" whileHover={{x: 5}} transition={{duration: 0.2}}>
                <FaMapMarkerAlt className="contact-detail-icon" />
                <span className="contact-detail-text">Nanded, Bharat</span>
              </motion.li>
              <motion.li className="contact-detail-item" whileHover={{x: 5}} transition={{duration: 0.2}}>
                <FaGithub className="contact-detail-icon" />
                <a href="https://github.com/Parth-RK" target="_blank" rel="noopener noreferrer" className="contact-detail-link">
                  github.com/Parth-RK
                </a>
              </motion.li>
              <motion.li className="contact-detail-item" whileHover={{x: 5}} transition={{duration: 0.2}}>
                <FaLinkedin className="contact-detail-icon" />
                <a href="https://linkedin.com/in/Parth-RK" target="_blank" rel="noopener noreferrer" className="contact-detail-link">
                  linkedin.com/in/Parth-RK
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div className="contact-form-wrapper glass-card" variants={formVariants}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-status-container">
                    <AnimatePresence>
                        {submitStatus === 'success' && (
                        <motion.div
                            className="form-status-message success"
                            variants={statusMessageVariants} initial="hidden" animate="visible" exit="exit"
                            role="alert"
                        >
                            <MdCheckCircle className="status-icon" /> Message sent successfully! I'll get back to you soon.
                        </motion.div>
                        )}
                        {submitStatus === 'error' && (
                        <motion.div
                            className="form-status-message error"
                            variants={statusMessageVariants} initial="hidden" animate="visible" exit="exit"
                            role="alert"
                        >
                            <MdError className="status-icon" /> Oops! Something went wrong. Please try again later.
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>

              {/* Name Input */}
              <motion.div className="form-group" variants={itemVariants}>
                <motion.input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  initial="rest"
                  aria-label="Your Name"
                />
                 <label htmlFor="name" className="form-label">Your Name</label>
              </motion.div>

              {/* Email Input */}
              <motion.div className="form-group" variants={itemVariants}>
                <motion.input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  initial="rest"
                  aria-label="Your Email"
                />
                <label htmlFor="email" className="form-label">Your Email</label>
              </motion.div>

              {/* Message Textarea */}
              <motion.div className="form-group" variants={itemVariants}>
                <motion.textarea
                  name="message"
                  id="message"
                  className="form-control"
                  placeholder=" "
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  initial="rest"
                  aria-label="Your Message"
                ></motion.textarea>
                 <label htmlFor="message" className="form-label">Your Message</label>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                variants={buttonVariants}
                whileHover={!isSubmitting ? "hover" : ""}
                whileTap={!isSubmitting ? "tap" : ""}
                animate={isSubmitting ? "submitting" : "rest"}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSpinner />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <MdSend className="send-icon" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;