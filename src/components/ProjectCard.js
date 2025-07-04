import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    },
     exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3, ease: "easeIn" }
     }
  };

  const hoverOverlayVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.4 } }
  };

  const contentVariants = {
    rest: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4, staggerChildren: 0.1 } }
  };

  const tagVariants = {
    rest: { opacity: 0.7 },
    hover: { scale: 1.05, opacity: 1 }
  };

  const iconButtonVariants = {
     hover: { scale: 1.1, color: 'var(--primary-glow)'},
     tap: { scale: 0.9 }
  }

  return (
    <motion.div
      className="project-card glass-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      layout
    >
      <div className="project-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />
        <motion.div
          className="project-hover-overlay"
          variants={hoverOverlayVariants}
          initial="rest"
        >
          <motion.div className="project-links" variants={contentVariants}>
             {project.demoUrl && project.demoUrl !== "#" && (
                 <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    aria-label={`Live demo of ${project.title}`}
                    variants={iconButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                 >
                    <FaExternalLinkAlt />
                 </motion.a>
             )}
             {project.codeUrl && project.codeUrl !== "#" && (
                 <motion.a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    aria-label={`Source code for ${project.title}`}
                    variants={iconButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                 >
                    <FaGithub />
                 </motion.a>
             )}
          </motion.div>
        </motion.div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <motion.span
              key={index}
              className="project-tag"
              variants={tagVariants}
              initial="rest"
              style={{
                 backgroundColor: project.color ? `${project.color}20` : 'rgba(0, 162, 255, 0.1)',
                 color: project.color || 'var(--primary-accent)',
                 borderColor: project.color ? `${project.color}50` : 'rgba(0, 162, 255, 0.3)'
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;