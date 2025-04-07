import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaLaptopCode, FaServer, FaMobileAlt, FaBrain, FaPalette } from 'react-icons/fa'; // Added more relevant icons
import '../styles/About.css';

const About = () => {
  const sectionRef = useRef(null);
  // Trigger animation slightly earlier/more often
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Parallax for image (subtle)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Animate throughout visibility
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Slower movement
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]); // Fade background element

  const skills = [
    { name: "Flutter", level: 95, icon: FaMobileAlt },
    { name: "Python", level: 90, icon: FaCode },
    { name: "Rust", level: 80, icon: FaCode }, // Consider a specific Rust icon if available
    { name: "C++", level: 85, icon: FaCode },
    { name: "JavaScript", level: 75, icon: FaCode },
    { name: "MySQL", level: 80, icon: FaServer },
    { name: "React", level: 70, icon: FaLaptopCode },
    { name: "HTML/CSS", level: 85, icon: FaPalette }, // Use Palette for design aspects
    { name: "UI/UX", level: 70, icon: FaPalette }, // Add UI/UX skill
    { name: "Machine Learning", level: 65, icon: FaBrain }, // Add ML skill
  ];

  const services = [
    {
      icon: <FaLaptopCode />,
      title: "App Development",
      description: "Cross-platform mobile apps (Flutter) focused on performance and intuitive UX."
    },
    {
      icon: <FaCode />,
      title: "Software Engineering",
      description: "Custom desktop applications and robust systems using Python, C++, and Rust."
    },
    {
      icon: <FaServer />,
      title: "Backend & Databases",
      description: "Scalable server-side logic and efficient database management (MySQL)."
    },
     {
      icon: <FaPalette />, // Combined UI/UX design service
      title: "UI/UX Design",
      description: "Crafting engaging user interfaces with modern design principles."
    }
  ];

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const textContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

   const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 }
     }
  };

  const skillsContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
        scale: 1.1,
        color: "var(--primary-glow)",
        backgroundColor: "rgba(0, 246, 255, 0.15)",
        boxShadow: "0 0 10px var(--shadow-color)",
        transition: { duration: 0.2 }
    }
  };

   const servicesTitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } // Delay after main content
    }
  };

   const serviceCardVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" }
     },
     hover: {
        y: -10,
        // Handled by .glass-card:hover in App.css for background/border
        transition: { duration: 0.3 }
     }
  };


  return (
    <motion.section
        id="about"
        className="about-section"
        ref={sectionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
    >
      {/* Subtle animated background element */}
      <motion.div
        className="about-background-shape"
        style={{ opacity: backgroundOpacity }}
      />

      <div className="container about-container">
        <div className="about-grid">
          {/* Image Column */}
          <motion.div className="about-image-wrapper" variants={imageVariants}>
            <motion.img
                src="/assets/profile.jpg" // Make sure this path is correct (relative to public folder)
                alt="Parth R. Katke"
                className="about-image"
                style={{ y: imageY }} // Apply parallax
                whileHover={{ scale: 1.05, filter: "brightness(1.1)"}}
                transition={{duration: 0.3}}
             />
          </motion.div>

          {/* Text Content Column */}
          <motion.div className="about-text-content glass-card" variants={textContentVariants}>
            <h2 className="about-title section-subtitle">
              Who <span className="highlight">I Am</span>
            </h2>

            <p className="about-paragraph">
              I'm a passionate and versatile software developer driven by the challenge of building efficient, user-centric applications that tackle real-world problems. My journey involves diving into topics like AI, CyberSecurity, Automation, and more.
            </p>

            <p className="about-paragraph">
            With a strong foundation in artificial intelligence, cybersecurity, and automation, I specialize in developing innovative solutions that not only address complex challenges but also deliver meaningful impact and efficiency to users and organizations.
            </p>

            {/* Skills Section */}
            <div className="skills-section">
              <h3 className="skills-title">Core Technologies</h3>
              <motion.div
                className="skills-grid"
                variants={skillsContainerVariants}
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    variants={skillItemVariants}
                    whileHover="hover"
                  >
                    <span className="skill-icon">{skill.icon && <skill.icon />}</span>
                    <span className="skill-name">{skill.name}</span>
                     {/*Add level indicator*/}
                     {/* <span className="skill-level">{skill.level}%</span> */}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Services Section */}
        <motion.div className="services-section" variants={sectionVariants}>
          <motion.h2 className="services-title section-subtitle" variants={servicesTitleVariants}>
            What <span className="highlight">I Offer</span>
          </motion.h2>

          <motion.div className="services-grid" variants={skillsContainerVariants}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card glass-card"
                variants={serviceCardVariants}
                whileHover="hover"
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;