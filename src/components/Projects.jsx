import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import './Projects.css'
import portfolioData from '../data/portfolioData.json'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState(null)

  const { projects } = portfolioData

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  {project.image.startsWith('/') || project.image.startsWith('http') ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <span>{project.image}</span>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description.substring(0, 80)}...</p>
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedProject(null)}>
                  <FaTimes />
                </button>
                <div className="modal-image">
                  {selectedProject.architectures ? (
                    <div className="architecture-grid">
                      {selectedProject.architectures.map((arch, idx) => (
                        <img key={idx} src={arch} alt={`${selectedProject.title} Architecture ${idx + 1}`} />
                      ))}
                    </div>
                  ) : selectedProject.architecture ? (
                    <img src={selectedProject.architecture} alt={`${selectedProject.title} Architecture`} />
                  ) : selectedProject.image.startsWith('/') || selectedProject.image.startsWith('http') ? (
                    <img src={selectedProject.image} alt={selectedProject.title} />
                  ) : (
                    <span>{selectedProject.image}</span>
                  )}
                </div>
                <div className="modal-content">
                  <h3>{selectedProject.title}</h3>
                  {selectedProject.teamType && (
                    <span className="team-type-badge">{selectedProject.teamType}</span>
                  )}
                  <p>{selectedProject.description}</p>
                  <div className="project-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="modal-links">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> {selectedProject.githubBackend ? 'Frontend' : 'GitHub'}
                      </a>
                    )}
                    {selectedProject.githubBackend && (
                      <a href={selectedProject.githubBackend} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Backend
                      </a>
                    )}
                    {selectedProject.live && (
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Demo 
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

export default Projects
