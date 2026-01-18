import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Save, Loader } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [siteName, setSiteName] = useState('');
    const [siteTitle, setSiteTitle] = useState('');
    const [logo, setLogo] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/settings');
            setSiteName(data.siteName);
            setSiteTitle(data.siteTitle);
            setLogo(data.logo);
            setFacebook(data.socials?.facebook || '');
            setTwitter(data.socials?.twitter || '');
            setInstagram(data.socials?.instagram || '');
            setLinkedin(data.socials?.linkedin || '');
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put('https://blogs-backend-bde8.onrender.com/api/settings', {
                siteName,
                siteTitle,
                logo,
                socials: { facebook, twitter, instagram, linkedin }
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMessage('Settings updated successfully!');
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error updating settings.');
            setSaving(false);
        }
    };

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-white border-bottom py-3 px-4">
                        <h5 className="card-title fw-bold mb-0 text-dark">Global Settings</h5>
                        <p className="text-muted small mb-0">Manage site identity and external links.</p>
                    </div>
                    <div className="card-body p-4">
                        {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} py-2 small`}>{message}</div>}

                        <form onSubmit={submitHandler}>
                            <h6 className="fw-bold text-dark mb-3 small text-uppercase">Site Identity</h6>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Site Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Tagline / Title</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        value={siteTitle}
                                        onChange={(e) => setSiteTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold text-muted">Logo URL</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        value={logo}
                                        onChange={(e) => setLogo(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <h6 className="fw-bold text-dark mb-3 small text-uppercase">Social Media</h6>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Facebook</label>
                                    <input type="text" className="form-control bg-light border-0" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Twitter (X)</label>
                                    <input type="text" className="form-control bg-light border-0" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Instagram</label>
                                    <input type="text" className="form-control bg-light border-0" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">LinkedIn</label>
                                    <input type="text" className="form-control bg-light border-0" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary fw-bold px-4 rounded-3 d-flex align-items-center gap-2" disabled={saving}>
                                    {saving ? <Loader size={18} className="spin" /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
