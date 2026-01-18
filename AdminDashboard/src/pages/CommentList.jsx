import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/comments/admin/my-comments', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setComments(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const approveHandler = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/comments/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Delete this comment?')) {
            try {
                await axios.delete(`http://localhost:5000/api/comments/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchComments();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom py-3 px-4">
                <h5 className="card-title fw-bold mb-0 text-dark">User Comments</h5>
                <p className="text-muted small mb-0">Moderate discussions on your stories.</p>
            </div>

            <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 text-uppercase small fw-bold text-muted ps-4 py-3">User</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Comment</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Post</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3">Status</th>
                            <th className="border-0 text-uppercase small fw-bold text-muted py-3 pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment._id}>
                                <td className="ps-4 py-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-light rounded-circle border d-flex align-items-center justify-content-center fw-bold text-secondary" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="fw-bold mb-0 text-dark small">{comment.name}</p>
                                            <p className="extra-small text-muted mb-0">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ maxWidth: '300px' }}>
                                    <p className="small text-secondary mb-0 text-truncate">{comment.content}</p>
                                </td>
                                <td>
                                    <span className="badge bg-light text-muted border fw-normal">ID: {comment.post.toString().substring(0, 6)}...</span>
                                </td>
                                <td>
                                    {comment.isApproved ? (
                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill fw-normal">Approved</span>
                                    ) : (
                                        <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill fw-normal">Pending</span>
                                    )}
                                </td>
                                <td className="pe-4 text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            onClick={() => approveHandler(comment._id)}
                                            className={`btn btn-sm p-1 rounded-circle ${comment.isApproved ? 'btn-light text-muted' : 'btn-success text-white'}`}
                                            title={comment.isApproved ? "Unapprove" : "Approve"}
                                        >
                                            <CheckCircle size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(comment._id)}
                                            className="btn btn-light btn-sm p-1 rounded-circle text-danger hover-bg-danger"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {comments.length === 0 && !loading && (
                            <tr><td colSpan="5" className="text-center py-4 text-muted">No comments found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommentList;
