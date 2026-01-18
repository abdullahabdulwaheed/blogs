import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/categories');
                setCategories(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Layout>
            <Helmet>
                <title>Sectors | MKR-BLOGS</title>
            </Helmet>
            <div className="container py-5">
                <div className="vintage-box p-4 border-start border-5 border-danger mb-5">
                    <h1 className="h2 text-uppercase fw-bold text-danger mb-2 ls-widest" style={{ fontFamily: 'var(--font-mono)' }}>CLASSIFIED SECTORS</h1>
                    <p className="small opacity-75 mb-0">Select a secure channel to view archives.</p>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-danger" role="status"></div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {categories.map((cat, idx) => (
                            <div key={cat._id} className="col-md-6 col-lg-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="vintage-box p-4 h-100 hover-border-danger transition-all cursor-pointer"
                                    style={{ backgroundColor: 'var(--card-bg)' }}
                                >
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <Folder className="text-danger" size={24} />
                                        <h3 className="h5 fw-bold mb-0 text-uppercase ls-widest text-light">{cat.name}</h3>
                                    </div>
                                    <p className="small text-muted mb-4">{cat.description || 'No description available for this sector.'}</p>
                                    <Link to={`/category/${cat.slug}`} className="btn-st py-1 px-3 d-inline-block" style={{ fontSize: '0.7rem' }}>ACCESS FILES</Link>
                                </motion.div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="col-12 text-center text-muted">
                                <p>No sectors available yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Categories;
