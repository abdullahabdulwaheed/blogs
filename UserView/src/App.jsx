import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Categories from './pages/Categories';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <HelmetProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/post/:slug" element={<PostDetails />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/login" element={<Login />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </ThemeProvider>
                </AuthProvider>
            </HelmetProvider>
        </Router>
    );
}

export default App;
