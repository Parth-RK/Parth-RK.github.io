import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AnimatedTextCharacter } from './AnimatedText'; // Import the component
import '../styles/Home.css';

const Home = () => {

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2.0, // Start after header animation
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

   const buttonVariants = {
     hidden: { opacity: 0, scale: 0.8 },
     visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95]}
     },
     hover: {
        scale: 1.05,
        borderRadius: "calc(var(--border-radius-md) + 10px)",
        boxShadow: "0 0 20px var(--shadow-color)",
        background: "linear-gradient(90deg, var(--secondary-accent) 0%, var(--primary-accent) 100%)",
        transition: { duration: 0.3 }
     },
     tap: { scale: 0.95 }
  };

  const socialLinksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 } // Stagger after other items
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.2, color: "var(--primary-glow)", transition: { duration: 0.2 } },
    tap: { scale: 0.9 }
  };

  const scrollIndicatorVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 3.5, duration: 0.8, ease: "easeOut" }
     },
     animate: {
        y: [0, 10, 0], // Bouncing effect
        transition: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
     }
  }

  return (
    <section id="home" className="home-section">
      {/* Optional: Add subtle gradient overlay specific to home */}
      <div className="home-gradient-overlay"></div>

      <div className="container home-container">
        <motion.div
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Greeting */}
          <motion.div variants={itemVariants} className="hero-greeting-wrapper">
             <AnimatedTextCharacter text="Hi, Welcome! I'm" className="hero-greeting-animation" stagger={0.03} delay={0} />
          </motion.div>

          {/* Animated Name */}
           <motion.h1 className="hero-name" variants={itemVariants}>
              <AnimatedTextCharacter text="Parth R. Katke" className="hero-name-animation" stagger={0.04} delay={0.3} />
           </motion.h1>

          {/* Subtitle */}
          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            A <span className="highlight">Software Developer</span>
          </motion.h2>

          {/* Description */}
          <motion.p className="hero-description" variants={itemVariants}>
            I specialize in creating responsive web applications and robust mobile solutions
            with a focus on clean code, performance, and exceptional user experiences.
          </motion.p>

          {/* CTA Button */}
           <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
             <motion.a
                href="/assets/resume.pdf"
                download="Parth_Katke_Resume.pdf"
                className="cta-button"
                aria-label="Download Resume"
             >
                Download CV
             </motion.a>
           </motion.div>


          {/* Social Links */}
          <motion.div
            className="social-links"
            variants={socialLinksVariants}
          >
            <motion.a
              href="https://github.com/Parth-RK"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/parth-rk"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:katkeparth@gmail.com"
              className="social-link"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Send Email"
            >
              <MdEmail />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

       {/* Animated Scroll Down Indicator */}
        <motion.a href="#about" className="scroll-indicator"
            variants={scrollIndicatorVariants}
            initial="hidden"
            animate={["visible", "animate"]} // Apply both visibility and bounce
            aria-label="Scroll down to About section"
        >
            <FaArrowDown />
        </motion.a>

    </section>
  );
};

export default Home;