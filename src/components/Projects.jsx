import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const projects = [
    {
      id: 1,
      title: "Finance Management System",
      image: "/assets/pro1.jpg",
      tags: ["Python", "Tkinter", "MySQL"],
      description: "A financial management system designed to streamline tracking of assets, liabilities, and transactions. This project utilizes Python's tkinter for a user-friendly GUI and MySQL for efficient data management.",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Emotion Analysis using ML",
      image: "/assets/pro2.jpg",
      tags: ["Python", "Naive-Bayes", "Logistic Regression", "pandas", "matplotlib", "textblob"],
      description: "A machine learning model capable of classifying 13 emotions from text data. Used Naive-Bayes and Logistic Regression algorithms to predict emotions based on input data.",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Dear Diary",
      image: "/assets/pro3a.jpg",
      tags: ["Flutter", "HiveDB"],
      description: "Dear Diary is a Flutter-based application designed for personal reflection and creativity. It enables users to create, update, delete, recover and organize diary entries by date.",
      color: "#9C27B0"
    },
    {
      id: 4,
      title: "Weather & Insights Application",
      image: "/assets/pro4.jpg",
      tags: ["Python", "Flask", "API", "HTML5", "CSS", "JavaScript"],
      description: "An intuitive application that provides real-time weather forecasts using the Weather API, along with stock market updates and the latest news.",
      color: "#F44336"
    },
    {
      id: 5,
      title: "Ransomware Analysis and Implementation",
      image: "/assets/pro5.jpg",
      tags: ["Rust", "Slint", "Python"],
      description: "A safe implementation of ransomware to demonstrate its working for educational purposes. The app is built using Rust(Slint) and Python.",
      color: "#FF9800"
    },
    {
      id: 6,
      title: "Portfolio Website",
      image: "/assets/pro6.jpg",
      tags: ["JavaScript", "HTML5", "CSS", "SCSS"],
      description: "An intuitive and responsive personal portfolio website designed to showcase projects, skills, and achievements.",
      color: "#607D8B"
    },
    {
      id: 7,
      title: "Min Game",
      image: "/assets/pro7.png",
      tags: ["Python", "pygame"],
      description: "A strategic game developed using Python's pygame library, where players compete to reach a score of 100.",
      color: "#00BCD4"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <motion.h2 
          className="projects-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <span className="highlight">My</span> Projects
        </motion.h2>
        
        <motion.div 
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Web</button>
          <button className="filter-btn">Mobile</button>
          <button className="filter-btn">ML/AI</button>
          <button className="filter-btn">Others</button>
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;