import React from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a href="https://github.com" title="GitHub" target="_blank" rel="noopener noreferrer">
        <FaGithub className="footer-icon" />
        <span>GitHub</span>
      </a>
      <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="footer-icon" />
        <span>Instagram</span>
      </a>
    </footer>
  );
};

export default Footer;
