import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Tag,
    MessageSquare,
    Users,
    Settings,
    PlusCircle,
    ChevronRight,
    HelpCircle,
    Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NewsLogo = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="2" fill="currentColor" />
        <rect x="5" y="5" width="30" height="30" rx="1" fill="white" />
        <rect x="8" y="8" width="10" height="10" fill="currentColor" opacity="0.8" />
        <rect x="20" y="8" width="12" height="2" rx="0.5" fill="currentColor" />
        <rect x="20" y="12" width="12" height="2" rx="0.5" fill="currentColor" />
        <rect x="20" y="16" width="8" height="2" rx="0.5" fill="currentColor" />
        <rect x="8" y="22" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="25" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="28" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8" y="31" width="15" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
    </svg>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: PlusCircle, label: 'New Post', path: '/posts/new' },
        { icon: FileText, label: 'Posts', path: '/posts' },
        { icon: Tag, label: 'Categories', path: '/categories' },
        { icon: MessageSquare, label: 'Comments', path: '/comments' },
    ];

    // Add User Management for Super Admin
    if (user && user.isSuperAdmin) {
        menuItems.push({ icon: Users, label: 'Users', path: '/users' });
    }

    return (
        <>
            {/* Desktop Spacer */}
            <div className="d-none d-md-block" style={{ width: '260px', flexShrink: 0 }}></div>

            <aside
                className={`position-fixed top-0 start-0 h-100 bg-white border-end d-flex flex-column transition-transform shadow-sm`}
                style={{
                    width: '260px',
                    zIndex: 1040,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                {/* Logo Area */}
                <div className="px-4 d-flex align-items-center border-bottom" style={{ height: '70px' }}>
                    <div className="d-flex align-items-center gap-2">
                        <div className="text-primary">
                            <NewsLogo size={32} />
                        </div>
                        <div>
                            <span className="fw-bold text-dark fs-5 tracking-tight d-block lh-1">Admin<span className="text-primary">Panel</span></span>
                            {user?.isSuperAdmin && <span className="text-muted extra-small fw-bold">SUPER ACCESS</span>}
                        </div>
                    </div>
                </div>

                <nav className="flex-grow-1 p-3 overflow-auto custom-scrollbar">
                    <p className="px-3 mb-2 small fw-bold text-uppercase text-muted" style={{ fontSize: '0.7rem' }}>Main Menu</p>
                    <ul className="list-unstyled d-flex flex-column gap-1 mb-4">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`d-flex align-items-center justify-content-between px-3 py-2 rounded-3 text-decoration-none transition-all ${isActive
                                            ? 'bg-primary text-white shadow-sm fw-medium'
                                            : 'text-secondary hover-bg-light hover-text-dark'
                                            }`}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <item.icon size={18} className={isActive ? 'text-white' : 'text-muted'} />
                                            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                                        </div>
                                        {isActive && <ChevronRight size={14} className="opacity-75" />}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Super Admin Section */}
                    {user && user.isSuperAdmin && (
                        <>
                            <p className="px-3 mb-2 small fw-bold text-uppercase text-muted" style={{ fontSize: '0.7rem' }}>System</p>
                            <ul className="list-unstyled d-flex flex-column gap-1">
                                <li>
                                    <Link to="/banners" className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none hover-bg-light transition-all ${location.pathname === '/banners' ? 'bg-primary text-white' : 'text-secondary'}`}>
                                        <ImageIcon size={18} className={location.pathname === '/banners' ? 'text-white' : 'text-muted'} />
                                        <span style={{ fontSize: '0.9rem' }}>Banners</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none hover-bg-light transition-all ${location.pathname === '/settings' ? 'bg-primary text-white' : 'text-secondary'}`}>
                                        <Settings size={18} className={location.pathname === '/settings' ? 'text-white' : 'text-muted'} />
                                        <span style={{ fontSize: '0.9rem' }}>Settings</span>
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}

                    {!user.isSuperAdmin && (
                        <div className="mt-4 px-3">
                            <div className="p-3 bg-light rounded-3 text-center border">
                                <p className="small text-muted mb-1">Restricted Access</p>
                                <p className="extra-small text-muted mb-0">Contact Super Admin for System Settings.</p>
                            </div>
                        </div>
                    )}
                </nav>



                <style jsx>{`
                    @media (min-width: 768px) {
                        aside {
                            transform: translateX(0) !important;
                        }
                    }
                `}</style>
            </aside>
        </>
    );
};

export default Sidebar;
