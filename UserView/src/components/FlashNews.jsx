import React from 'react';

const news = [
    "Global Markets Rally as Tech Sector Rebounds",
    "Editorial: The Future of Digital Journalism",
    "Analysis: Understanding the New Economic Landscape",
    "Culture: Art Exhibitions to Visit This Month",
    "Science: Breakthrough in Sustainable Energy",
    "Opinion: Why Classical Literature Matters Today"
];

const FlashNews = () => {
    return (
        <div className="bg-paper border-top border-bottom border-dark py-2 overflow-hidden" style={{ height: '40px' }}>
            <div className="container d-flex align-items-center h-100">
                <div className="pe-4 fw-bold serif h-100 d-flex align-items-center text-decoration-underline" style={{ fontSize: '0.8rem', zIndex: 10, minWidth: 'fit-content' }}>
                    BREAKING:
                </div>
                <div className="marquee-container flex-grow-1 overflow-hidden">
                    <div className="marquee-content d-flex gap-5 align-items-center">
                        {news.concat(news).map((item, i) => (
                            <span key={i} className="sans fw-medium text-ink white-space-nowrap" style={{ fontSize: '0.85rem' }}>
                                {item} <span className="mx-3 text-secondary">•</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .marquee-content {
                    display: flex;
                    animation: marquee 40s linear infinite;
                    white-space: nowrap;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .white-space-nowrap {
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
};

export default FlashNews;
