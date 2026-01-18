import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

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
            alert('Unauthorized access or invalid credentials');
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 p-md-5 w-100 border shadow-sm rounded-3 bg-white"
                style={{ maxWidth: '420px' }}
            >
                <div className="text-center mb-4">
                    <h2 className="h4 fw-bold mb-2">Admin Login</h2>
                    <p className="text-muted small">Enter your credentials to access the management system.</p>
                </div>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-1">
                        <label className="small fw-bold text-muted">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Mail size={16} /></span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control border-start-0 ps-0"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-1">
                        <label className="small fw-bold text-muted">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Lock size={16} /></span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control border-start-0 ps-0"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100 py-2 mt-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        Sign In <ArrowRight size={16} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
