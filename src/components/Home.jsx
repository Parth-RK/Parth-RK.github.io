import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import '../styles/Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Add scroll effect for animation triggering
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the top of the page
      if (window.scrollY < 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Initialize visibility 
    setIsVisible(true);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 2.5,
      },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 2.2, duration: 0.6 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(255, 0, 13, 0.5)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <motion.div 
          className="home-text"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.span className="hero-greeting" variants={itemVariants}>
            Hi, Welcome! I'm
          </motion.span>
          
          <motion.h1 className="hero-name" variants={itemVariants}>
            Parth R. Katke
          </motion.h1>
          
          <motion.div className="hero-subtitle" variants={itemVariants}>
            <div className="hero-roles">
              <span>A Software Developer</span>
            </div>
          </motion.div>
          
          <motion.p className="hero-description" variants={itemVariants}>
            I specialize in creating responsive web applications and mobile solutions
            with a focus on clean code, performance, and exceptional user experience.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.a
              href="/resume.pdf"
              download
              className="cta-button"
              variants={buttonVariants}
              initial="initial"
              animate={isVisible ? "animate" : "initial"}
              whileHover="hover"
              whileTap="tap"
            >
              DOWNLOAD CV
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="social-links"
            variants={socialVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.a 
              href="https://github.com/Parth-RK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              variants={socialItemVariants}
              whileHover={{ scale: 1.2, color: "#ff000d" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/parth-rk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              variants={socialItemVariants}
              whileHover={{ scale: 1.2, color: "#ff000d" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="mailto:katkeparth@gmail.com"
              className="social-link"
              variants={socialItemVariants}
              whileHover={{ scale: 1.2, color: "#ff000d" }}
              whileTap={{ scale: 0.9 }}
            >
              <MdEmail />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;