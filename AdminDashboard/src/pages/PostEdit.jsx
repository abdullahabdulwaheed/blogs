import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, X, Image as ImageIcon, Send, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../context/AuthContext';

const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isEdit = Boolean(id);

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [isPublished, setIsPublished] = useState(true);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await axios.get('http://localhost:5000/api/categories');
            setCategories(data);
        };
        fetchCategories();

        if (isEdit) {
            const fetchPost = async () => {
                const { data } = await axios.get(`http://localhost:5000/api/posts`);
                const post = data.posts.find(p => p._id === id);
                if (post) {
                    setTitle(post.title);
                    setExcerpt(post.excerpt);
                    setContent(post.content);
                    setCategory(post.category._id);
                    setFeaturedImage(post.featuredImage);
                    setIsFeatured(post.isFeatured);
                    setIsPublished(post.isPublished);
                }
            };
            fetchPost();
        }
    }, [id, isEdit]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFeaturedImage(data);
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            excerpt,
            content,
            category,
            featuredImage,
            isFeatured,
            isPublished,
        };

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/posts/${id}`, postData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/posts', postData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            navigate('/posts');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <button type="button" onClick={() => navigate('/posts')} className="btn btn-light rounded-circle p-2">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="h4 fw-bold mb-0 text-dark">{isEdit ? 'Edit Story' : 'New Story'}</h2>
                        <p className="text-muted small mb-0">Create and manage your content.</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/posts')}
                        className="btn btn-light px-4 fw-bold text-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark px-4 d-flex align-items-center gap-2 fw-bold"
                    >
                        <Save size={18} /> {isEdit ? 'Update Story' : 'Publish Story'}
                    </button>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Editor */}
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-uppercase text-muted">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control form-control-lg border-0 bg-light fw-bold fs-3 px-3 py-3"
                                    placeholder="Enter story title..."
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-uppercase text-muted">Content</label>
                                <div style={{ height: '500px' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        className="h-100 border-0"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, false] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Sidebar */}
                <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column gap-4">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4">
                                <label className="form-label small fw-bold text-uppercase text-muted mb-3">Publishing</label>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Excerpt</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        className="form-control bg-light border-0"
                                        rows="4"
                                        placeholder="Short summary for previews..."
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="form-select bg-light border-0"
                                        required
                                    >
                                        <option value="">Select Category...</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-check form-switch mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="publishedCheck"
                                        checked={isPublished}
                                        onChange={(e) => setIsPublished(e.target.checked)}
                                    />
                                    <label className="form-check-label small fw-bold" htmlFor="publishedCheck">Publicly Visible</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="featuredCheck"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    <label className="form-check-label small fw-bold" htmlFor="featuredCheck">Featured Story</label>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4">
                                <label className="form-label small fw-bold text-uppercase text-muted mb-3">Featured Image</label>
                                <div className="border border-2 border-dashed border-light rounded-3 p-4 text-center bg-light">
                                    {featuredImage ? (
                                        <div className="position-relative">
                                            <img src={featuredImage} alt="Preview" className="w-100 rounded-3 shadow-sm object-fit-cover" style={{ height: '180px' }} />
                                            <button
                                                type="button"
                                                onClick={() => setFeaturedImage('')}
                                                className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2 p-1"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="py-3">
                                            <ImageIcon size={32} className="text-secondary mb-2" />
                                            <p className="small text-muted mb-3">Support: JPG, PNG, GIF</p>
                                            <input type="file" onChange={uploadFileHandler} className="d-none" id="img-upload" />
                                            <label htmlFor="img-upload" className="btn btn-outline-primary btn-sm rounded-pill px-3">Choose File</label>
                                        </div>
                                    )}
                                    {uploading && <p className="small mt-2 text-primary fw-bold mb-0">Uploading...</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PostEdit;
