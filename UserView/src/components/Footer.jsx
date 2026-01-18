import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-5 border-top border-dark pt-5 pb-3 bg-paper">
            <div className="container">
                <div className="row g-4 mb-5">
                    <div className="col-12 col-md-4">
                        <Link to="/" className="text-decoration-none d-block mb-3">
                            <h2 className="serif fw-bold h3 text-ink mb-0">The Daily Post</h2>
                            <span className="small sans text-secondary text-uppercase letter-spacing-2">Est. 2024</span>
                        </Link>
                        <p className="small text-secondary mb-4 serif fst-italic">
                            Delivering the latest breaking news, sports, politics, and cultural stories from around the globe.
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
                            <li><Link to="/about" className="text-secondary text-decoration-none hover-text-ink">About Us</Link></li>
                            <li><Link to="/careers" className="text-secondary text-decoration-none hover-text-ink">Careers</Link></li>
                            <li><Link to="/contact" className="text-secondary text-decoration-none hover-text-ink">Contact</Link></li>
                            <li><Link to="/privacy" className="text-secondary text-decoration-none hover-text-ink">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5 className="sans fw-bold text-uppercase small mb-3 text-ink">Subscribe</h5>
                        <p className="small text-secondary mb-3">Get the latest headlines delivered to your inbox.</p>
                        <form className="d-flex gap-2">
                            <input type="email" className="form-control rounded-0 border-dark small" placeholder="Your email address" />
                            <button className="btn btn-dark rounded-0 text-uppercase small px-3 fw-bold">Join</button>
                        </form>
                    </div>
                </div>

                <div className="border-top border-secondary pt-3 text-center">
                    <p className="small text-secondary m-0 sans">&copy; {new Date().getFullYear()} The Daily Post. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
