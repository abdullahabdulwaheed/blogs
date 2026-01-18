import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const PostCard = ({ post, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="article-card h-100"
        >
            <div className="mb-3 overflow-hidden rounded-0">
                <Link to={`/post/${post.slug}`} className="d-block overflow-hidden position-relative">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-100 object-fit-cover"
                        style={{ height: '240px' }}
                    />
                    <div className="position-absolute bottom-0 start-0 bg-white text-dark px-2 py-1 small fw-bold text-uppercase border-top border-end border-dark" style={{ fontSize: '0.7rem' }}>
                        {post.category.name}
                    </div>
                </Link>
            </div>

            <div className="d-flex align-items-center gap-3 small text-muted text-uppercase fw-bold mb-2">
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-muted">•</span>
                <span className="d-flex align-items-center gap-1"><Clock size={12} /> {post.readingTime} min read</span>
            </div>

            <Link to={`/post/${post.slug}`} className="text-decoration-none text-body">
                <h3 className="article-title hover-text-accent">
                    {post.title}
                </h3>
            </Link>

            <p className="card-text text-secondary mb-3 serif text-truncate-2">
                {post.excerpt}
            </p>

            <Link to={`/post/${post.slug}`} className="text-decoration-none fw-bold text-uppercase small d-inline-flex align-items-center gap-2 border-bottom border-dark pb-1 text-dark">
                Read Article <ArrowRight size={14} />
            </Link>
        </motion.div>
    );
};

export default PostCard;
