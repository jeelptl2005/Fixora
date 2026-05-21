import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';
import { motion, useMotionValue, useTransform, animate, useScroll, useSpring } from 'framer-motion';
import homeVideo from '../../assets/homeVideo.mp4';
import mobHomeVideo from '../../assets/mobHome.mp4';
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const heroRef = useRef(null);
  const [selectedService, setSelectedService] = useState('Electrician');
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [searchQuery, setSearchQuery] = useState(''); // Added state for search input
  const [counters, setCounters] = useState({
    services: 0,
    experts: 0,
    cities: 0,
    satisfaction: 0
  });

  // Animated counters
  useEffect(() => {
    const targets = { services: 15240, experts: 524, cities: 38, satisfaction: 98 };
    const duration = 2000;
    const startTime = performance.now();

    const animateCounters = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounters({
        services: Math.floor(targets.services * progress),
        experts: Math.floor(targets.experts * progress),
        cities: Math.floor(targets.cities * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });
      if (progress < 1) requestAnimationFrame(animateCounters);
    };
    requestAnimationFrame(animateCounters);
  }, []);

  // ETA countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEtaMinutes(prev => prev > 1 ? prev - 1 : 18);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move effect for 3D tilt on cards
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Updated handleSearch to redirect to services page with search query
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search?.value || searchQuery;
    
    // Store search query in sessionStorage to be used on services page
    if (searchInput && searchInput.trim()) {
      sessionStorage.setItem('serviceSearchQuery', searchInput.trim());
    }
    
    // Redirect to services page
    navigate('/service');
  };

  const handleVoiceSearch = () => {
    alert('Voice search activated');
  };

  const handleBookService = () => {
    alert(`Booking ${selectedService} service`);
  };

  useEffect(() => {
    document.title = "Fixora - Premium Home Services";
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;
    if (desktopVideo) desktopVideo.load();
    if (mobileVideo) mobileVideo.load();
  }, []);

  const serviceCards = [
    { id: 1, name: 'Electrician', icon: 'fa-bolt', eta: '15-20 min', rating: '4.9', status: 'Available Now', color: '#FF6B00' },
    { id: 2, name: 'Plumbing', icon: 'fa-wrench', eta: '20-25 min', rating: '4.8', status: 'Available Now', color: '#FF8C42' },
    { id: 3, name: 'AC Repair', icon: 'fa-snowflake', eta: '25-30 min', rating: '4.9', status: 'Busy', color: '#FFB347' },
    { id: 4, name: 'Deep Cleaning', icon: 'fa-broom', eta: '30-35 min', rating: '4.7', status: 'Available Now', color: '#FFA559' },
    { id: 5, name: 'Appliance Repair', icon: 'fa-microchip', eta: '20-25 min', rating: '4.8', status: 'Available Now', color: '#FF6E4A' },
    { id: 6, name: 'Painting', icon: 'fa-paintbrush', eta: '35-40 min', rating: '4.7', status: 'Scheduled', color: '#FF8555' },
  ];

  const aiSuggestions = [
    { text: 'Your AC may require servicing', icon: 'fa-snowflake', glow: '#FF6B00' },
    { text: 'Detected possible plumbing issue', icon: 'fa-wrench', glow: '#FF8C42' },
    { text: 'Recommended deep cleaning service', icon: 'fa-broom', glow: '#FFB347' },
  ];

  const howItWorks = [
    { step: 'Select Service', icon: 'fa-hand-pointer', glow: '#FF6B00' },
    { step: 'Book Instantly', icon: 'fa-calendar-check', glow: '#FF8C42' },
    { step: 'Expert Arrives', icon: 'fa-truck-fast', glow: '#FFA559' },
  ];

  return (
    <div className="hero-saas" ref={heroRef}>
      {/* Video Background */}
      <div className="hero-video-wrapper-saas">
        <video
          ref={desktopVideoRef}
          className="hero-video-saas hero-video-desktop-saas"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <video
          ref={mobileVideoRef}
          className="hero-video-saas hero-video-mobile-saas"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={mobHomeVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay-saas"></div>
        <div className="hero-gradient-overlay-saas"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(255,107,0,0.4) 0%, rgba(255,107,0,0) 70%)`,
            }}
          />
        ))}
      </div>

      {/* Main Hero Container */}
      <div className="hero-container-saas">
        {/* LEFT SIDE */}
        <div className="hero-left-saas">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-badge-saas"
          >
            <i className="fas fa-bolt"></i>
            <span>PREMIUM HOME SERVICES PLATFORM</span>
          </motion.div>

          <motion.h1
            className="hero-title-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero-title-gradient">Your Comfort,</span><br/><span className="hero-title-gradient">Our</span><span className="hero-title-orange"> Commitment</span>
            <br />
          </motion.h1>

          <motion.p
            className="hero-sub-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Instantly book verified professionals for <span className="highlight-text">Electrical work, Plumbing, AC repair, Appliance repair, Painting, Deep cleaning, and Emergency home services.</span>
          </motion.p>

          {/* Smart Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="search-bar-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <i className="fas fa-search search-icon-saas"></i>
            <input
              type="text"
              name="search"
              placeholder="Search for electricians, AC repair, plumbing..."
              className="search-input-saas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.button
              type="button"
              className="voice-search-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceSearch}
            >
              <i className="fas fa-microphone"></i>
            </motion.button>
            <motion.button
              type="submit"
              className="btn-search-saas"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,107,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Search <i className="fas fa-arrow-right"></i>
            </motion.button>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            className="cta-group-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              className="btn-primary-saas"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 25px rgba(255,107,0,0.6)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookService}
            >
              <i className="fas fa-calendar-check"></i> Book Service
            </motion.button>
            <motion.button
              className="btn-secondary-saas"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 20px rgba(255,107,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/service")}
            >
              <i className="fas fa-compass"></i> Explore Services
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="trust-strip-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="trust-item-saas"><i className="fas fa-star"></i> 4.9★ Rating</div>
            <div className="trust-divider-saas"></div>
            <div className="trust-item-saas"><i className="fas fa-users"></i> 10K+ Happy</div>
            <div className="trust-divider-saas"></div>
            <div className="trust-item-saas"><i className="fas fa-shield-alt"></i> Verified Pros</div>
            <div className="trust-divider-saas"></div>
            <div className="trust-item-saas"><i className="fas fa-clock"></i> Same-Day</div>
            <div className="trust-divider-saas"></div>
            <div className="trust-item-saas"><i className="fas fa-headset"></i> 24/7 Support</div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            className="stats-grid-saas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="stat-item-saas">
              <span className="stat-number-saas">{counters.services.toLocaleString()}+</span>
              <span className="stat-label-saas">Services Completed</span>
            </div>
            <div className="stat-item-saas">
              <span className="stat-number-saas">{counters.experts}+</span>
              <span className="stat-label-saas">Verified Experts</span>
            </div>
            <div className="stat-item-saas">
              <span className="stat-number-saas">{counters.cities}+</span>
              <span className="stat-label-saas">Cities Covered</span>
            </div>
            <div className="stat-item-saas">
              <span className="stat-number-saas">{counters.satisfaction}%</span>
              <span className="stat-label-saas">Satisfaction</span>
            </div>
          </motion.div>

          {/* Emergency Banner — Desktop only, below stats */}
          <motion.div
            className="emergency-banner-desktop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="emergency-content">
              <i className="fas fa-bolt"></i>
              <span>⚡ Emergency Home Services Available 24/7</span>
              <i class="fa-solid fa-phone"></i>
              <span className="emergency-number">Call Now: +919313464150</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT SIDE - Floating Dashboard */}
        <div className="hero-right-saas">
          <motion.div
            className="dashboard-panel-saas"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Service Cards Grid */}
            <div className="service-cards-grid-saas">
              {serviceCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  className={`service-card-saas ${selectedService === card.name ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedService(card.name)}
                  style={{
                    borderColor: selectedService === card.name ? card.color : 'rgba(255,255,255,0.1)',
                    boxShadow: selectedService === card.name ? `0 0 20px ${card.color}40` : 'none'
                  }}
                >
                  <div className="service-card-icon" style={{ background: `${card.color}20`, color: card.color }}>
                    <i className={`fas ${card.icon}`}></i>
                  </div>
                  <div className="service-card-info">
                    <h4>{card.name}</h4>
                    <div className="service-card-meta">
                      <span className="eta"><i className="fas fa-clock"></i> {card.eta}</span>
                      <span className="rating"><i className="fas fa-star"></i> {card.rating}</span>
                    </div>
                    <span className={`status ${card.status === 'Available Now' ? 'available' : 'busy'}`}>
                      {card.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Booking Widget */}
            <motion.div
              className="live-booking-widget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="widget-header">
                <i className="fas fa-circle-pulse"></i>
                <span>Live Booking Simulation</span>
                <div className="pulse-dot"></div>
              </div>
              <div className="widget-content">
                <div className="booking-service">
                  <span>Selected Service:</span>
                  <strong>{selectedService}</strong>
                </div>
                <div className="booking-tech">
                  <span>Technician Assigned:</span>
                  <strong>Rajesh K. <i className="fas fa-badge-check"></i></strong>
                </div>
                <div className="booking-eta">
                  <span>ETA Countdown:</span>
                  <div className="eta-countdown">
                    <motion.div
                      className="eta-progress"
                      initial={{ width: '100%' }}
                      animate={{ width: `${(etaMinutes / 18) * 100}%` }}
                      transition={{ duration: 60, ease: "linear" }}
                    />
                    <strong>{etaMinutes} mins</strong>
                  </div>
                </div>
                <div className="tracking-pulse">
                  <i className="fas fa-location-dot"></i>
                  <span>Technician arriving in {etaMinutes} mins</span>
                  <div className="pulse-ring"></div>
                </div>
              </div>
            </motion.div>

            {/* AI Smart Suggestions */}
            <div className="ai-suggestions">
              {aiSuggestions.map((suggestion, idx) => (
                <motion.div
                  key={idx}
                  className="ai-suggestion-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ x: 5, borderColor: suggestion.glow }}
                >
                  <div className="ai-icon" style={{ color: suggestion.glow }}>
                    <i className={`fas ${suggestion.icon}`}></i>
                  </div>
                  <span>{suggestion.text}</span>
                  <i className="fas fa-arrow-right"></i>
                </motion.div>
              ))}
            </div>

            {/* Mini How It Works */}
            <div className="how-it-works-saas">
              {howItWorks.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="step-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <div className="step-icon" style={{ boxShadow: `0 0 10px ${step.glow}` }}>
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <span>{step.step}</span>
                  {idx < howItWorks.length - 1 && <div className="step-connector" style={{ background: step.glow }}></div>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Emergency Banner — Mobile only, fixed bottom */}
      <motion.div
        className="emergency-banner-mobile"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="emergency-content">
          <i className="fas fa-bolt"></i>
          <span>⚡ Emergency 24/7</span>
          <i className="fas fa-phone-alt"></i>
          <span className="emergency-number">+919313464150</span>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        className="scroll-hint-saas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>SCROLL</span>
        <div className="scroll-line-saas"></div>
      </motion.div>
    </div>
  );
};