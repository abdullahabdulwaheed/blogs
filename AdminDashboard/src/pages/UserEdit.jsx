import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Save, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [loading, setLoading] = useState(false); // Changed initial state to false

    useEffect(() => {
        if (!currentUser || !currentUser.isSuperAdmin) {
            navigate('/');
            return;
        }

        if (id) { // Only fetch user if an ID is present (edit mode)
            setLoading(true);
            const fetchUser = async () => {
                try {
                    const { data } = await axios.get(`https://blogs-backend-bde8.onrender.com/api/users/${id}`, {
                        headers: { Authorization: `Bearer ${currentUser.token}` }
                    });

                    setName(data.name);
                    setEmail(data.email);
                    setIsAdmin(data.isAdmin);
                    setIsSuperAdmin(data.isSuperAdmin || false);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    alert('Error fetching user');
                    navigate('/users');
                }
            };
            fetchUser();
        }
    }, [id, currentUser, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (id) { // Update existing user
                await axios.put(`https://blogs-backend-bde8.onrender.com/api/users/${id}`, {
                    name,
                    email,
                    isAdmin,
                    isSuperAdmin
                }, {
                    headers: { Authorization: `Bearer ${currentUser.token}` }
                });
            } else { // Create new user
                await axios.post(`https://blogs-backend-bde8.onrender.com/api/users/create`, {
                    name,
                    email,
                    password,
                    isAdmin,
                    isSuperAdmin
                }, {
                    headers: { Authorization: `Bearer ${currentUser.token}` }
                });
            }
            navigate('/users');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return (
        <div className="p-4 text-center">
            <div className="spinner-border text-danger" role="status"></div>
            <div className="mt-2 text-uppercase ls-widest small fw-bold" style={{ fontFamily: 'var(--font-mono)' }}>Accessing Personnel Records...</div>
        </div>
    );

    return (
        <AdminLayout>
            <form onSubmit={submitHandler} className="container pb-5" style={{ maxWidth: '800px' }}>
                <div className="d-flex justify-content-between align-items-center mb-5 pb-4 border-bottom border-danger border-opacity-10">
                    <div className="vintage-box border-0 border-start border-5 border-danger ps-4">
                        <h2 className="display-6 fw-bold mb-1 text-uppercase ls-widest neon-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem' }}>{id ? 'Identity Modification' : 'Personnel Recruitment'}</h2>
                        <p className="text-secondary small text-uppercase ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>Clearance Protocol // Sector 7 Database</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/users')}
                            className="btn btn-outline-danger border-opacity-25 rounded-0 px-4 py-2 small fw-bold text-uppercase d-flex align-items-center gap-2"
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
                        >
                            <X size={16} /> TERMINATE
                        </button>
                        <button
                            type="submit"
                            className="btn-st px-4 py-2 d-flex align-items-center gap-2"
                        >
                            <Save size={16} /> {id ? 'UPDATE_IDENTITY' : 'COMMIT_RECRUIT'}
                        </button>
                    </div>
                </div>

                <div className="vintage-box p-4" data-fig="PERSONNEL-ID-X42" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <div className="d-flex flex-column gap-2">
                        <div className="st-schematic-field" data-index="01">
                            <label className="small fw-bold text-uppercase text-danger opacity-75 mb-2 d-block ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>FULL_IDENTITY_NAME</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="st-schematic-input"
                                required
                                placeholder="ENTER FULL NAME..."
                            />
                        </div>

                        <div className="st-schematic-field" data-index="02">
                            <label className="small fw-bold text-uppercase text-danger opacity-75 mb-2 d-block ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>ENCRYPTED_UPLINK_EMAIL</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="st-schematic-input"
                                required
                                placeholder="ENTER EMAIL ADDRESS..."
                            />
                        </div>

                        {!id && (
                            <div className="st-schematic-field" data-index="03">
                                <label className="small fw-bold text-uppercase text-danger opacity-75 mb-2 d-block ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>INITIAL_ACCESS_KEY</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="st-schematic-input"
                                    required={!id}
                                    placeholder="SET ACCESS KEY..."
                                />
                            </div>
                        )}

                        <div className="p-4 border border-danger border-opacity-10" style={{ backgroundColor: 'rgba(200, 16, 46, 0.03)' }}>
                            <h5 className="fw-bold mb-3 text-uppercase ls-widest" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Clearance Parameters</h5>
                            <div className="d-flex flex-column gap-3">
                                <div className="form-check d-flex align-items-center gap-2 ps-0">
                                    <input
                                        type="checkbox"
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                        className="form-check-input m-0 border-danger rounded-0"
                                        style={{ width: '1.25em', height: '1.25em', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        id="adminCheck"
                                    />
                                    <label className="form-check-label small fw-bold text-uppercase cursor-pointer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }} htmlFor="adminCheck">
                                        LEVEL-03 Clearance (Access Dashboard)
                                    </label>
                                </div>

                                <div className="form-check d-flex align-items-center gap-2 ps-0">
                                    <input
                                        type="checkbox"
                                        checked={isSuperAdmin}
                                        onChange={(e) => setIsSuperAdmin(e.target.checked)}
                                        className="form-check-input m-0 border-danger rounded-0"
                                        style={{ width: '1.25em', height: '1.25em', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        id="superAdminCheck"
                                        disabled={email === 'abdullah35@gmail.com' && isSuperAdmin}
                                    />
                                    <label className="form-check-label small fw-bold text-uppercase cursor-pointer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }} htmlFor="superAdminCheck">
                                        LEVEL-05 Clearance (Full Control)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default UserEdit;
