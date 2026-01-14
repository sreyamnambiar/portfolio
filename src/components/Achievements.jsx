import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy, FaAward, FaCode, FaTimes, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa'
import './Achievements.css'
import portfolioData from '../data/portfolioData.json'
import { getIcon } from '../utils/iconHelper'

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  const { achievements } = portfolioData

  return (
    <section id="achievements" className="achievements" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Scroll to explore →
        </motion.p>

        <div className="achievements-scroll-container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const IconComponent = getIcon(achievement.icon)
              return (
                <motion.div
                  key={index}
                  className="achievement-card"
                  custom={index}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 20px 40px rgba(108, 92, 231, 0.4)',
                    y: -5
                  }}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <div className="achievement-icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <div className="achievement-status">{achievement.status}</div>
                  <h4>{achievement.title}</h4>
                  {achievement.year && <span className="achievement-year">{achievement.year}</span>}
                  <p>{achievement.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Achievement Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div 
              className="achievement-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div 
                className="achievement-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close" 
                  onClick={() => setSelectedAchievement(null)}
                >
                  <FaTimes />
                </button>

                <div className="modal-header">
                  <div className="modal-icon">
                    {(() => {
                      const IconComponent = getIcon(selectedAchievement.icon)
                      return IconComponent ? <IconComponent /> : null
                    })()}
                  </div>
                  <div>
                    <h2>{selectedAchievement.title}</h2>
                    <div className="modal-meta">
                      <span className="modal-status">{selectedAchievement.status}</span>
                      <span className="modal-year">{selectedAchievement.year}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-content">
                  <p className="modal-description">{selectedAchievement.fullDescription}</p>

                  {selectedAchievement.images && selectedAchievement.images.length > 0 && (
                    <div className="modal-images">
                      {selectedAchievement.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`${selectedAchievement.title} ${idx + 1}`} />
                      ))}
                    </div>
                  )}

                  {selectedAchievement.technologies && (
                    <div className="modal-technologies">
                      
                      <div className="modal-tech-tags">
                        {selectedAchievement.technologies.map((tech, idx) => (
                          <span key={idx} className="modal-tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="modal-links">
                    {selectedAchievement.linkedinUrl && (
                      <a 
                        href={selectedAchievement.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="modal-linkedin-btn"
                      >
                        <FaLinkedin /> View on LinkedIn
                      </a>
                    )}
                    {selectedAchievement.websiteUrl && (
                      <a 
                        href={selectedAchievement.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="modal-website-btn"
                      >
                        <FaExternalLinkAlt /> Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Achievements
