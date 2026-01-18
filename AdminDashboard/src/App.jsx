import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import AdminLayout from './components/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import PostEdit from './pages/PostEdit';
import UserEdit from './pages/UserEdit';
import CategoryList from './pages/CategoryList';
import CommentList from './pages/CommentList';
import Settings from './pages/Settings';
import BannerList from './pages/BannerList';

function App() {
    return (
        <Router>
            <HelmetProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
                            <Route path="/posts" element={<AdminLayout><PostList /></AdminLayout>} />
                            <Route path="/posts/new" element={<AdminLayout><PostEdit /></AdminLayout>} />
                            <Route path="/posts/edit/:id" element={<AdminLayout><PostEdit /></AdminLayout>} />

                            <Route path="/categories" element={<AdminLayout><CategoryList /></AdminLayout>} />
                            <Route path="/comments" element={<AdminLayout><CommentList /></AdminLayout>} />

                            <Route path="/users" element={<AdminLayout><UserEdit /></AdminLayout>} />
                            <Route path="/users/:id" element={<AdminLayout><UserEdit /></AdminLayout>} />

                            <Route path="/settings" element={<AdminLayout><Settings /></AdminLayout>} />
                            <Route path="/banners" element={<AdminLayout><BannerList /></AdminLayout>} />

                        </Routes>
                    </ThemeProvider>
                </AuthProvider>
            </HelmetProvider>
        </Router>
    );
}

export default App;
