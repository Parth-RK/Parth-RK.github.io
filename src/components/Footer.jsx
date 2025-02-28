import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container bd-grid">
        <div className="footer__content">
          <h3 className="footer__title">Parth RK</h3>
          <p className="footer__description">
            Software Engineer & Web Developer
            <br />
            Creating innovative solutions with passion and precision.
          </p>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Navigation</h3>
          <ul className="footer__links">
            <li><a href="#home" className="footer__link">Home</a></li>
            <li><a href="#about" className="footer__link">About</a></li>
            <li><a href="#projects" className="footer__link">Projects</a></li>
            <li><a href="#contact" className="footer__link">Contact</a></li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Connect</h3>
          <div className="footer__social">
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <i className="bx bxl-github"></i>
            </a>
            <a href="mailto:your-email@example.com" className="footer__social-icon">
              <i className="bx bx-mail-send"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <p className="footer__copy">&#169; {new Date().getFullYear()} Parth RK. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
