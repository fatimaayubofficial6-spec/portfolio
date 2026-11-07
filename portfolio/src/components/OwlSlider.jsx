import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import pro2 from '../assets/project-2/pro2.png';
import pro3 from '../assets/project-2/pro3.png';
import pro4 from '../assets/project-2/pro4.png';

const sliderData = [
    { id: 1, type: 'image',  source: pro2 },
    { id: 2, type: 'image',  source: pro3 },
    { id: 3, type: 'image',  source: pro4 },
];

const imgVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } })
};

// Play icon SVG
const PlayIcon = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="10,8 17,12 10,16" fill="#10b981" />
    </svg>
);

const OwlSlider = ({ title = "AI Video Creator" }) => {
    const isMobile = useIsMobile();
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection]     = useState(1);
    const videoRef = useRef(null);

    // Auto-rotate only for images; stop on video
    useEffect(() => {
        if (sliderData[activeIndex].type === 'video') return;
        const timer = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % sliderData.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [activeIndex]);

    // Autoplay video whenever active item changes to a video
    useEffect(() => {
        if (sliderData[activeIndex].type === 'video' && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
        }
    }, [activeIndex]);

    const goTo = (idx) => {
        setDirection(idx > activeIndex ? 1 : -1);
        setActiveIndex(idx);
    };

    const current = sliderData[activeIndex];

    return (
        <section style={{
            width: '100%',
            minHeight: '100vh',
            background: 'radial-gradient(ellipse at top, #042f1e 0%, #011a10 40%, #020d08 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '16px 16px 40px' : '20px 60px 60px',
            boxSizing: 'border-box',
            gap: isMobile ? '20px' : '30px',
            borderTop: '1px solid rgba(16,185,129,0.15)',
            borderBottom: '1px solid rgba(16,185,129,0.15)',
        }}>

            {/* Title */}
            <div style={{ width: '100%', textAlign: isMobile ? 'left' : 'center', flexShrink: 0 }}>
                <h2 style={{
                    fontSize: isMobile ? '3.5rem' : '6rem',
                    fontWeight: 900,
                    margin: 0,
                    color: '#fff',
                    lineHeight: 0.9,
                    fontFamily: '"Syncopate", sans-serif',
                    opacity: 0.15,
                    whiteSpace: isMobile ? 'normal' : 'nowrap',
                }}>
                    {isMobile ? (<>AI Video<br />Creator</>) : title}
                </h2>
            </div>

            {/* Big Main Display */}
            <div style={{
                width: '100%',
                maxWidth: isMobile ? '100%' : '900px',
                aspectRatio: '16/9',
                borderRadius: isMobile ? '12px' : '20px',
                border: '2px solid #10b981',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(16,185,129,0.2), 0 30px 80px rgba(0,0,0,0.8)',
                background: '#0a0a0a',
                position: 'relative',
                flexShrink: 0,
            }}>
                <AnimatePresence custom={direction} initial={false} mode="sync">
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={imgVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {current.type === 'image' ? (
                            <img
                                src={current.source}
                                alt="Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : (
                            <video
                                ref={videoRef}
                                src={current.source}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Prev Arrow */}
                <button onClick={() => goTo((activeIndex - 1 + sliderData.length) % sliderData.length)}
                    style={{
                        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                        zIndex: 10, width: isMobile ? '34px' : '46px', height: isMobile ? '34px' : '46px',
                        borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(16,185,129,0.5)', color: '#10b981',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: isMobile ? '15px' : '18px',
                    }}>←</button>

                {/* Next Arrow */}
                <button onClick={() => goTo((activeIndex + 1) % sliderData.length)}
                    style={{
                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                        zIndex: 10, width: isMobile ? '34px' : '46px', height: isMobile ? '34px' : '46px',
                        borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(16,185,129,0.5)', color: '#10b981',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: isMobile ? '15px' : '18px',
                    }}>→</button>
            </div>

            {/* Thumbnails */}
            <div style={{
                display: 'flex',
                gap: isMobile ? '8px' : '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexShrink: 0,
                maxWidth: isMobile ? '100%' : '900px',
                width: '100%',
            }}>
                {sliderData.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        onClick={() => goTo(idx)}
                        whileHover={{ scale: 1.06, y: -4 }}
                        style={{
                            width: isMobile ? '70px' : '130px',
                            aspectRatio: '16/9',
                            borderRadius: isMobile ? '6px' : '10px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: activeIndex === idx
                                ? '2px solid #10b981'
                                : '1px solid rgba(16,185,129,0.15)',
                            boxShadow: activeIndex === idx ? '0 0 18px rgba(16,185,129,0.45)' : 'none',
                            opacity: activeIndex === idx ? 1 : 0.4,
                            transition: 'all 0.3s ease',
                            background: '#111',
                            flexShrink: 0,
                            position: 'relative',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {item.type === 'image' ? (
                            <img
                                src={item.source}
                                alt={`Thumb ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                            />
                        ) : (
                            <>
                                <video
                                    src={item.source}
                                    muted
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                                />
                                {/* Play overlay on video thumbs */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.3)',
                                }}>
                                    <PlayIcon size={isMobile ? 20 : 28} />
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OwlSlider;
