import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import './Contact.css'
import portfolioData from '../data/portfolioData.json'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const { personal } = portfolioData
  const contactInfo = [
    { icon: <FaEnvelope />, title: 'Email', value: personal.contact.email },
    { icon: <FaMapMarkerAlt />, title: 'Location', value: personal.contact.location },
  ]

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3>Let's talk about everything!</h3>
            <p>
              Feel free to reach out if you want to collaborate, have a question, 
              or just want to connect. I'm always open to discussing new projects 
              and creative ideas.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div>
                    <h4>{info.title}</h4>
                    <p>{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="form-row">
              <motion.div 
                className="form-group"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button 
              type="submit" 
              className="btn btn-primary submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading">Sending...</span>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.p 
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.p>
            )}
            
            {submitStatus === 'error' && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Failed to send message. Please try again or email directly.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
