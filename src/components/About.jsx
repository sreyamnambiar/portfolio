import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'
import portfolioData from '../data/portfolioData.json'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { personal } = portfolioData

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>{personal.about.heading}</h3>
            {personal.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="developer-illustration"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#6c5ce7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a29bfe', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a29bfe', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#fd79a8', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Background circle */}
                <circle cx="250" cy="250" r="200" fill="url(#grad1)" opacity="0.1" />
                
                {/* Laptop */}
                <rect x="150" y="220" width="200" height="140" rx="10" fill="url(#grad1)" />
                <rect x="160" y="230" width="180" height="110" fill="#0c0c1d" />
                
                {/* Code lines */}
                <motion.line 
                  x1="180" y1="250" x2="280" y2="250" 
                  stroke="#6c5ce7" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.line 
                  x1="180" y1="270" x2="250" y2="270" 
                  stroke="#a29bfe" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.line 
                  x1="180" y1="290" x2="300" y2="290" 
                  stroke="#fd79a8" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.line 
                  x1="180" y1="310" x2="270" y2="310" 
                  stroke="#6c5ce7" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Laptop base */}
                <path d="M 120 360 L 380 360 L 400 380 L 100 380 Z" fill="url(#grad2)" />
                
                {/* Floating elements */}
                <motion.circle 
                  cx="100" cy="150" r="15" 
                  fill="#6c5ce7" opacity="0.6"
                  animate={{ y: [0, -15, 0], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="400" cy="180" r="20" 
                  fill="#a29bfe" opacity="0.6"
                  animate={{ y: [0, 15, 0], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="380" cy="100" r="12" 
                  fill="#fd79a8" opacity="0.6"
                  animate={{ y: [0, -10, 0], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
