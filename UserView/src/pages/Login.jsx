import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            alert('Invalid login credentials');
        }
    };

    return (
        <Layout>
            <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="vintage-box p-4 p-md-5 w-100"
                    style={{ maxWidth: '480px', backgroundColor: 'var(--card-bg)' }}
                    data-fig="SCHEMATIC-AUTH-01"
                >
                    <div className="text-center mb-5">
                        <div className="st-logo-container d-inline-flex flex-column align-items-center p-0 border-0 mb-4">
                            <span className="st-logo fs-1">Abu</span>
                            <span className="text-danger fw-bold opacity-75" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.4em' }}>ARTICLES</span>
                        </div>
                        <h2 className="h5 fw-bold text-uppercase ls-widest neon-text mb-1" style={{ fontFamily: 'var(--font-mono)' }}>System Authentication</h2>
                        <div className="text-danger small fw-bold opacity-50" style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)' }}>TRANSMISSION_PROTOCOL: SECURE_UPLINK</div>
                    </div>

                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column gap-1">
                            <label className="small fw-bold text-uppercase text-danger opacity-75 ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>IDENTITY_LINK [UPLINK]</label>
                            <div className="vintage-box p-0 border-opacity-25" style={{ backgroundColor: 'rgba(200, 16, 46, 0.05)' }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="admin-input p-3 w-100 border-0 bg-transparent"
                                    placeholder="IDENTIFIER@HAWKINS.NET"
                                    required
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-1">
                            <label className="small fw-bold text-uppercase text-danger opacity-75 ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>ACCESS_KEY [ENCRYPTED]</label>
                            <div className="vintage-box p-0 border-opacity-25" style={{ backgroundColor: 'rgba(200, 16, 46, 0.05)' }}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="admin-input p-3 w-100 border-0 bg-transparent"
                                    placeholder="••••••••"
                                    required
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-st w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2"
                        >
                            INITIATE_BOOT_SEQUENCE
                        </button>
                    </form>

                    <div className="mt-5 pt-4 border-top border-danger border-opacity-10 text-center">
                        <p className="small fw-bold text-danger text-uppercase ls-widest mb-0 opacity-50" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                            Access restricted to authorized personnel only. // (C) 1984 HAWKINS LABS
                        </p>
                    </div>
                </motion.div>
            </div>

        </Layout>
    );
};

export default Login;
