import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

import img1 from '../assets/project-1/img1.png';
import img2 from '../assets/project-1/img2.png';
import img3 from '../assets/project-1/img3.png';
import img4 from '../assets/project-1/img4.png';
import img5 from '../assets/project-1/img5.png';

const defaultScreenshots = [
    img2,
    img3,
    img1, // Middle image
    img4,
    img5,
];

const ProjectFan = ({
    title = "NebulaFinder",
    subtitle = "AI Niche Intelligence Platform",
    description = "NebulaFinder is an AI-powered niche research engine that helps creators, marketers, and builders uncover hidden, high-profit online business opportunities in seconds. It scans live web data to reveal low-competition micro-niches, buyer-intent keywords, and high-paying affiliate offers, then automatically generates viral video scripts (TikTok/Reels), YouTube outlines, and marketing copy tailored directly to your target audience.",
    images: initialImages = defaultScreenshots,
    link = "https://nebulafinder.live/",
    tags = ["React", "Tailwind CSS", "Supabase", "Resend", "Vercel", "AI & LLM APIs", "Live Web Scraper"]
}) => {
    const isMobile = useIsMobile();
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);
    const [images, setImages] = useState(initialImages);
    const activeIndex = Math.floor(images.length / 2);

    const shiftLeft = () => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            const first = newImages.shift();
            newImages.push(first);
            return newImages;
        });
    };

    const shiftRight = () => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            const last = newImages.pop();
            newImages.unshift(last);
            return newImages;
        });
    };

    useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);

    // Define positions for each card based on the active selection
    const getCardStyles = (index) => {
        const offset = index - activeIndex;

        const xOffset = isMobile ? offset * 70 : offset * 250;
        const rotationY = isMobile ? offset * -12 : offset * -20;
        const zOffset = isMobile ? Math.abs(offset) * -50 : Math.abs(offset) * -200;
        const opacity = isMobile ? 1 - Math.abs(offset) * 0.35 : 1 - Math.abs(offset) * 0.1;
        const scale = isMobile ? 1 - Math.abs(offset) * 0.14 : 1 - Math.abs(offset) * 0.05;

        return {
            x: xOffset,
            rotateY: rotationY,
            z: zOffset,
            opacity: opacity,
            scale: scale
        };
    };

    const domain = link ? link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'nebulafinder.live';

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: isMobile ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                padding: isMobile ? '36px 14px' : '90px 40px',
                boxSizing: 'border-box',
                perspective: '2500px',
                overflowX: 'clip',
            }}
        >
            {/* Ambient emerald backlight behind NebulaFinder */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '95vw' : '80vw',
                height: isMobile ? '450px' : '650px',
                background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.16) 0%, rgba(4, 120, 87, 0.06) 50%, transparent 75%)',
                filter: 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            {/* 1. Header: Subtitle, Title & Sleek Live Link */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '1050px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'center',
                justifyContent: 'space-between',
                gap: isMobile ? '14px' : '24px',
                marginBottom: isMobile ? '16px' : '22px',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                        fontSize: isMobile ? 'clamp(1.9rem, 7.5vw, 2.5rem)' : '4rem',
                        fontWeight: 900,
                        margin: 0,
                        color: '#ffffff',
                        lineHeight: 1.08,
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
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                            width: isMobile ? '100%' : 'auto',
                            gap: '8px',
                            padding: isMobile ? '10px 16px' : '12px 24px',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.12)',
                            border: '1.5px solid rgba(16, 185, 129, 0.65)',
                            color: '#10b981',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: isMobile ? '12px' : '13.5px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
                            backdropFilter: 'blur(12px)',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            flexShrink: 0,
                            boxSizing: 'border-box',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.3)';
                        }}
                    >
                        {/* Pulsing Live Beacon */}
                        <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px', flexShrink: 0 }}>
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
                            {isMobile ? `Visit ${domain}` : 'Live Website View'}
                        </span>
                        {!isMobile && (
                            <>
                                <span style={{ opacity: 0.4 }}>•</span>
                                <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.92em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {domain}
                                </span>
                            </>
                        )}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.a>
                )}
            </div>

            {/* 2. Full Complete Description Card (Nechy Puri Description) */}
            {description && (
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '1050px',
                    marginBottom: isMobile ? '18px' : '40px',
                    padding: isMobile ? '16px 16px' : '26px 32px',
                    borderRadius: isMobile ? '14px' : '16px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(6, 78, 59, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.22)',
                    borderLeft: '4px solid #10b981',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 0.08)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '12px' : '16px',
                    boxSizing: 'border-box',
                }}>
                    {/* Description Text with Prominent Read More Toggle */}
                    {(() => {
                        const maxLength = isMobile ? 180 : 250;
                        const shouldTruncate = description && description.length > maxLength;
                        const displayText = shouldTruncate && !isExpanded
                            ? description.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
                            : description;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                                <p style={{
                                    fontSize: isMobile ? '0.94rem' : '1.14rem',
                                    color: 'rgba(255, 255, 255, 0.92)',
                                    lineHeight: isMobile ? 1.65 : 1.8,
                                    margin: 0,
                                    fontWeight: 300,
                                    fontFamily: '"Outfit", sans-serif',
                                    letterSpacing: '0.2px',
                                    textAlign: 'left',
                                }}>
                                    {displayText}
                                </p>

                                {shouldTruncate && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            marginTop: '4px',
                                            padding: isMobile ? '5px 12px' : '7px 16px',
                                            borderRadius: '999px',
                                            background: 'rgba(16, 185, 129, 0.16)',
                                            border: '1.5px solid rgba(52, 211, 153, 0.6)',
                                            color: '#34d399',
                                            fontFamily: '"Fira Code", monospace',
                                            fontSize: isMobile ? '11px' : '12.5px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            letterSpacing: '0.4px',
                                            boxShadow: '0 0 16px rgba(16, 185, 129, 0.25)',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#10b981';
                                            e.currentTarget.style.color = '#000000';
                                            e.currentTarget.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.7)';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.16)';
                                            e.currentTarget.style.color = '#34d399';
                                            e.currentTarget.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.25)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                                        <motion.span
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ display: 'inline-flex' }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </motion.span>
                                    </button>
                                )}
                            </div>
                        );
                    })()}

                    {/* Prominent Tech Stack & Architecture Section */}
                    {tags && tags.length > 0 && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: isMobile ? '8px' : '10px',
                            marginTop: '4px',
                            paddingTop: isMobile ? '12px' : '16px',
                            borderTop: '1px solid rgba(16, 185, 129, 0.22)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: isMobile ? '11px' : '12px',
                                    fontFamily: '"Fira Code", monospace',
                                    fontWeight: 700,
                                    color: '#34d399',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 18 22 12 16 6" />
                                        <polyline points="8 6 2 12 8 18" />
                                    </svg>
                                    Tech Stack & Architecture
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: isMobile ? '6px' : '10px',
                            }}>
                                {tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            fontSize: isMobile ? '11.5px' : '13px',
                                            fontFamily: '"Fira Code", monospace',
                                            fontWeight: 600,
                                            color: '#ffffff',
                                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.38) 100%)',
                                            border: '1.5px solid rgba(52, 211, 153, 0.45)',
                                            padding: isMobile ? '4px 10px' : '6px 14px',
                                            borderRadius: '7px',
                                            letterSpacing: '0.3px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(16, 185, 129, 0.1)',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#34d399';
                                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(6, 78, 59, 0.5) 100%)';
                                            e.currentTarget.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.4)';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.45)';
                                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.38) 100%)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(16, 185, 129, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: '#34d399',
                                            boxShadow: '0 0 6px #34d399',
                                            flexShrink: 0,
                                        }} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 3. Phr Images Do (3D Fan Showcase) */}
            <motion.div
                onPanEnd={(e, { offset }) => {
                    if (!isMobile) return;
                    const swipe = offset.x;
                    if (swipe < -40) {
                        shiftLeft();
                    } else if (swipe > 40) {
                        shiftRight();
                    }
                }}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '380px' : '720px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformStyle: 'preserve-3d',
                    zIndex: 40,
                    marginTop: '8px',
                    touchAction: isMobile ? 'pan-y' : 'auto',
                }}
            >
                {/* Previous Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        shiftRight();
                    }}
                    aria-label="Previous Project Screenshot"
                    style={{
                        position: 'absolute',
                        left: isMobile ? '4px' : '3vw',
                        zIndex: 60,
                        width: isMobile ? '36px' : '56px',
                        height: isMobile ? '36px' : '56px',
                        borderRadius: '50%',
                        background: 'rgba(4, 20, 15, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(16, 185, 129, 0.55)',
                        color: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#10b981';
                        e.currentTarget.style.color = '#000000';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(4, 20, 15, 0.85)';
                        e.currentTarget.style.color = '#10b981';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
                    }}
                >
                    <svg width={isMobile ? "16" : "24"} height={isMobile ? "16" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        shiftLeft();
                    }}
                    aria-label="Next Project Screenshot"
                    style={{
                        position: 'absolute',
                        right: isMobile ? '4px' : '3vw',
                        zIndex: 60,
                        width: isMobile ? '36px' : '56px',
                        height: isMobile ? '36px' : '56px',
                        borderRadius: '50%',
                        background: 'rgba(4, 20, 15, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(16, 185, 129, 0.55)',
                        color: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#10b981';
                        e.currentTarget.style.color = '#000000';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(4, 20, 15, 0.85)';
                        e.currentTarget.style.color = '#10b981';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
                    }}
                >
                    <svg width={isMobile ? "16" : "24"} height={isMobile ? "16" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>

                {images.map((src, i) => {
                    const styles = getCardStyles(i);
                    const isActive = i === activeIndex;

                    return (
                        <motion.div
                            key={src}
                            onClick={(e) => {
                                if (i === activeIndex) return;
                                e.stopPropagation();
                                if (i > activeIndex) {
                                    shiftLeft();
                                } else {
                                    shiftRight();
                                }
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            animate={{
                                x: styles.x,
                                rotateY: styles.rotateY,
                                z: styles.z,
                                opacity: styles.opacity,
                                scale: styles.scale,
                                zIndex: isActive ? 50 : 30 - Math.abs(i - activeIndex)
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                mass: 1
                            }}
                            style={{
                                position: 'absolute',
                                width: isMobile ? '205px' : '450px',
                                height: isMobile ? '310px' : '680px',
                                borderRadius: isMobile ? '14px' : '20px',
                                overflow: 'hidden',
                                background: '#13111c',
                                border: isActive ? '2.5px solid #10b981' : '1px solid rgba(16, 185, 129, 0.25)',
                                boxShadow: isMobile
                                    ? (isActive ? '0 10px 25px rgba(16, 185, 129, 0.35)' : '0 6px 16px rgba(0,0,0,0.6)')
                                    : (isActive ? '0 25px 70px rgba(16, 185, 129, 0.4), 0 0 45px rgba(0,0,0,0.9)' : '0 15px 40px rgba(0,0,0,0.7)'),
                                transformStyle: 'preserve-3d',
                                pointerEvents: 'auto',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none'
                            }}>
                                <img
                                    src={src}
                                    alt={`Screenshot ${i + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: isMobile ? 'none' : (isActive ? 'none' : 'grayscale(60%) brightness(0.5)'),
                                        opacity: isMobile ? (isActive ? 1 : 0.6) : 1,
                                        transition: 'all 0.4s ease',
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                                    opacity: isActive ? 1 : 0.2
                                }} />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Subtle Emerald Bottom Glow */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                width: '75%',
                height: '35%',
                background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.16) 0%, transparent 70%)',
                filter: 'blur(90px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />
        </section>
    );
};

export default ProjectFan;
