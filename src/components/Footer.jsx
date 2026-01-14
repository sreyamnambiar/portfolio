import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'
import './Footer.css'
import portfolioData from '../data/portfolioData.json'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { personal } = portfolioData

  const socialLinks = [
    { icon: <FaGithub />, url: personal.social.github, label: 'GitHub' },
    { icon: <FaLinkedin />, url: personal.social.linkedin, label: 'LinkedIn' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-text">Sreya</span>
            <span className="logo-dot">.</span>
          </motion.div>

          <div className="footer-socials">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.2, color: '#6c5ce7' }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          
        </div>
      </div>
    </footer>
  )
}

export default Footer
