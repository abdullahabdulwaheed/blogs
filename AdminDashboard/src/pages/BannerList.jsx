import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Quick Add State
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/banners/admin', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBanners(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://blogs-backend-bde8.onrender.com/api/banners', {
                title, subtitle, desc, image
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchBanners();
            setShowForm(false);
            setTitle(''); setSubtitle(''); setDesc(''); setImage('');
        } catch (err) {
            alert('Error creating banner');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Delete banner?')) {
            try {
                await axios.delete(`https://blogs-backend-bde8.onrender.com/api/banners/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchBanners();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const toggleStatusHandler = async (banner) => {
        try {
            await axios.put(`https://blogs-backend-bde8.onrender.com/api/banners/${banner._id}`, {
                isActive: !banner.isActive
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchBanners();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title fw-bold mb-0 text-dark">Homepage Banners</h5>
                    <p className="text-muted small mb-0">Manage carousel content.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <Plus size={16} /> Add Banner
                </button>
            </div>

            {showForm && (
                <div className="p-4 bg-light border-bottom">
                    <h6 className="fw-bold mb-3">New Banner</h6>
                    <form onSubmit={submitHandler} className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control border-0 bg-white" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control border-0 bg-white" placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control border-0 bg-white" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control border-0 bg-white" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary fw-bold text-uppercase small">Create Banner</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 small fw-bold text-muted border-0">Preview</th>
                                <th className="py-3 small fw-bold text-muted border-0">Content</th>
                                <th className="py-3 small fw-bold text-muted border-0">Status</th>
                                <th className="py-3 pe-4 small fw-bold text-muted border-0 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((banner) => (
                                <tr key={banner._id}>
                                    <td className="ps-4 py-3" style={{ width: '120px' }}>
                                        <div className="rounded-3 overflow-hidden bg-light border" style={{ height: '60px', width: '100px' }}>
                                            {banner.image ? <img src={banner.image} alt="" className="w-100 h-100 object-fit-cover" /> : <ImageIcon size={24} className="m-auto text-secondary" />}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{banner.title}</div>
                                        <div className="small text-muted text-truncate" style={{ maxWidth: '300px' }}>{banner.desc}</div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={banner.isActive}
                                                onChange={() => toggleStatusHandler(banner)}
                                            />
                                        </div>
                                    </td>
                                    <td className="pe-4 text-end">
                                        <button onClick={() => deleteHandler(banner._id)} className="btn btn-light btn-sm text-danger hover-bg-danger rounded-circle p-2">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BannerList;
