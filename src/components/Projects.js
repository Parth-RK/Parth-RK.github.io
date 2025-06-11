import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Simplified filters for demo
  const filters = ["All", "Web", "Mobile", "ML/AI", "Others"];
  const [activeFilter, setActiveFilter] = useState("All");

  const allProjects = [
     {
      id: 1,
      title: "Finance Manager",
      image: "/assets/pro1.jpg",
      tags: ["Python", "Tkinter", "MySQL", "Desktop"],
      category: "Others",
      description: "Desktop system for tracking assets, liabilities & transactions using Python/Tkinter.",
      color: "#4CAF50",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Emotion Analysis ML",
      image: "/assets/pro2.jpg",
      tags: ["Python", "ML", "NLP", "Pandas"],
      category: "ML/AI",
      description: "Classifies 13 emotions from text using Naive-Bayes & Logistic Regression.",
       color: "#2196F3",
       demoUrl: "#",
       codeUrl: "#"
    },
    {
      id: 3,
      title: "Dear Diary App",
      image: "/assets/pro3a.jpg",
      tags: ["Flutter", "HiveDB", "Mobile", "Cross-Platform"],
      category: "Mobile",
      description: "Personal diary app (CRUD) built with Flutter and local HiveDB storage.",
       color: "#9C27B0",
       demoUrl: "#",
       codeUrl: "#"
    },
     {
      id: 4,
      title: "Weather Insights Web",
      image: "/assets/pro4.jpg",
      tags: ["Python", "Flask", "API", "Web", "JS"],
      category: "Web",
      description: "Web app providing weather forecasts, stock updates, and news via APIs.",
       color: "#F44336",
       demoUrl: "#",
       codeUrl: "#"
    },
    {
      id: 5,
      title: "Ransomware Demo",
      image: "/assets/pro5.jpg",
      tags: ["Rust", "Slint", "Python", "Security"],
      category: "Others",
      description: "Educational ransomware implementation demonstrating mechanics (Rust/Python).",
       color: "#FF9800",
       demoUrl: "#",
       codeUrl: "#"
    },
     {
      id: 6,
      title: "Portfolio v1",
      image: "/assets/pro6.jpg",
      tags: ["JavaScript", "HTML", "CSS", "SCSS", "Web"],
      category: "Web",
      description: "Previous version of my personal portfolio website showcasing projects and skills.",
       color: "#607D8B",
       demoUrl: "#",
       codeUrl: "#"
    },
    {
      id: 7,
      title: "Min Score Game",
      image: "/assets/pro7.png",
      tags: ["Python", "Pygame", "GameDev"],
      category: "Others",
      description: "Simple strategic score-reaching game developed with Pygame.",
       color: "#00BCD4",
       demoUrl: "#",
       codeUrl: "#"
    }
  ];

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(project => project.category === activeFilter);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

   const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, staggerChildren: 0.05 }
    }
  };

  const filterButtonVariants = {
     hidden: { opacity: 0, y: 10 },
     visible: { opacity: 1, y: 0 },
     hover: { scale: 1.05, backgroundColor: "rgba(0, 162, 255, 0.2)"},
     tap: { scale: 0.95 }
  }

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <motion.section
        id="projects"
        className="projects-section"
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
    >
      <div className="container projects-container">
        <motion.h2 className="projects-title section-title" variants={titleVariants}>
          My <span className="highlight">Creations</span>
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div className="projects-filter" variants={filterVariants}>
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
                {/* Add layout animation for the active indicator */}
                {activeFilter === filter && (
                    <motion.div className="active-indicator" layoutId="activeFilterIndicator" />
                )}
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          variants={gridVariants}
          key={activeFilter}
        >
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;