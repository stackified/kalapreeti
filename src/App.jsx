import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Menu } from 'lucide-react';
import './App.css';

/**
 * CharacterReveal Component
 * Animates text character by character for a premium feel.
 */
const CharacterReveal = ({ text, className, delay = 0 }) => {
  const characters = useMemo(() => text.split(""), [text]);
  
  return (
    <motion.h3
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } },
        hidden: {}
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h3>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="navbar glass-dark">
        <div className="container nav-content">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            KALAPREETI
          </motion.div>
          <div className="nav-links desktop-only">
            {['Home', 'Studio', 'Projects', 'Journals'].map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="nav-actions">
            <motion.a 
              href="#contact" 
              className="contact-pill-v4 desktop-only"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT US
              <div className="dot-v4"></div>
            </motion.a>
            <div className="menu-icon-v4" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-header">
              <div className="logo">KALAPREETI</div>
              <div className="close-icon" onClick={() => setIsOpen(false)}>✕</div>
            </div>
            <div className="mobile-nav-links">
              {['Home', 'Studio', 'Projects', 'Journals'].map((item, i) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a 
                href="#contact" 
                className="mobile-contact-pill"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                CONTACT US
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "20%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), {
    stiffness: 100,
    damping: 30
  });

  const lines = ["DESIGNING", "EXCELLENCE,", "BUILT TO BELONG"];

  return (
    <section id="home" className="hero-v4" ref={ref}>
      <motion.div className="hero-bg-v4" style={{ y, scale }}>
        <img src="assets/hero.png" alt="Hero" />
        <div className="hero-overlay-v4"></div>
      </motion.div>
      <div className="container hero-inner-v4">
        <div className="hero-text-block">
          {lines.map((line, i) => (
            <div key={i} className="line-wrapper">
              <motion.h1 
                className="massive-display"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8 + (i * 0.15), 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>
      </div>
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          document.getElementById('studio').scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="scroll-pill">SCROLL DOWN</div>
      </motion.div>
    </section>
  );
};

const StickyScroller = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Phrases move down as we scroll down
  const yFixed = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yMoving = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <div className="sticky-scroller-v4" ref={container}>
      <motion.div className="scroller-prefix" style={{ y: yFixed }}>
        <h3>We</h3>
      </motion.div>
      <motion.div className="scroller-content-v4" style={{ y: yMoving }}>
        <h3>WORK TOGETHER.</h3>
        <h3>GROW BRILLIANCE.</h3>
        <h3>SHAPE TOMORROW.</h3>
        <h3>KEEP EXPLORING.</h3>
      </motion.div>
    </div>
  );
};

const ProjectItem = ({ title, year, image, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springY = useSpring(useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]), {
    stiffness: 50,
    damping: 20
  });

  return (
    <motion.div 
      className={`project-card-v4 ${index % 2 !== 0 ? 'offset' : ''}`} 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="project-mask-v4">
        <motion.img 
          src={image} 
          alt={title} 
          style={{ y: springY }}
          whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="project-info-v4">
        <div className="info-main">
          <h3>{title}</h3>
          <span className="year">{year}</span>
        </div>
        <ArrowUpRight size={24} className="arrow-icon" />
      </div>
    </motion.div>
  );
};

const ProjectsGrid = () => (
  <section id="projects" className="section-white-v4">
    <div className="container">
      <div className="section-header-v4">
        <span className="tag-v4">• SELECTED WORKS</span>
        <h2 className="title-v4">ARCHITECTURAL <br /> EXCELLENCE</h2>
      </div>
      <div className="projects-grid-v4">
        <ProjectItem title="Elysian Spire" year="2025" image="assets/project1.png" index={0} />
        <ProjectItem title="Solara Pavilion" year="2023" image="assets/project2.png" index={1} />
        <ProjectItem title="Nebura Heights" year="2016" image="assets/project3.png" index={2} />
        <ProjectItem title="Etoile Grand" year="2012" image="assets/project4.png" index={3} />
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="section-black-v4">
    <div className="container">
      <div className="service-row-v4">
        <span className="number-v4">01 /</span>
        <div className="service-main">
          <CharacterReveal text="PLANNING & STRATEGY" className="service-title-v4" />
          <p className="service-desc-v4">
            We analyze every site and client vision to create a strategic foundation that ensures longevity and relevance in the urban landscape.
          </p>
        </div>
        <div className="service-image-v4">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" alt="Planning" />
        </div>
      </div>
      <div className="service-row-v4">
        <span className="number-v4">02 /</span>
        <div className="service-main">
          <CharacterReveal text="CONCEPT & DESIGN" className="service-title-v4" />
          <p className="service-desc-v4">
            Our team transforms ideas into thoughtful concepts, balancing creativity with functionality. Every design is tailored to reflect your aspirations.
          </p>
        </div>
        <div className="service-image-v4">
          <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1000" alt="Design" />
        </div>
      </div>
    </div>
  </section>
);

const ContactCTA = () => (
  <section className="cta-section-v4">
    <div className="container cta-container-v4">
      <motion.div 
        className="cta-circle-v4"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="massive-cta-title">LET'S BUILD <br /> TOGETHER</h2>
        <motion.a 
          href="#contact" 
          className="cta-btn-v4"
          whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
          transition={{ duration: 0.3 }}
        >
          START A PROJECT
          <ArrowUpRight size={24} />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer-v4">
    <div className="container">
      <div className="footer-top-v4">
        <h2 className="footer-brand-v4">KALAPREETI</h2>
        <div className="footer-links-v4">
          <div className="link-group">
            <span className="group-title">• EXPLORE</span>
            <a href="#">Studio</a>
            <a href="#">Projects</a>
            <a href="#">Journal</a>
          </div>
          <div className="link-group">
            <span className="group-title">• CONNECT</span>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-v4">
        <p>© 2025 KALAPREETI. ARCHITECTURAL EXCELLENCE.</p>
        <p>DUBAI • LONDON • MILAN</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="app-v4">
      <Navbar />
      <main>
        <Hero />
        <section id="studio" className="section-white-v4">
          <div className="container">
            <div className="philosophy-v4">
               <span className="tag-v4">• OUR STUDIO</span>
               <div className="philosophy-grid-v4">
                 <div className="philosophy-main-v4">
                   <h3 className="sub-display">WE BELIEVE ARCHITECTURE <br /> IS THE ART OF SHAPING <br /> ENVIRONMENTS.</h3>
                   <StickyScroller />
                 </div>
                 <motion.div 
                   className="philosophy-image-v4"
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 >
                   <img src="assets/studio.png" alt="Studio" />
                 </motion.div>
               </div>
            </div>
          </div>
        </section>
        <ServicesSection />
        <ProjectsGrid />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
