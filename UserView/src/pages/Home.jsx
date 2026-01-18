import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import BannerCarousel from '../components/BannerCarousel';
import FlashNews from '../components/FlashNews';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsRes = await axios.get('https://blogs-backend-bde8.onrender.com/api/posts');
                // Handle both { posts: [...] } and [...] response structures
                const postsData = postsRes.data.posts || postsRes.data;
                setPosts(Array.isArray(postsData) ? postsData : []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-paper">
            <div className="text-center">
                <div className="spinner-border text-dark mb-3" role="status"></div>
                <div className="text-uppercase small letter-spacing-2">Loading Content...</div>
            </div>
        </div>
    );

    return (
        <Layout>
            <Helmet>
                <title>MKR-BLOGS | Editorial Archive</title>
                <meta name="description" content="A curated collection of digital stories." />
            </Helmet>

            <FlashNews />

            <section className="banner-section mb-5">
                <BannerCarousel />
            </section>

            {/* Feature Boxes */}
            <section className="container mb-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="feature-box h-100">
                            <h5 className="font-serif fw-bold mb-2">Editorial Picks</h5>
                            <p className="text-muted small mb-3">Curated selection of our finest long-form articles and analysis.</p>
                            <Link to="/categories" className="btn-paper-outline py-1 px-3">Read More</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box h-100">
                            <h5 className="font-serif fw-bold mb-2">Technology & Science</h5>
                            <p className="text-muted small mb-3">Deep dives into the innovations powering our modern world.</p>
                            <Link to="/categories" className="btn-paper-outline py-1 px-3">Explore</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box h-100">
                            <h5 className="font-serif fw-bold mb-2">Archive</h5>
                            <p className="text-muted small mb-3">Browse the complete history of our publications.</p>
                            <Link to="/categories" className="btn-paper-outline py-1 px-3">View Archive</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Posts Grid */}
            <section className="section py-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4 border-bottom border-dark pb-3">
                        <div>
                            <h2 className="display-5 fw-bold serif mb-0">Latest Articles</h2>
                        </div>
                        <Link to="/categories" className="d-none d-md-flex align-items-center gap-2 text-decoration-none fw-bold text-body small">
                            VIEW ALL <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="row g-4">
                        {posts.map((post, index) => (
                            <div key={post._id} className="col-12 col-md-6 col-lg-4">
                                <PostCard post={post} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
