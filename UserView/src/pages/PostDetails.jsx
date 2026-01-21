import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';

const PostDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`https://blogs-backend-bde8.onrender.com/api/posts/slug/${slug}`);
                setPost(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load transmission');
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const PostSkeleton = () => (
        <div className="container py-5">
            <div className="skeleton skeleton-text w-25 mb-4"></div>
            <div className="vintage-box p-4 p-md-5 mb-5">
                <div className="d-flex gap-3 mb-4">
                    <div className="skeleton skeleton-text w-25"></div>
                    <div className="skeleton skeleton-text w-25"></div>
                </div>
                <div className="skeleton skeleton-title mb-4"></div>
                <div className="d-flex align-items-center gap-3 mb-5">
                    <div className="skeleton rounded-circle" style={{ width: 40, height: 40 }}></div>
                    <div className="skeleton skeleton-text w-25"></div>
                </div>
                <div className="skeleton-img skeleton mb-5" style={{ height: '400px' }}></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text w-75"></div>
            </div>
        </div>
    );

    if (error || (!loading && !post)) return (
        <Layout>
            <div className="container py-5 text-center text-light">
                <h2 className="neon-text mb-4">TRANSMISSION LOST</h2>
                <Link to="/" className="btn-st">RETURN TO BASE</Link>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <Helmet>
                <title>{loading ? 'Loading...' : `${post.title} | MKR-BLOGS`}</title>
            </Helmet>

            {loading ? (
                <PostSkeleton />
            ) : (
                <article className="container py-5">
                    <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4 hover-text-danger small fw-bold text-uppercase ls-widest" style={{ color: 'var(--text-secondary)' }}>
                        <ArrowLeft size={16} /> RETURN TO ARCHIVE
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="vintage-box p-4 p-md-5 mb-5"
                        data-fig="FILE-X99"
                    >
                        <header className="mb-5 pb-4 border-bottom border-danger border-opacity-25">
                            <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                                <span className="badge bg-danger text-uppercase fw-bold ls-widest rounded-0 px-3 py-2" style={{ fontSize: '0.7rem' }}>
                                    {post.category?.name || 'UNCLASSIFIED'}
                                </span>
                                <div className="d-flex align-items-center gap-2 text-muted small fw-bold text-uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                                    <Calendar size={14} className="text-danger" />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted small fw-bold text-uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                                    <Clock size={14} className="text-danger" />
                                    {post.readingTime} MIN READ
                                </div>
                            </div>

                            <h1 className="display-4 fw-bold serif mb-4 neon-text">{post.title}</h1>

                            <div className="d-flex align-items-center gap-3">
                                <div className="vintage-box p-1 border-opacity-50" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                                    <img src={post.user?.profileImage || 'https://via.placeholder.com/150'} alt={post.user?.name} className="w-100 h-100 rounded-circle object-fit-cover grayscale" />
                                </div>
                                <div>
                                    <p className="mb-0 small fw-bold text-uppercase text-light ls-widest">{post.user?.name}</p>
                                    <p className="mb-0 small text-danger opacity-75" style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>AUTHORIZATION LEVEL 4</p>
                                </div>
                            </div>
                        </header>

                        {post.featuredImage && (
                            <div className="mb-5 position-relative overflow-hidden border border-danger border-opacity-25">
                                <img src={post.featuredImage} alt={post.title} className="w-100 h-auto" style={{ filter: 'grayscale(0.2) contrast(1.1)', maxHeight: '600px', objectFit: 'cover' }} loading="lazy" />
                                <div className="position-absolute bottom-0 end-0 bg-dark text-danger px-2 py-1 small fw-bold mono" style={{ fontSize: '0.6rem' }}>FIG. 1.1</div>
                            </div>
                        )}

                        <div className="article-content serif fs-5 lh-lg text-light opacity-90" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </motion.div>
                </article>
            )}
        </Layout>
    );
};

export default PostDetails;
