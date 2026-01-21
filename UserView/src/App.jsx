import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const PostDetails = lazy(() => import('./pages/PostDetails'));
const Categories = lazy(() => import('./pages/Categories'));
const Login = lazy(() => import('./pages/Login'));

// Loading component for Suspense
const PageLoader = () => (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-paper">
        <div className="text-center">
            <div className="spinner-border text-dark mb-3" role="status"></div>
            <div className="text-uppercase small letter-spacing-2">Loading...</div>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <HelmetProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/post/:slug" element={<PostDetails />} />
                                <Route path="/categories" element={<Categories />} />
                                <Route path="/login" element={<Login />} />
                                {/* Add more routes as needed */}
                            </Routes>
                        </Suspense>
                    </ThemeProvider>
                </AuthProvider>
            </HelmetProvider>
        </Router>
    );
}

export default App;
