import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.4 } }
  };

  const contentVariants = {
    rest: { opacity: 0.9, y: 10 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const tagVariants = {
    hover: (i) => ({
      scale: 1.05,
      transition: { delay: i * 0.05 }
    })
  };

  const buttonVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: { 
      scale: 1.1, 
      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="project-card"
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      style={{ 
        borderColor: project.color,
        boxShadow: `0 4px 20px ${project.color}30`
      }}
    >
      <div className="project-image">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          variants={imageVariants}
        />
      </div>
      
      <motion.div 
        className="project-content" 
        variants={contentVariants}
      >
        <h3 className="project-title" style={{ color: project.color }}>
          {project.title}
        </h3>
        
        <div className="project-tech">
          {project.tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="tech-tag" 
              style={{ backgroundColor: `${project.color}20`, color: project.color }}
              custom={index}
              variants={tagVariants}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <p className="project-description">{project.description}</p>
        
        <div className="project-links">
          <motion.a 
            href="#" 
            className="demo-link project-link" 
            variants={buttonVariants}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-external-link-alt"></i> Demo
          </motion.a>
          <motion.a 
            href="#"
            className="code-link project-link"
            variants={buttonVariants}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-github"></i> Code
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;