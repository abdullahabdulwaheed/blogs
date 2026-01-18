import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/posts');
            setPosts(data.posts);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`https://blogs-backend-bde8.onrender.com/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchPosts();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title fw-bold mb-0 text-dark">All Stories</h5>
                    <p className="text-muted small mb-0">Manage your publication archives.</p>
                </div>
                <Link to="/posts/new" className="btn btn-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <Plus size={16} /> New Story
                </Link>
            </div>

            <div className="p-3 bg-light border-bottom d-flex align-items-center gap-3">
                <div className="position-relative flex-grow-1">
                    <Search size={16} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3" />
                    <input type="text" placeholder="Search stories..." className="form-control border-0 bg-white ps-5 text-dark" />
                </div>
                <button className="btn btn-white border shadow-sm d-flex align-items-center gap-2 text-secondary">
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 text-uppercase small fw-bold text-muted ps-4 py-3">Story</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Category</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Status</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Views</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Date</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3 pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id} style={{ cursor: 'pointer' }}>
                                <td className="ps-4 py-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-3 overflow-hidden" style={{ width: '48px', height: '48px' }}>
                                            <img src={post.featuredImage} alt="" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div>
                                            <p className="fw-bold mb-0 text-dark text-truncate" style={{ maxWidth: '280px' }}>{post.title}</p>
                                            <p className="small text-muted mb-0">by {post.author.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge bg-light text-dark border fw-normal rounded-pill px-2">
                                        {post.category.name}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge rounded-pill px-2 py-1 fw-normal ${post.isPublished ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                        {post.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="small fw-bold text-dark">{post.views.toLocaleString()}</td>
                                <td className="text-muted small">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="pe-4 text-end">
                                    <div className="d-flex align-items-center justify-content-end gap-2">
                                        <Link to={`/posts/edit/${post._id}`} className="btn btn-light btn-sm p-1 text-secondary">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => deleteHandler(post._id)} className="btn btn-light btn-sm p-1 text-danger hover-bg-danger">
                                            <Trash2 size={16} />
                                        </button>
                                        <a href={`http://localhost:5174/post/${post.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm p-1 text-primary">
                                            <Eye size={16} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card-footer bg-white border-top py-3 px-4">
                <div className="d-flex justify-content-between align-items-center small text-muted">
                    <span>Showing {posts.length} entries</span>
                    <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light disabled">Previous</button>
                        <button className="btn btn-sm btn-light">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;
