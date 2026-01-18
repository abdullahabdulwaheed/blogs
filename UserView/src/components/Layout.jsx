import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-paper">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow-1"
                style={{ paddingTop: '100px' }}
            >
                {children}
            </motion.main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Layout;
