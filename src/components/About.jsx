import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaLaptopCode, FaServer, FaMobileAlt } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { name: "Flutter", level: 95 },
    { name: "Python", level: 90 },
    { name: "Rust", level: 80 },
    { name: "C++", level: 85 },
    { name: "JavaScript", level: 75 },
    { name: "MySQL", level: 80 },
    { name: "HTML/CSS", level: 85 },
    { name: "React", level: 70 },
  ];

  const services = [
    {
      icon: <FaLaptopCode />,
      title: "App Development",
      description: "Cross-platform mobile applications with Flutter, focusing on performance and usability."
    },
    {
      icon: <FaCode />,
      title: "Software Development",
      description: "Custom desktop applications and tools using Python, C++, and Rust."
    },
    {
      icon: <FaServer />,
      title: "Backend Systems",
      description: "Robust server-side applications with database integration."
    },
    {
      icon: <FaMobileAlt />,
      title: "UI/UX Design",
      description: "Intuitive user interfaces with modern design principles."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <motion.div 
            className="about-image"
            style={{ y, opacity }}
          >
            <img src="/assets/profile.jpg" alt="Parth R. Katke" />
          </motion.div>
          
          <motion.div className="about-text">
            <motion.h2 
              className="about-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About Me
            </motion.h2>
            
            <motion.p
              className="about-paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              I am a passionate software developer with expertise in various technologies including Flutter, Python, Rust, and more. I enjoy creating efficient and user-friendly applications that solve real-world problems.
            </motion.p>
            
            <motion.p
              className="about-paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              With a strong foundation in both front-end and back-end development, I strive to build seamless and intuitive digital experiences that meet client needs and exceed user expectations.
            </motion.p>
            
            <motion.div 
              className="skills"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h3 className="skills-title">Skills & Technologies</h3>
              <div className="skill-tags">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="skill-tag" 
                    variants={itemVariants}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="services-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="services-title">What I Do</h2>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="service-card"
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;