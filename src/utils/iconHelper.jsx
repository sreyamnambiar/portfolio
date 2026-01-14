import { 
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws,
  FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaTrophy, FaAward, FaCode, FaJava
} from 'react-icons/fa'
import { SiTypescript, SiMongodb, SiTailwindcss, SiNextdotjs } from 'react-icons/si'

export const iconMap = {
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaJs: FaJs,
  SiTypescript: SiTypescript,
  FaPython: FaPython,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  SiMongodb: SiMongodb,
  FaGitAlt: FaGitAlt,
  FaDocker: FaDocker,
  SiTailwindcss: SiTailwindcss,
  SiNextdotjs: SiNextdotjs,
  FaTrophy: FaTrophy,
  FaAward: FaAward,
  FaCode: FaCode,
  FaDatabase: FaDatabase,
  FaAws: FaAws,
  FaJava: FaJava
}

export const getIcon = (iconName) => {
  const IconComponent = iconMap[iconName]
  return IconComponent || null
}
