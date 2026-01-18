import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpRight, ArrowDownRight, Users, Eye, FileText, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Filler, Legend
} from 'chart.js';
import { useAuth } from '../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('https://blogs-backend-bde8.onrender.com/api/posts/admin/stats', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchStats();
    }, [user]);

    if (loading) return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '60vh' }}>
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    const chartData = {
        labels: stats?.viewsStats.map(s => s.label) || [],
        datasets: [{
            fill: true,
            label: 'Views',
            data: stats?.viewsStats.map(s => s.value) || [],
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#4F46E5',
            pointBorderWidth: 2
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter' } }, border: { display: false } },
            x: { grid: { display: false }, ticks: { font: { family: 'Inter' } }, border: { display: false } }
        }
    };

    return (
        <div className="fade-in">
            {/* Page Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5">
                <div>
                    <h1 className="h3 fw-bold text-dark mb-1">Dashboard Overview</h1>
                    <p className="text-muted mb-0">Welcome back, here's what's happening with your blog today.</p>
                </div>
                <div className="d-flex gap-2 mt-3 mt-md-0">
                    <select className="form-select form-select-sm border-0 bg-white shadow-sm rounded-3">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                    <button className="btn btn-primary btn-sm rounded-3 px-3 shadow-sm font-medium">Export Report</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="row g-4 mb-5">
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard
                        icon={FileText}
                        label="Total Posts"
                        value={stats?.totalPosts || 0}
                        trend="+2.5%"
                        trendUp={true}
                        color="primary"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard
                        icon={Eye}
                        label="Total Views"
                        value={stats?.totalViews?.toLocaleString() || 0}
                        trend="+12%"
                        trendUp={true}
                        color="success"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard
                        icon={Users}
                        label="New Users"
                        value="842"
                        trend="+5.4%"
                        trendUp={true}
                        color="info"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard
                        icon={Activity}
                        label="Bounce Rate"
                        value="42%"
                        trend="-1.2%"
                        trendUp={false}
                        color="warning"
                    />
                </div>
            </div>

            {/* Charts & Content */}
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="card-title fw-bold mb-0 text-dark h6">Traffic Analysis</h5>
                            <button className="btn btn-light btn-sm rounded-circle p-1"><ArrowUpRight size={16} /></button>
                        </div>
                        <div className="card-body px-4 pb-4">
                            <div style={{ height: '320px' }}>
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 px-4">
                            <h5 className="card-title fw-bold mb-0 text-dark h6">Top Categories</h5>
                        </div>
                        <div className="card-body px-4 d-flex flex-column gap-4">
                            <CategoryProgress label="Technology" count="1,204" percentage={75} color="bg-primary" />
                            <CategoryProgress label="Lifestyle" count="842" percentage={45} color="bg-info" />
                            <CategoryProgress label="Travel" count="654" percentage={32} color="bg-success" />
                            <CategoryProgress label="Food" count="423" percentage={20} color="bg-warning" />
                        </div>
                        <div className="card-footer bg-white border-0 p-4 text-center">
                            <button className="btn btn-outline-light text-primary w-100 fw-medium btn-sm rounded-pill">View All Categories</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }) => (
    <div className="card border-0 shadow-sm rounded-4 h-100 transition-hover">
        <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div className={`p-2 rounded-3 bg-${color} bg-opacity-10 text-${color}`}>
                    <Icon size={22} />
                </div>
                <div className={`d-flex align-items-center gap-1 small fw-bold ${trendUp ? 'text-success' : 'text-danger'}`}>
                    {trend}
                    {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
            </div>
            <div>
                <h3 className="fw-bold text-dark mb-1">{value}</h3>
                <p className="text-muted small mb-0 fw-medium">{label}</p>
            </div>
        </div>
    </div>
);

const CategoryProgress = ({ label, count, percentage, color }) => (
    <div>
        <div className="d-flex justify-content-between mb-1">
            <span className="small fw-bold text-dark">{label}</span>
            <span className="small text-muted">{count} posts</span>
        </div>
        <div className="progress rounded-pill bg-light" style={{ height: '6px' }}>
            <div className={`progress-bar rounded-pill ${color}`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default Dashboard;
