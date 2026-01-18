import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/categories');
            setCategories(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        const trimmedName = name.trim();
        if (!trimmedName) return;

        // Simple Slug Generation
        const slug = trimmedName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        try {
            if (editId) {
                await axios.put(`https://blogs-backend-bde8.onrender.com/api/categories/${editId}`,
                    { name: trimmedName, slug, description },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
            } else {
                await axios.post('https://blogs-backend-bde8.onrender.com/api/categories',
                    { name: trimmedName, slug, description },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
            }
            fetchCategories();
            resetForm();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error occurred');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Delete category?')) {
            try {
                await axios.delete(`https://blogs-backend-bde8.onrender.com/api/categories/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchCategories();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const editHandler = (cat) => {
        setName(cat.name);
        setDescription(cat.description || '');
        setEditId(cat._id);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setEditId(null);
        setMessage('');
    };

    return (
        <div className="row g-4">
            {/* Form Section */}
            <div className="col-12 col-md-4 order-md-2">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-header bg-white border-bottom py-3 px-4">
                        <h5 className="card-title fw-bold mb-0 text-dark">{editId ? 'Edit Category' : 'Add Category'}</h5>
                    </div>
                    <div className="card-body p-4">
                        {message && <div className="alert alert-danger small py-2">{message}</div>}
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Technology"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Description</label>
                                <textarea
                                    className="form-control bg-light border-0"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Short description..."
                                ></textarea>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-dark w-100 fw-bold rounded-3">
                                    {editId ? 'Update' : 'Create'}
                                </button>
                                {editId && (
                                    <button type="button" onClick={resetForm} className="btn btn-light w-100 fw-bold rounded-3">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="col-12 col-md-8 order-md-1">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title fw-bold mb-0 text-dark">Categories</h5>
                            <p className="text-muted small mb-0">Manage post sections.</p>
                        </div>
                    </div>
                    <div className="p-3 bg-light border-bottom position-relative">
                        <Search size={16} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-4" />
                        <input type="text" placeholder="Search categories..." className="form-control border-0 bg-white ps-5 text-dark" />
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 text-uppercase small fw-bold text-muted ps-4 py-3">Name</th>
                                    <th className="border-0 text-uppercase small fw-bold text-muted py-3">Slug</th>
                                    <th className="border-0 text-uppercase small fw-bold text-muted py-3">Posts</th>
                                    <th className="border-0 text-uppercase small fw-bold text-muted py-3 pe-4 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat._id} style={{ cursor: 'pointer' }} onClick={() => editHandler(cat)}>
                                        <td className="ps-4 py-3 fw-bold text-dark">{cat.name}</td>
                                        <td className="text-muted small">{cat.slug}</td>
                                        <td><span className="badge bg-light text-dark border">0</span></td> {/* Count not implemented in API yet */}
                                        <td className="pe-4 text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); editHandler(cat); }} className="btn btn-light btn-sm p-1 text-primary">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); deleteHandler(cat._id); }} className="btn btn-light btn-sm p-1 text-danger">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && !loading && (
                                    <tr><td colSpan="4" className="text-center py-4 text-muted">No categories found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
