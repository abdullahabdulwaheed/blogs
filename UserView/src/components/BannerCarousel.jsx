import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const banners = [
    {
        id: 1,
        title: "The Future of AI: A New Era Begins",
        subtitle: "TECHNOLOGY & SOCIETY",
        desc: "Experts discuss the implications of artificial general intelligence at the global tech summit.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Global Markets Reach Historic Highs",
        subtitle: "ECONOMY WATCH",
        desc: "Investors celebrate as major indices break records for the third consecutive week.",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Sustainable Architecture Awards 2025",
        subtitle: "CULTURE & DESIGN",
        desc: "How modern cities are transforming with green buildings and eco-friendly urban planning.",
        image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop"
    }
];

const BannerCarousel = () => {
    const [banners, setBanners] = useState([]);
    const [curr, setCurr] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/banners');
                if (data && data.length > 0) {
                    setBanners(data);
                } else {
                    // Fallback if no banners from API
                    setBanners([
                        {
                            id: 1,
                            title: "Welcome to The Daily Post",
                            subtitle: "EDITORIAL",
                            desc: "Your trusted source for the latest news and technology insights.",
                            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
                        }
                    ]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch banners", err);
                setBanners([
                    {
                        id: 1,
                        title: "Welcome to The Daily Post",
                        subtitle: "EDITORIAL",
                        desc: "Your trusted source for the latest news and technology insights.",
                        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
                    }
                ]);
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;
        const timer = setInterval(() => {
            setCurr((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [banners]);

    if (loading) return null; // Or a skeleton

    return (
        <div className="position-relative overflow-hidden bg-dark" style={{ height: '65vh', minHeight: '500px' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={curr}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-100 h-100 position-relative"
                >
                    {/* Background Basic Image */}
                    <div
                        className="position-absolute w-100 h-100"
                        style={{
                            backgroundImage: `url(${banners[curr].image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Gradient Overlay */}
                        <div className="position-absolute w-100 h-100"
                            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }}>
                        </div>
                    </div>

                    <div className="container h-100 position-relative d-flex align-items-center">
                        <div className="col-md-8 col-lg-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <span className="d-inline-block bg-white text-black px-2 py-1 small fw-bold text-uppercase mb-3 sans letter-spacing-2">
                                    {banners[curr].subtitle}
                                </span>
                                <h1 className="display-4 fw-bold text-white mb-3 serif lh-1">
                                    {banners[curr].title}
                                </h1>
                                <p className="lead text-light opacity-75 mb-4 serif">
                                    {banners[curr].desc}
                                </p>
                                <Link to="/categories" className="btn btn-outline-light rounded-0 text-uppercase fw-bold px-4 py-2 d-inline-flex align-items-center gap-2 sans" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                                    Read Full Story <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x p-4 d-flex gap-3">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurr(i)}
                        className={`border-0 rounded-circle transition-all ${i === curr ? 'bg-white scale-110' : 'bg-white opacity-50'}`}
                        style={{
                            width: '10px',
                            height: '10px',
                            padding: 0,
                            transform: i === curr ? 'scale(1.2)' : 'scale(1)'
                        }}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
