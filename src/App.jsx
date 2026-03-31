import React, { useRef, useMemo, useState } from 'react';
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

const StickyScroller = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

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

const Navbar = ({ setIsContactOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar glass-dark">
        <div className="container nav-content">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/Kalapriti/assets/logo/Asset 17.svg" alt="Kalapriti" style={{ height: '50px' }} />
          </motion.div>
          <div className="nav-links desktop-only">
            {['Home', 'Media', 'Studio', 'Projects', 'Contact'].map((item, i) => (
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
            <motion.a 
              href="https://instagram.com" 
              target="_blank"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
               <Instagram size={18} />
            </motion.a>
          </div>
          <div className="nav-actions">
            <motion.button 
              onClick={() => setIsContactOpen(true)}
              className="contact-pill-v4 desktop-only"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START A PROJECT
              <div className="dot-v4"></div>
            </motion.button>
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
              <div className="logo">
                <img src="/Kalapriti/assets/logo/Asset 17.svg" alt="Kalapriti" style={{ height: '40px' }} />
              </div>
              <div className="close-icon" onClick={() => setIsOpen(false)}>✕</div>
            </div>
            <div className="mobile-nav-links">
              {['Home', 'Studio', 'Projects', 'Media'].map((item, i) => (
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
              <motion.button 
                onClick={() => { setIsOpen(false); setIsContactOpen(true); }}
                className="cta-btn-v4"
                style={{ marginTop: '20px', padding: '15px 30px', fontSize: '14px' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                START A PROJECT
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ContactModal = ({ onClose }) => (
  <motion.div 
    className="overlay-v4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div 
      className="modal-content-v4"
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="close-detail-v4" style={{ top: '20px', right: '20px', width: '40px', height: '40px' }} onClick={onClose}>✕</div>
      <h2 className="title-v4" style={{ color: '#fff', fontSize: '42px', marginBottom: '40px', border: 'none' }}>TELL US ABOUT <br /> YOUR PROJECT</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group-v4">
          <label>FULL NAME</label>
          <input type="text" placeholder="John Doe" />
        </div>
        <div className="form-group-v4">
          <label>EMAIL ADDRESS</label>
          <input type="email" placeholder="john@example.com" />
        </div>
        <div className="form-group-v4">
          <label>PROJECT TYPE</label>
          <input type="text" placeholder="Interior Design / Architecture" />
        </div>
        <div className="form-group-v4">
          <label>MESSAGE</label>
          <textarea rows="2" placeholder="Briefly describe your vision..."></textarea>
        </div>
        <button className="cta-btn-v4" style={{ width: '100%', justifyContent: 'center' }}>SEND INQUIRY</button>
      </form>
    </motion.div>
  </motion.div>
);

const ProjectDetail = ({ project, onClose }) => (
  <motion.div 
    className="overlay-v4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ padding: 0 }}
  >
    <motion.div className="project-detail-v4">
      <div className="close-detail-v4" onClick={onClose}>✕</div>
      <motion.img 
        layoutId={`img-${project.title}`}
        src={project.image} 
        className="detail-img-v4"
      />
      <div className="container detail-info-v4">
        <motion.span layoutId={`year-${project.title}`} className="tag-v4">• {project.year}</motion.span>
        <motion.h2 layoutId={`title-${project.title}`} className="footer-brand-v4" style={{ margin: '20px 0', fontSize: 'clamp(3rem, 10vw, 8rem)', color: '#fff' }}>
          {project.title.split(' ')[0]} <br /> {project.title.split(' ')[1]}
        </motion.h2>
        <div className="philosophy-grid-v4">
          <div className="philosophy-main-v4">
            <p style={{ fontSize: '24px', opacity: 0.7, lineHeight: 1.6, color: '#fff' }}>
              A visionary architectural project that redefines the relationship between structural integrity and environmental harmony. This space utilizes advanced sustainable materials and minimalist design principles to create an atmosphere of timeless sophistication.
            </p>
          </div>
          <div className="team-roles" style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#fff' }}>
             <div><span style={{ opacity: 0.3 }}>LOCATION /</span> DUBAI, UAE</div>
             <div><span style={{ opacity: 0.3 }}>AREA /</span> 12,000 SQ. FT.</div>
             <div><span style={{ opacity: 0.3 }}>CLIENT /</span> PRIVATE RESIDENCE</div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Hero = ({ setIsContactOpen }) => {
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

  const lines = ["ARCHITECTURAL", "& DESIGN", "CONSULTANCY"];

  return (
    <section id="home" className="hero-v4" ref={ref}>
      <motion.div className="hero-bg-v4" style={{ y, scale }}>
        <img src="/Kalapriti/assets/hero.png" alt="Hero" />
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
          <motion.p 
            className="hero-description-v4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Crafting timeless environments with precision, sustainability, and innovative spatial design for a modern world.
          </motion.p>
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

const ProjectItem = ({ title, year, image, index, onClick }) => {
  return (
    <motion.div 
      className={`project-card-v4 ${index % 2 !== 0 ? 'offset' : ''}`} 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onClick={() => onClick({ title, year, image })}
      style={{ cursor: 'pointer' }}
    >
      <div className="project-mask-v4">
        <motion.img 
          layoutId={`img-${title}`}
          src={image} 
          alt={title} 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="project-info-v4">
        <div className="info-main">
          <motion.h3 layoutId={`title-${title}`}>{title}</motion.h3>
          <motion.span layoutId={`year-${title}`} className="year">{year}</motion.span>
        </div>
        <ArrowUpRight size={24} className="arrow-icon" />
      </div>
    </motion.div>
  );
};

const ProjectsGrid = ({ setSelectedProject }) => (
  <section id="projects" className="section-white-v4">
    <div className="container">
      <div className="section-header-v4">
        <span className="tag-v4">• SELECTED WORKS</span>
        <h2 className="title-v4">ARCHITECTURAL <br /> EXCELLENCE</h2>
      </div>
      <div className="projects-grid-v4">
        {[
          { title: "Elysian Spire", year: "2025", image: "/Kalapriti/assets/project1.png" },
          { title: "Solara Pavilion", year: "2023", image: "/Kalapriti/assets/project2.png" },
          { title: "Nebura Heights", year: "2016", image: "/Kalapriti/assets/project3.png" },
          { title: "Etoile Grand", year: "2012", image: "/Kalapriti/assets/project4.png" }
        ].map((item, i) => (
          <ProjectItem 
            key={item.title}
            {...item}
            index={i}
            onClick={setSelectedProject}
          />
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="section-black-v4">
    <div className="container">
      <div className="section-header-v4" style={{ marginBottom: '60px' }}>
         <span className="tag-v4">• OUR SERVICE BIFURCATION</span>
         <h2 className="title-v4" style={{ color: 'var(--text-primary)' }}>EXPERTISE & <br /> SPECIALIZATION</h2>
      </div>
      <div className="service-row-v4">
        <span className="number-v4">01 /</span>
        <div className="service-main">
          <CharacterReveal text="EXTERIOR DESIGN" className="service-title-v4" />
          <p className="service-desc-v4">
            Creating iconic facades and landscape integrations that define urban identity and structural longevity.
          </p>
          <div className="service-tags-v4" style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
             {['Architecture', 'Landscaping', 'Urban Planning', 'Sustainability'].map(tag => (
               <span key={tag} className="tag-v4" style={{ opacity: 1, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '10px' }}>{tag}</span>
             ))}
          </div>
        </div>
        <div className="service-image-v4">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" alt="Exterior" />
        </div>
      </div>
      <div className="service-row-v4">
        <span className="number-v4">02 /</span>
        <div className="service-main">
          <CharacterReveal text="INTERIOR DESIGN" className="service-title-v4" />
          <p className="service-desc-v4">
            Curating bespoke environments that balance luxury with functionality, reflecting personal and corporate identities.
          </p>
          <div className="service-tags-v4" style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
             {['Bespoke Furniture', 'Space Optimization', 'Materiality', 'Aesthetics'].map(tag => (
               <span key={tag} className="tag-v4" style={{ opacity: 1, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '10px' }}>{tag}</span>
             ))}
          </div>
        </div>
        <div className="service-image-v4">
          <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1000" alt="Interior" />
        </div>
      </div>
    </div>
  </section>
);

const ContactCTA = ({ setIsContactOpen }) => (
  <section className="cta-section-v4">
    <div className="container cta-container-v4">
      <motion.div 
        className="cta-circle-v4"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="massive-cta-title" style={{ color: '#fff' }}>LET'S BUILD <br /> TOGETHER</h2>
        <motion.button 
          onClick={() => setIsContactOpen(true)}
          className="cta-btn-v4"
          whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
          transition={{ duration: 0.3 }}
        >
          START A PROJECT
          <ArrowUpRight size={24} />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer-v4">
    <div className="container">
      <div className="footer-top-v4">
        <div className="footer-brand-container">
          <img src="/Kalapriti/assets/logo/Asset 17.svg" alt="Kalapriti Associates" style={{ height: '100px', marginBottom: '20px' }} />
          <h2 className="footer-brand-v4" style={{ fontSize: '40px' }}>KALAPRITI <br /> ASSOCIATES</h2>
        </div>
        <div className="footer-links-v4">
          <div className="link-group">
            <span className="group-title">• EXPLORE</span>
            <a href="#studio">Studio</a>
            <a href="#projects">Projects</a>
            <a href="#media">Media</a>
          </div>
          <div className="link-group">
            <span className="group-title">• CONNECT</span>
            <a href="https://instagram.com" target="_blank">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-v4">
        <p>© 2025 KALAPRITI ASSOCIATES. ALL RIGHTS RESERVED.</p>
        <p>ARCHITECTURAL & DESIGN CONSULTANCY</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="app-v4">
      <Navbar setIsContactOpen={setIsContactOpen} />
      <main>
        <Hero setIsContactOpen={setIsContactOpen} />
        <section id="studio" className="section-white-v4">
          <div className="container">
            <div className="philosophy-v4">
               <span className="tag-v4">• OUR STUDIO</span>
               <div className="philosophy-grid-v4">
                 <div className="philosophy-main-v4">
                   <h3 className="sub-display">WE BELIEVE ARCHITECTURE <br /> IS THE ART OF SHAPING <br /> ENVIRONMENTS.</h3>
                   <div className="studio-subsections" style={{ marginTop: '60px' }}>
                      <div className="studio-section" style={{ marginBottom: '40px' }}>
                        <span className="tag-v4" style={{ opacity: 1, color: 'var(--accent)' }}>VISION</span>
                        <p style={{ marginTop: '10px', fontSize: '18px', opacity: 0.8 }}> To redefine global standards in architectural excellence through creative, word-driven branding and innovative spatial design.</p>
                      </div>
                      <div className="studio-section" style={{ marginBottom: '40px' }}>
                        <span className="tag-v4" style={{ opacity: 1, color: 'var(--accent)' }}>VALUES</span>
                        <p style={{ marginTop: '10px', fontSize: '18px', opacity: 0.8 }}> Brand Value Primary, Integrity in Engineering, Creative Excellence, and Global Standards.</p>
                      </div>
                      <div className="studio-section">
                        <span className="tag-v4" style={{ opacity: 1, color: 'var(--accent)' }}>TEAM</span>
                        <div className="team-roles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                           <div>• Project Consultant</div>
                           <div>• Interior Designer</div>
                           <div>• BE Civil</div>
                           <div>• Engineer Consultant</div>
                        </div>
                      </div>
                   </div>
                 </div>
                 <motion.div 
                   className="philosophy-image-v4"
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 >
                   <img src="/Kalapriti/assets/studio.png" alt="Studio" />
                 </motion.div>
               </div>
            </div>
          </div>
        </section>
        <ServicesSection />
        <ProjectsGrid setSelectedProject={setSelectedProject} />
        <ContactCTA setIsContactOpen={setIsContactOpen} />
      </main>
      <Footer />

      <AnimatePresence>
        {isContactOpen && (
          <ContactModal onClose={() => setIsContactOpen(false)} />
        )}
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
