import React, { useState } from 'react';
import { Search, Menu, Sun, Moon, LogOut, Bell, ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log('Searching for:', searchQuery);
            // Implement actual search routing logic here if needed
            // navigate(`/posts?search=${searchQuery}`);
        }
    };

    if (!user || !user.isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-body)' }}>
            {/* Sidebar - Fixed Width */}
            <Sidebar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />

            {/* Main Content Wrapper */}
            <div className="flex-grow-1 d-flex flex-column min-vh-100 transition-all"
                style={{ marginLeft: 'var(--sidebar-width, 0px)' }}> {/* Dynamic margin handling in Sidebar logic or CSS media query */}

                {/* Top Header - Single Instance */}
                <header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top shadow-sm" style={{ height: '70px', zIndex: 1020 }}>
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-light d-md-none p-2 rounded-circle border-0"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                        >
                            <Menu size={20} />
                        </button>
                        {/* Breadcrumbs or Page Title could go here, but keeping it clean for now */}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {/* Search Bar - Working Input */}
                        <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-2 border">
                            <Search size={16} className="text-secondary me-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="border-0 bg-transparent text-dark small outline-none"
                                style={{ outline: 'none', width: '200px' }}
                            />
                        </div>

                        {/* Actions */}
                        <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
                            <button onClick={toggleTheme} className="btn btn-ghost rounded-circle p-2 text-secondary hover-bg-light" title="Toggle Theme">
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {/* Notifications Dropdown */}
                            <div className="position-relative">
                                <button
                                    className="btn btn-ghost rounded-circle p-2 text-secondary hover-bg-light position-relative"
                                    onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                                >
                                    <Bell size={20} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white p-1">
                                        <span className="visually-hidden">Alerts</span>
                                    </span>
                                </button>
                                {showNotifications && (
                                    <div className="position-absolute end-0 mt-2 bg-white border rounded-3 shadow-lg p-0 overflow-hidden" style={{ width: '280px', zIndex: 1050 }}>
                                        <div className="p-2 border-bottom fw-bold small text-muted">Notifications</div>
                                        <div className="p-4 text-center text-muted small">No new alerts</div>
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown - Manual Toggle */}
                            <div className="dropdown ms-2 position-relative">
                                <button
                                    className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2"
                                    type="button"
                                    onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                                >
                                    <img
                                        src={user?.profileImage}
                                        alt="Profile"
                                        className="rounded-circle object-fit-cover shadow-sm border border-white"
                                        style={{ width: '38px', height: '38px' }}
                                    />
                                    <div className="d-none d-lg-block text-start lh-1">
                                        <div className="small fw-bold text-dark">{user?.name}</div>
                                        <small className="text-muted" style={{ fontSize: '0.7em' }}>Admin</small>
                                    </div>
                                    <ChevronDown size={14} className="text-muted ms-1" />
                                </button>
                                {showProfileMenu && (
                                    <ul className="dropdown-menu show dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 position-absolute end-0">
                                        <li><button className="dropdown-item py-2 small" onClick={logout}><LogOut size={14} className="me-2" /> Sign Out</button></li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 p-lg-5 flex-grow-1 overflow-auto">
                    <div className="container-fluid p-0" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
                    style={{ zIndex: 1030 }}
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
