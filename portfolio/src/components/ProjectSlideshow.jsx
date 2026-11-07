import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: [0.23, 1, 0.32, 1]
        }
    },
    exit: (direction) => ({
        x: direction > 0 ? -80 : 80,
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1]
        }
    })
};

const ProjectSlideshow = ({
    title = "AI Wall Studio",
    subtitle = "Full-Stack AI Platform",
    description = "",
    images = [],
    link = "https://aiwallstudio.com/",
    tags = ["React 19", "Vite", "Supabase", "Fal.ai API", "8× Upscaling", "300 DPI Print Ratios", "Vercel"]
}) => {
    const isMobile = useIsMobile();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    // Auto-advance slideshow every 4.5 seconds (paused on hover)
    useEffect(() => {
        if (isHovered || images.length <= 1) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isHovered, images.length]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (idx) => {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
    };

    return (
        <section
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                padding: isMobile ? '50px 20px' : '90px 40px',
                boxSizing: 'border-box',
            }}
        >
            {/* 1. Header: Subtitle, Title & Sleek Live Website Link */}
            <div style={{
                width: '100%',
                maxWidth: '1050px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                gap: isMobile ? '16px' : '24px',
                marginBottom: '22px',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    alignItems: 'flex-start',
                }}>
                    {subtitle && (
                        <span style={{
                            fontSize: '11px',
                            fontFamily: '"Fira Code", monospace',
                            color: '#10b981',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}>
                            // {subtitle}
                        </span>
                    )}
                    
                    <h2 style={{
                        fontSize: isMobile ? '2.4rem' : '4rem',
                        fontWeight: 900,
                        margin: 0,
                        color: '#ffffff',
                        lineHeight: 1.05,
                        fontFamily: '"Outfit", sans-serif',
                        letterSpacing: '-1px',
                    }}>
                        {title}
                    </h2>
                </div>

                {link && (
                    <motion.a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: isMobile ? '10px 18px' : '12px 24px',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1.5px solid rgba(16, 185, 129, 0.55)',
                            color: '#10b981',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: isMobile ? '13px' : '14px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)',
                            backdropFilter: 'blur(12px)',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.25)';
                        }}
                    >
                        {/* Pulsing Live Beacon */}
                        <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                            <motion.span
                                animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    background: '#10b981',
                                }}
                            />
                            <span style={{
                                position: 'relative',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#10b981',
                                boxShadow: '0 0 10px #10b981',
                            }} />
                        </span>
                        <span style={{ fontFamily: '"Outfit", sans-serif', letterSpacing: '0.3px', fontWeight: 600 }}>
                            Live Website View
                        </span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.92em' }}>
                            {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.a>
                )}
            </div>

            {/* 2. Full Complete Description Card (Nechy Puri Description) */}
            {description && (
                <div style={{
                    width: '100%',
                    maxWidth: '1050px',
                    marginBottom: isMobile ? '24px' : '36px',
                    padding: isMobile ? '20px 18px' : '26px 32px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '4px solid #10b981',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxSizing: 'border-box',
                }}>
                    <p style={{
                        fontSize: isMobile ? '0.96rem' : '1.14rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.8,
                        margin: 0,
                        fontWeight: 300,
                        fontFamily: '"Outfit", sans-serif',
                        letterSpacing: '0.2px',
                        textAlign: 'left',
                    }}>
                        {description}
                    </p>

                    {/* Tech Highlights */}
                    {tags && tags.length > 0 && (
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: '4px',
                            paddingTop: '14px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        }}>
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        fontFamily: '"Fira Code", monospace',
                                        color: '#10b981',
                                        background: 'rgba(16, 185, 129, 0.08)',
                                        border: '1px solid rgba(16, 185, 129, 0.25)',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 3. Phr Images Do (Slideshow Display Container) */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1050px',
                    aspectRatio: isMobile ? '16/9' : '2.35/1',
                    background: 'transparent',
                    borderRadius: isMobile ? '12px' : '18px',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 35px rgba(16, 185, 129, 0.15)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Active Slide Image */}
                <AnimatePresence custom={direction} initial={false} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`${title} Slide ${currentIndex + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                userSelect: 'none',
                                pointerEvents: 'none',
                                display: 'block',
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Slide Counter Badge */}
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '12px' : '18px',
                    right: isMobile ? '12px' : '20px',
                    zIndex: 25,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: isMobile ? '11px' : '13px',
                    color: '#e2e8f0',
                    userSelect: 'none',
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 8px #10b981',
                    }} />
                    <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span style={{ opacity: 0.4 }}>/</span>
                    <span style={{ opacity: 0.6 }}>{String(images.length).padStart(2, '0')}</span>
                </div>

                {/* Previous Arrow Button */}
                {images.length > 1 && (
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        style={{
                            position: 'absolute',
                            left: isMobile ? '10px' : '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 25,
                            width: isMobile ? '38px' : '48px',
                            height: isMobile ? '38px' : '48px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(16, 185, 129, 0.45)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
                        }}
                    >
                        <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                )}

                {/* Next Arrow Button */}
                {images.length > 1 && (
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        style={{
                            position: 'absolute',
                            right: isMobile ? '10px' : '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 25,
                            width: isMobile ? '38px' : '48px',
                            height: isMobile ? '38px' : '48px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(16, 185, 129, 0.45)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
                        }}
                    >
                        <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
                <div style={{
                    display: 'flex',
                    gap: isMobile ? '8px' : '12px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    maxWidth: '1050px',
                    width: '100%',
                    marginTop: isMobile ? '14px' : '20px',
                }}>
                    {images.map((src, idx) => (
                        <motion.div
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: isMobile ? '80px' : '130px',
                                aspectRatio: '2.35/1',
                                borderRadius: isMobile ? '6px' : '10px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: currentIndex === idx
                                    ? '2px solid #10b981'
                                    : '1px solid rgba(255,255,255,0.15)',
                                boxShadow: currentIndex === idx
                                    ? '0 0 16px rgba(16,185,129,0.5)'
                                    : 'none',
                                opacity: currentIndex === idx ? 1 : 0.45,
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    pointerEvents: 'none',
                                    display: 'block',
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Subtle Emerald Bottom Glow */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                width: '70%',
                height: '30%',
                background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                filter: 'blur(90px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />
        </section>
    );
};

export default ProjectSlideshow;
