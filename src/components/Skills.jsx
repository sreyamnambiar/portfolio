import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws,
  FaHtml5, FaCss3Alt, FaJs, FaDatabase
} from 'react-icons/fa'
import { SiTypescript, SiMongodb, SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import './Skills.css'
import portfolioData from '../data/portfolioData.json'
import { getIcon } from '../utils/iconHelper'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { skills } = portfolioData

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <div className="skills-grid">
          {skills.map((skill, index) => {
            const IconComponent = getIcon(skill.icon)
            return (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: `0 0 30px ${skill.color}40`,
                  borderColor: skill.color
                }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {IconComponent && <IconComponent />}
                </div>
                <h4>{skill.name}</h4>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
