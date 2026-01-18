import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed-top w-100 transition-all duration-300 ${isScrolled ? 'bg-paper border-bottom border-light shadow-sm py-2' : 'bg-transparent py-4'}`} style={{ zIndex: 1050 }}>


            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="text-decoration-none d-flex flex-column align-items-start group text-ink">
                    <h1 className="h3 mb-0 fw-bold serif" style={{ letterSpacing: '-0.02em' }}>The Daily Post</h1>
                    <span className="small text-uppercase text-secondary sans" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>EST. 2024</span>
                </Link>

                {/* Desktop Menu */}
                <div className="d-none d-md-flex align-items-center gap-4 text-uppercase fw-bold small sans">
                    <Link to="/" className="nav-link text-ink px-2">Home</Link>
                    <Link to="/categories" className="nav-link text-ink px-2">Sections</Link>
                    <div className="d-flex align-items-center gap-3 ms-3 border-start ps-4 border-secondary">
                        <button onClick={toggleTheme} className="btn-icon text-ink" title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        {user ? (
                            <>
                                <Link to="/profile" className="btn-icon text-ink" title="Profile">
                                    <User size={20} />
                                </Link>
                                <button onClick={logout} className="btn-icon text-ink" title="Sign Out">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn-paper px-3 py-1 text-decoration-none" style={{ fontSize: '0.75rem' }}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="btn btn-link d-md-none text-body" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="position-absolute start-0 w-100 glass p-4 d-md-none border-top border-secondary shadow"
                        style={{ top: '100%' }}
                    >
                        <div className="d-flex flex-column gap-3 text-center py-3 text-uppercase fw-bold small" style={{ fontFamily: 'var(--font-mono)' }}>
                            <Link to="/" className="text-body text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>Sectors</Link>
                            <Link to="/categories" className="text-body text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>Archives</Link>
                            <div className="border-bottom border-danger border-opacity-25 my-2"></div>
                            <div className="d-flex justify-content-center gap-3">
                                <button onClick={toggleTheme} className="btn-st-icon">
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                {user ? (
                                    <>
                                        <Link to="/profile" className="btn-st-icon" onClick={() => setIsMobileMenuOpen(false)}>
                                            <User size={20} />
                                        </Link>
                                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="btn-st-icon text-danger">
                                            <LogOut size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="btn-st-icon" onClick={() => setIsMobileMenuOpen(false)}>
                                        <LogIn size={20} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
