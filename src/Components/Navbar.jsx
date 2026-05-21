import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import logo2 from '../../assets/logo2.jpg';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
    const [progress, setProgress] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const isWhitePage = ['/service', '/about', '/contact'].includes(location.pathname);

    useEffect(() => {
        if (isWhitePage) {
            setProgress(1);
            return;
        }
        const handleScroll = () => {
            setProgress(Math.min(window.scrollY / 300, 1));
        };
        setProgress(0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isWhitePage, location.pathname]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const isLight = progress > 0.5;
    const shouldRemoveBlur = sidebarOpen && isWhitePage;

    const navStyle = {
        background: shouldRemoveBlur ? 'rgb(255, 255, 255)' : `rgba(255, 255, 255, ${progress})`,
        backdropFilter: shouldRemoveBlur ? 'none' : (progress > 0.05 ? `blur(${progress * 14}px)` : 'none'),
        WebkitBackdropFilter: shouldRemoveBlur ? 'none' : (progress > 0.05 ? `blur(${progress * 14}px)` : 'none'),
        borderBottom: shouldRemoveBlur ? '1px solid rgba(0, 0, 0, 0.08)' : `1px solid rgba(0, 0, 0, ${progress * 0.08})`,
        boxShadow: shouldRemoveBlur ? '0 2px 20px rgba(0,0,0,0.08)' : `0 2px 20px rgba(0,0,0,${progress * 0.08})`,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
    };

    const navLinks = [
        { label: 'Home', to: '/home', icon: 'fa-house' },
        { label: 'About', to: '/about', icon: 'fa-circle-info' },
        { label: 'Services', to: '/service', icon: 'fa-screwdriver-wrench' },
        { label: 'Contact', to: '/contact', icon: 'fa-envelope' },
    ];

    return (
        <>
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <nav style={navStyle} className={isLight && !shouldRemoveBlur ? 'nav-light' : 'nav-dark'}>
                <div className='container nav-flex'>
                    <Link to="/">
                        <img
                            className='logo'
                            src={(isLight && !shouldRemoveBlur) ? logo2 : logo}
                            alt="Fixora Logo"
                        />
                    </Link>

                    <ul className='nav-links'>
                        {navLinks.map(({ label, to }) => (
                            <Link to={to} key={to}>
                                <li className={location.pathname === to ? 'nav-active' : ''}>
                                    {label}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <div className="btn-group">
                        <Link to="/login">
                            <motion.button
                                className='btn-login'
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        </Link>
                        <Link to="/signup">
                            <motion.button
                                className='btn-signup'
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign Up
                            </motion.button>
                        </Link>
                    </div>

                    <motion.button
                        className={`hamburger ${(isLight && !shouldRemoveBlur) ? 'hamburger-light' : 'hamburger-dark'}`}
                        onClick={() => setSidebarOpen(prev => !prev)}
                        whileTap={{ scale: 0.85 }}
                    >
                        <i className={`fas ${sidebarOpen ? 'fa-xmark' : 'fa-bars'}`} style={{ fontSize: 22 }}></i>
                    </motion.button>
                </div>
            </nav>

            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
                            <i className="fas fa-times"></i>
                        </div>

                        <ul>
                            {navLinks.map(({ label, to, icon }, i) => (
                                <motion.li
                                    key={to}
                                    initial={{ x: 40, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 + i * 0.07 }}
                                    onClick={() => setSidebarOpen(false)}
                                    className={location.pathname === to ? 'sidebar-li-active' : ''}
                                >
                                    <Link to={to}>
                                        <span className="sidebar-link">
                                            <span className="sidebar-icon">
                                                <i className={`fas ${icon}`}></i>
                                            </span>
                                            <span className="sidebar-label">{label}</span>
                                        </span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="sidebar-btn-group">
                            <Link to="/login" onClick={() => setSidebarOpen(false)}>
                                <button className='btn-log'>Login</button>
                            </Link>
                            <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                                <button className='btn-sign'>Sign Up</button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};