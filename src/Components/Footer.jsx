import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import './Footer.css'

export const Footer = () => {
    return (
        <footer className="footer">
            {/* Top glow line */}
            <div className="footer-topline" />

            <div className="footer-container">

                {/* Brand Column */}
                <div className="footer-brand">
                    <h2 className="footer-logo">Fix<span>ora</span></h2>
                    <p className="footer-tagline">
                        Trusted home services at your doorstep. Fast, reliable & verified professionals for every need.
                    </p>
                    <div className="footer-socials">
                        {[
                            { icon: 'fa-instagram', href: '#' },
                            { icon: 'fa-facebook', href: '#' },
                            { icon: 'fa-twitter', href: '#' },
                            { icon: 'fa-whatsapp', href: '#' },
                        ].map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                className="social-icon"
                                whileHover={{ y: -4, color: '#FF6B00' }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            >
                                <i className={`fab ${s.icon}`}></i>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <h4 className="footer-col__title">Quick Links</h4>
                    <ul>
                        {['Home', 'About', 'Services', 'How It Works', 'Contact'].map((item, i) => (
                            <motion.li
                                key={i}
                                whileHover={{ x: 5, color: '#FF6B00' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-col">
                    <h4 className="footer-col__title">Our Services</h4>
                    <ul>
                        {['AC Repair', 'Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Pest Control', 'CCTV Setup', 'Carpenter'].map((item, i) => (
                            <motion.li
                                key={i}
                                whileHover={{ x: 5, color: '#FF6B00' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                <a href="#">{item}</a>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <h4 className="footer-col__title">Contact Us</h4>
                    <ul className="footer-contact">
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Anand, Gujarat, India</span>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span>+91 9313464150</span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i>
                            <span>support@fixora.in</span>
                        </li>
                        <li>
                            <i className="fas fa-clock"></i>
                            <span>Mon – Sat, 8am – 8pm</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <span>© 2025 Fixora. All rights reserved.</span>
                <div className="footer-bottom__links">
                    <a href="#">Privacy Policy</a>
                    <span className="dot">·</span>
                    <a href="#">Terms of Service</a>
                    <span className="dot">·</span>
                    <a href="#">Refund Policy</a>
                </div>
            </div>

        </footer>
    )
}