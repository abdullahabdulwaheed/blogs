import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Github } from 'lucide-react';
import axios from 'axios';

const NewsLogo = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="2" fill="currentColor" />
        <rect x="5" y="5" width="30" height="30" rx="1" fill="#FFFFFF" />
        <rect x="8" y="8" width="10" height="10" fill="currentColor" opacity="0.8" />
        <rect x="20" y="8" width="12" height="2" rx="0.5" fill="currentColor" />
        <rect x="20" y="12" width="12" height="2" rx="0.5" fill="currentColor" />
        <rect x="20" y="16" width="8" height="2" rx="0.5" fill="currentColor" />
        <rect x="8" y="22" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="25" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="28" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="31" width="15" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
    </svg>
);

const Footer = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('site_settings');
        const defaultSettings = { siteName: 'MKR-BLOGS', logo: '/logo-news.svg' };
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.logo === '/logo.png') parsed.logo = '/logo-news.svg';
            return parsed;
        }
        return defaultSettings;
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/settings');
                setSettings(data);
                localStorage.setItem('site_settings', JSON.stringify(data));
            } catch (err) {
                console.error("Settings fetch failed", err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="mt-5 border-top border-dark pt-5 pb-3 bg-paper">
            <div className="container">
                <div className="row g-4 mb-5">
                    <div className="col-12 col-md-4">
                        <Link to="/" className="text-decoration-none d-block mb-3">
                            {settings.logo && settings.logo !== '/logo.png' && settings.logo !== '/logo-news.svg' ? (
                                <img src={settings.logo} alt={settings.siteName} style={{ height: '40px', objectFit: 'contain', marginBottom: '1rem' }} />
                            ) : (
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <NewsLogo size={40} />
                                    <h2 className="serif fw-bold h3 text-ink mb-0">{settings.siteName}</h2>
                                </div>
                            )}
                            <span className="small sans text-secondary text-uppercase letter-spacing-2">DIGITAL ARCHIVE</span>
                        </Link>
                        <p className="small text-secondary mb-4 serif fst-italic">
                            Providing authentic narratives and in-depth analysis on global affairs, technology, and culture.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-ink hover-text-accent"><Twitter size={20} /></a>
                            <a href="#" className="text-ink hover-text-accent"><Instagram size={20} /></a>
                            <a href="#" className="text-ink hover-text-accent"><Facebook size={20} /></a>
                            <a href="#" className="text-ink hover-text-accent"><Github size={20} /></a>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <h5 className="sans fw-bold text-uppercase small mb-3 text-ink">Sections</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li><Link to="/categories" className="text-secondary text-decoration-none hover-text-ink">Politics</Link></li>
                            <li><Link to="/categories" className="text-secondary text-decoration-none hover-text-ink">Technology</Link></li>
                            <li><Link to="/categories" className="text-secondary text-decoration-none hover-text-ink">Culture</Link></li>
                            <li><Link to="/categories" className="text-secondary text-decoration-none hover-text-ink">Sports</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2">
                        <h5 className="sans fw-bold text-uppercase small mb-3 text-ink">Company</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li><Link to="/login" className="text-secondary text-decoration-none hover-text-ink">Admin Portal</Link></li>
                            <li><Link to="/categories" className="text-secondary text-decoration-none hover-text-ink">Archives</Link></li>
                            <li><Link to="/" className="text-secondary text-decoration-none hover-text-ink">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5 className="sans fw-bold text-uppercase small mb-3 text-ink">Subscribe</h5>
                        <p className="small text-secondary mb-3">Get the latest headlines delivered to your inbox.</p>
                        <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" className="form-control rounded-0 border-dark small bg-transparent text-ink" placeholder="Your email address" />
                            <button className="btn btn-dark rounded-0 text-uppercase small px-3 fw-bold">Join</button>
                        </form>
                    </div>
                </div>

                <div className="border-top border-secondary pt-3 text-center">
                    <p className="small text-secondary m-0 sans">&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
