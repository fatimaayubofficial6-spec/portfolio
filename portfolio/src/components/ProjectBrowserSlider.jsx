import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const getSlideVariants = (isMobile) => ({
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? (isMobile ? 28 : 45) : (isMobile ? -28 : -45),
        ...(isMobile ? {} : { filter: 'blur(4px)' }),
    }),
    center: {
        opacity: 1,
        x: 0,
        ...(isMobile ? {} : { filter: 'blur(0px)' }),
        transition: {
            duration: isMobile ? 0.36 : 0.48,
            ease: [0.16, 1, 0.3, 1] // Apple-like silky cubic bezier deceleration
        }
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? (isMobile ? -28 : -45) : (isMobile ? 28 : 45),
        ...(isMobile ? {} : { filter: 'blur(4px)' }),
        transition: {
            duration: isMobile ? 0.26 : 0.32,
            ease: [0.35, 0, 0.25, 1]
        }
    })
});

// Video Card with prominent enlarged size, silent muted autoplay & clean visuals
const VideoCardItem = ({ v, isMobile, onExpand }) => {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const isInView = useInView(cardRef, { margin: "100px 0px 100px 0px" });

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        if (isInView) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }, [isInView]);

    return (
        <div
            ref={cardRef}
            onClick={onExpand}
            style={{
                width: isMobile ? 'clamp(270px, 82vw, 360px)' : '100%',
                minWidth: isMobile ? 'clamp(270px, 82vw, 360px)' : 'auto',
                flexShrink: 0,
                background: 'linear-gradient(180deg, rgba(14, 28, 22, 0.95) 0%, rgba(6, 16, 12, 0.98) 100%)',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                borderRadius: isMobile ? '12px' : '16px',
                overflow: 'hidden',
                boxShadow: isMobile
                    ? '0 8px 20px rgba(0, 0, 0, 0.6)'
                    : '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(16, 185, 129, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                transition: isMobile ? 'none' : 'all 0.25s ease',
                boxSizing: 'border-box',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                if (isMobile) return;
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.75), 0 0 35px rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
                if (isMobile) return;
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.35)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(16, 185, 129, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Card Mini Window Chrome */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isMobile ? '7px 12px' : '9px 16px',
                background: 'rgba(18, 34, 27, 0.95)',
                borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        fontSize: isMobile ? '11px' : '12px',
                        fontFamily: '"Fira Code", monospace',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                    }}>
                        {v.title}
                    </span>
                    <span style={{
                        fontSize: '9.5px',
                        color: '#10b981',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                    }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                        Enlarge
                    </span>
                </div>
            </div>

            {/* Video Frame: 100% Muted, Autoplaying Pure Visuals (Only streams when in view) */}
            <div 
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    background: '#020604',
                    overflow: 'hidden',
                }}
            >
                <video
                    ref={videoRef}
                    src={v.video}
                    preload={isMobile ? "none" : "metadata"}
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        background: '#000000',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};

const ProjectBrowserSlider = ({
    title = "Project Title",
    subtitle = "",
    description = "",
    link = "",
    tags = [],
    slides = [],
    videos = [],
    autoScroll = false,
    status = "",
}) => {
    const isMobile = useIsMobile();
    const slideVariants = getSlideVariants(isMobile);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeModalVideo, setActiveModalVideo] = useState(null);

    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isUserInteractingRef = useRef(false);
    const resumeTimerRef = useRef(null);

    // Preload all slide images on mount for instant, zero-flicker transitions
    useEffect(() => {
        slides.forEach((s) => {
            if (s.image && typeof s.image === 'string') {
                const img = new Image();
                img.src = s.image;
            }
        });
    }, [slides]);

    // Close video modal on Escape key & lock body scroll while modal is active
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveModalVideo(null);
            }
        };
        if (activeModalVideo) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
            };
        }
    }, [activeModalVideo]);

    // Triggers as soon as user scrolls towards the project section
    const isInView = useInView(sectionRef, { margin: "100px 0px -50px 0px" });

    // Ref to track if auto-scrolling is currently active without tearing down animation loop
    const isAutoActiveRef = useRef(false);

    const current = slides[currentIndex] || {};
    const isCurrentVideo = Boolean(
        current.video || 
        current.type === 'video' || 
        (typeof current.image === 'string' && current.image.match(/\.(mp4|webm|mov|ogg)($|\?)/i))
    );

    // Reset and pre-check scrollable/loaded state on slide change (no flash for cached images)
    useEffect(() => {
        if (isCurrentVideo) {
            setIsScrollable(false);
            setIsImgLoaded(true);
            return;
        }
        if (current.image) {
            const img = new Image();
            img.src = current.image;
            if (img.complete && img.naturalWidth) {
                const targetMaxHeight = isMobile ? 340 : 520;
                const containerWidth = scrollContainerRef.current ? scrollContainerRef.current.clientWidth : (isMobile ? 360 : 1000);
                const imgAspect = img.naturalWidth / img.naturalHeight;
                const renderedHeight = containerWidth / imgAspect;
                setIsScrollable(renderedHeight > targetMaxHeight + 15);
                setIsImgLoaded(true);
            } else {
                setIsImgLoaded(false);
            }
        }
    }, [currentIndex, isCurrentVideo, isMobile]);

    const handleVideoLoaded = () => {
        setIsImgLoaded(true);
        setIsScrollable(false);
    };

    const checkScrollable = (e) => {
        setIsImgLoaded(true);
        if (isCurrentVideo) {
            setIsScrollable(false);
            return;
        }
        const targetMaxHeight = isMobile ? 340 : 520;
        if (e && e.target) {
            const img = e.target;
            const containerWidth = scrollContainerRef.current ? scrollContainerRef.current.clientWidth : (isMobile ? 360 : 1000);
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const renderedHeight = containerWidth / imgAspect;
            setIsScrollable(renderedHeight > targetMaxHeight + 15);
            return;
        }
        if (scrollContainerRef.current) {
            const el = scrollContainerRef.current;
            const scrollable = el.scrollHeight > targetMaxHeight + 15;
            setIsScrollable(scrollable);
        }
    };

    // Auto-scroll stays active continuously when section is in view (Desktop & Mobile)
    useEffect(() => {
        isAutoActiveRef.current = Boolean(autoScroll && isScrollable && isInView && !isCurrentVideo);
    }, [autoScroll, isScrollable, isInView, isCurrentVideo]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (idx) => {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
    };

    // Continuous, unpaused auto-scroll loop (Smooth continuous scrolling; user touch pauses & auto-resumes)
    useEffect(() => {
        if (!autoScroll || !isScrollable || !isInView || !isImgLoaded || isCurrentVideo) return;

        let animId = null;
        let pauseTimer = null;
        let reachedBottom = false;
        let canScroll = false;

        setHasScrolled(false);

        // Gentle pause (450ms) so user can comfortably see the top header before auto-scrolling begins
        pauseTimer = setTimeout(() => {
            canScroll = true;
        }, 450);

        const step = () => {
            if (!scrollContainerRef.current) return;
            const el = scrollContainerRef.current;
            const maxScroll = el.scrollHeight - el.clientHeight;

            // Reset reachedBottom if user manually scrolled up
            if (el.scrollTop < maxScroll - 30 && reachedBottom) {
                reachedBottom = false;
                if (pauseTimer) {
                    clearTimeout(pauseTimer);
                    pauseTimer = null;
                }
            }

            if (maxScroll > 15 && isAutoActiveRef.current && canScroll && !reachedBottom && !isUserInteractingRef.current) {
                // Gentle, normal and comfortable reading speed (not fast, easy to read and inspect)
                const speed = maxScroll > 3500 ? (isMobile ? 1.1 : 1.6) : (isMobile ? 0.85 : 1.25);
                el.scrollTop += speed;

                if (el.scrollTop > 30) {
                    setHasScrolled(true);
                }

                // Check if reached bottom of screenshot
                if (el.scrollTop >= maxScroll - 4) {
                    reachedBottom = true;
                    // Do NOT auto-advance slides. User decides when to switch slides via arrows/thumbnails.
                    // Pause comfortably at bottom, then smoothly scroll back to top of the same screenshot and loop.
                    pauseTimer = setTimeout(() => {
                        if (!scrollContainerRef.current) return;
                        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                        pauseTimer = setTimeout(() => {
                            reachedBottom = false;
                            setHasScrolled(false);
                        }, 1400);
                    }, 2200);
                }
            }

            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);

        return () => {
            if (animId) cancelAnimationFrame(animId);
            if (pauseTimer) clearTimeout(pauseTimer);
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        };
    }, [currentIndex, autoScroll, isScrollable, isInView, isCurrentVideo, isMobile]);

    // User interaction handling (Mouse wheel, drag, scrollbar, touch)
    const handleUserInteractionStart = () => {
        isUserInteractingRef.current = true;
        if (resumeTimerRef.current) {
            clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = null;
        }
    };

    const handleUserInteractionEnd = () => {
        if (resumeTimerRef.current) {
            clearTimeout(resumeTimerRef.current);
        }
        // When user stops scrolling, dragging or touching, resume auto-scrolling after 2200ms
        resumeTimerRef.current = setTimeout(() => {
            isUserInteractingRef.current = false;
        }, 2200);
    };

    const handleScroll = () => {
        setHasScrolled(true);
        handleUserInteractionStart();
        handleUserInteractionEnd();
    };

    const handleWheel = (e) => {
        // Prevent event from bubbling to window Lenis when scrolling inside screenshot
        e.stopPropagation();
        handleUserInteractionStart();
        handleUserInteractionEnd();
    };

    // Touch gesture swipe handling for mobile navigation (switching slides)
    const handleTouchStart = (e) => {
        handleUserInteractionStart();
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        handleUserInteractionEnd();
        const diffX = e.changedTouches[0].clientX - touchStartX.current;
        const diffY = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
            if (diffX < 0) nextSlide();
            else prevSlide();
        }
    };

    const domain = link ? link.replace(/^https?:\/\//, '').replace(/\/$/, '') : (title ? `${title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app` : 'preview.app');

    return (
        <section
            ref={sectionRef}
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
                overflowX: 'clip',
            }}
        >
            {/* Ambient emerald backlight behind the project showcase */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '95vw' : '75vw',
                height: isMobile ? '450px' : '600px',
                background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.16) 0%, rgba(4, 120, 87, 0.06) 50%, transparent 75%)',
                filter: isMobile ? 'none' : 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            {/* 1. Header: Subtitle, Title & Sleek Live Link */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '1100px',
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

                {/* Status Badge (Only shown when project is in development, live visit link is exclusively in the browser address bar below) */}
                {status === 'Under Development' && (
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                            width: isMobile ? '100%' : 'auto',
                            gap: '8px',
                            padding: isMobile ? '10px 16px' : '12px 24px',
                            borderRadius: '999px',
                            background: 'rgba(245, 158, 11, 0.12)',
                            border: '1.5px solid rgba(245, 158, 11, 0.65)',
                            color: '#f59e0b',
                            fontSize: isMobile ? '12px' : '13.5px',
                            fontWeight: 600,
                            boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)',
                            backdropFilter: 'blur(12px)',
                            flexShrink: 0,
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Pulsing Under Development Amber Beacon */}
                        <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px', flexShrink: 0 }}>
                            <motion.span
                                animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    background: '#f59e0b',
                                }}
                            />
                            <span style={{
                                position: 'relative',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#f59e0b',
                                boxShadow: '0 0 10px #f59e0b',
                            }} />
                        </span>
                        <span style={{ fontFamily: '"Outfit", sans-serif', letterSpacing: '0.3px', fontWeight: 600 }}>
                            Under Development
                        </span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.92em', opacity: 0.9 }}>
                            In Active Build
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Full Complete Description Card */}
            {description && (
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '1100px',
                    marginBottom: isMobile ? '18px' : '36px',
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

            {/* 2.5 Dedicated Horizontal Video Showcase (Videos with Thumbnails) */}
            {videos && videos.length > 0 && (
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '1100px',
                    marginBottom: isMobile ? '24px' : '36px',
                    boxSizing: 'border-box',
                }}>
                    {/* Section Header: Sample Videos */}
                    {isMobile ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            marginBottom: '14px',
                            textAlign: 'center',
                        }}>
                            <h3 style={{
                                fontSize: '1.35rem',
                                fontWeight: 800,
                                margin: 0,
                                color: '#ffffff',
                                fontFamily: '"Outfit", sans-serif',
                                letterSpacing: '-0.3px',
                            }}>
                                Sample Videos
                            </h3>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#10b981',
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </motion.span>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px',
                            padding: '0 2px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '3px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                    boxShadow: '0 0 12px #10b981',
                                    transform: 'rotate(45deg)',
                                    flexShrink: 0,
                                }} />
                                <h3 style={{
                                    fontSize: '1.65rem',
                                    fontWeight: 800,
                                    margin: 0,
                                    color: '#ffffff',
                                    fontFamily: '"Outfit", sans-serif',
                                    letterSpacing: '-0.3px',
                                }}>
                                    Sample Videos
                                </h3>
                                <span style={{
                                    fontSize: '11px',
                                    fontFamily: '"Fira Code", monospace',
                                    color: '#10b981',
                                    background: 'rgba(16, 185, 129, 0.14)',
                                    border: '1px solid rgba(16, 185, 129, 0.4)',
                                    padding: '3px 9px',
                                    borderRadius: '999px',
                                    fontWeight: 600,
                                    letterSpacing: '0.4px',
                                    textTransform: 'uppercase',
                                }}>
                                    AI Motion Demos
                                </span>
                            </div>
                            <span style={{
                                fontSize: '12px',
                                fontFamily: '"Fira Code", monospace',
                                color: 'rgba(255, 255, 255, 0.55)',
                                fontWeight: 500,
                            }}>
                                {videos.length} Previews
                            </span>
                        </div>
                    )}

                    {/* Horizontally Aligned Video Cards (Enlarged Thumbnails, Silent Autoplay) */}
                    <div style={{
                        display: isMobile ? 'flex' : 'grid',
                        gridTemplateColumns: isMobile ? undefined : 'repeat(2, 1fr)',
                        overflowX: isMobile ? 'auto' : 'visible',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        gap: isMobile ? '16px' : '24px',
                        padding: isMobile ? '4px 4px 14px 4px' : '0',
                        boxSizing: 'border-box',
                    }}>
                        {videos.map((v, idx) => (
                            <VideoCardItem
                                key={idx}
                                v={v}
                                isMobile={isMobile}
                                onExpand={() => setActiveModalVideo(v)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 3. Interactive Full-Page Browser Mockup Showcase with Fast Auto-Scroll */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '1100px',
                    borderRadius: isMobile ? '12px' : '18px',
                    border: '1.5px solid rgba(16, 185, 129, 0.35)',
                    background: 'linear-gradient(180deg, rgba(16, 28, 23, 0.98) 0%, rgba(8, 18, 14, 0.98) 100%)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 45px rgba(16, 185, 129, 0.18)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                }}
            >
                {/* Browser Window Header Chrome */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '8px 10px' : '12px 20px',
                    background: 'rgba(18, 32, 26, 0.95)',
                    borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
                    gap: isMobile ? '6px' : '12px',
                    boxSizing: 'border-box',
                }}>
                    {/* Window Control Dots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '5px' : '8px', flexShrink: 0 }}>
                        <span style={{ width: isMobile ? '8px' : '11px', height: isMobile ? '8px' : '11px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                        <span style={{ width: isMobile ? '8px' : '11px', height: isMobile ? '8px' : '11px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                        <span style={{ width: isMobile ? '8px' : '11px', height: isMobile ? '8px' : '11px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                    </div>

                    {/* Interactive Clickable Browser Address Bar (Prominent & Obvious Live Link) */}
                    {link ? (
                        <motion.a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            title={`Open live site ${link} in new tab`}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                maxWidth: isMobile ? '100%' : '520px',
                                margin: isMobile ? '0' : '0 auto',
                                background: 'linear-gradient(135deg, rgba(6, 32, 24, 0.96) 0%, rgba(3, 20, 15, 0.96) 100%)',
                                border: '1.5px solid #10b981',
                                borderRadius: '9px',
                                padding: isMobile ? '6px 8px' : '7px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: isMobile ? '6px' : '10px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.25s ease',
                                boxShadow: '0 0 18px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.1)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#34d399';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.32) 100%)';
                                e.currentTarget.style.boxShadow = '0 0 28px rgba(16, 185, 129, 0.6), inset 0 0 14px rgba(16, 185, 129, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#10b981';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 32, 24, 0.96) 0%, rgba(3, 20, 15, 0.96) 100%)';
                                e.currentTarget.style.boxShadow = '0 0 18px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.1)';
                            }}
                        >
                            {/* Left: Lock & URL */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: isMobile ? '6px' : '8px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                minWidth: 0,
                                flex: 1,
                            }}>
                                {/* HTTPS / Lock Indicator Pill */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: isMobile ? '2px 5px' : '3px 7px',
                                    borderRadius: '5px',
                                    background: 'rgba(16, 185, 129, 0.22)',
                                    border: '1px solid rgba(52, 211, 153, 0.45)',
                                    flexShrink: 0,
                                }}>
                                    <svg width={isMobile ? "10" : "12"} height={isMobile ? "10" : "12"} viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    {!isMobile && (
                                        <span style={{
                                            fontSize: '10px',
                                            fontFamily: '"Fira Code", monospace',
                                            fontWeight: 700,
                                            color: '#34d399',
                                            letterSpacing: '0.4px',
                                        }}>
                                            HTTPS
                                        </span>
                                    )}
                                </div>

                                {/* URL Text */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                    fontFamily: '"Fira Code", monospace',
                                }}>
                                    <span style={{ 
                                        color: 'rgba(255, 255, 255, 0.45)', 
                                        fontSize: isMobile ? '10.5px' : '12px',
                                        flexShrink: 0,
                                    }}>
                                        https://
                                    </span>
                                    <span style={{ 
                                        color: '#ffffff', 
                                        fontWeight: 700, 
                                        fontSize: isMobile ? '11px' : '12.5px', 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        letterSpacing: '0.2px',
                                    }}>
                                        {domain}
                                    </span>
                                    {!isMobile && current.route && current.route !== '/' && (
                                        <span style={{ 
                                            color: '#34d399', 
                                            fontSize: '11.5px',
                                            opacity: 0.85,
                                            flexShrink: 0,
                                        }}>
                                            {current.route}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Right: Prominent Glowing Green VISIT SITE Pill */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: isMobile ? '4px 8px' : '4px 12px',
                                borderRadius: '999px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: '#000000',
                                fontWeight: 800,
                                fontSize: isMobile ? '9.5px' : '11px',
                                fontFamily: '"Outfit", sans-serif',
                                letterSpacing: '0.5px',
                                boxShadow: '0 0 14px rgba(16, 185, 129, 0.65)',
                                flexShrink: 0,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                            }}>
                                <span>{isMobile ? 'VISIT' : 'VISIT SITE'}</span>
                                <svg width={isMobile ? "10" : "12"} height={isMobile ? "10" : "12"} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                        </motion.a>
                    ) : null}

                    {/* Right Chrome Controls: Continuous Auto-Scroll Badge & Slide Counter (Desktop only, hidden on mobile for full URL space) */}
                    {!isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            {autoScroll && isScrollable && !isCurrentVideo && (
                                <div 
                                    title="Continuous full-page auto-scrolling showcase"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '4px 9px',
                                        borderRadius: '999px',
                                        background: 'rgba(16, 185, 129, 0.16)',
                                        border: '1px solid rgba(16, 185, 129, 0.5)',
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: '10px',
                                        color: '#10b981',
                                        userSelect: 'none',
                                        flexShrink: 0,
                                    }}
                                >
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        boxShadow: '0 0 8px #10b981',
                                    }} />
                                    <span>AUTO SCROLL</span>
                                </div>
                            )}

                            {isCurrentVideo && (
                                <div 
                                    title="Interactive AI video playback demo"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '4px 9px',
                                        borderRadius: '999px',
                                        background: 'rgba(16, 185, 129, 0.16)',
                                        border: '1px solid rgba(16, 185, 129, 0.5)',
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: '10px',
                                        color: '#10b981',
                                        userSelect: 'none',
                                        flexShrink: 0,
                                    }}
                                >
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        boxShadow: '0 0 8px #10b981',
                                    }} />
                                    <span>VIDEO PREVIEW</span>
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 10px',
                                borderRadius: '999px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                fontFamily: '"Fira Code", monospace',
                                fontSize: '11px',
                                color: '#10b981',
                                userSelect: 'none',
                                flexShrink: 0,
                            }}>
                                <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                                <span style={{ opacity: 0.4 }}>/</span>
                                <span style={{ opacity: 0.7 }}>{String(slides.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Browser Tab Strip */}
                {slides.length > 1 && (
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        padding: isMobile ? '6px 8px' : '8px 16px',
                        background: 'rgba(10, 20, 16, 0.85)',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                    }}>
                        {slides.map((s, idx) => {
                            const isSlideVideo = Boolean(s.video || s.type === 'video' || (typeof s.image === 'string' && s.image.match(/\.(mp4|webm|mov|ogg)($|\?)/i)));
                            return (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    style={{
                                        padding: isMobile ? '5px 10px' : '8px 18px',
                                        borderRadius: '6px',
                                        border: currentIndex === idx
                                            ? '1px solid rgba(16, 185, 129, 0.55)'
                                            : '1px solid transparent',
                                        background: currentIndex === idx
                                            ? 'rgba(16, 185, 129, 0.18)'
                                            : 'transparent',
                                        color: currentIndex === idx ? '#10b981' : 'rgba(255,255,255,0.65)',
                                        fontSize: isMobile ? '10.5px' : '12px',
                                        fontFamily: '"Fira Code", monospace',
                                        fontWeight: currentIndex === idx ? 600 : 400,
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s ease',
                                        flexShrink: 0,
                                    }}
                                >
                                    {isSlideVideo ? (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill={currentIndex === idx ? '#10b981' : 'rgba(255,255,255,0.6)'} style={{ flexShrink: 0 }}>
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    ) : (
                                        <span style={{
                                            width: '5px',
                                            height: '5px',
                                            borderRadius: '50%',
                                            background: currentIndex === idx ? '#10b981' : 'rgba(255,255,255,0.3)',
                                        }} />
                                    )}
                                    {s.title}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Viewport Frame with Full-Page Vertical Scrolling & Continuous Auto-Scroll */}
                <div
                    ref={scrollContainerRef}
                    data-lenis-prevent
                    onScroll={handleScroll}
                    onWheel={handleWheel}
                    onMouseDown={handleUserInteractionStart}
                    onMouseUp={handleUserInteractionEnd}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleUserInteractionEnd}
                    className="custom-browser-scroll"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: isScrollable ? (isMobile ? '340px' : '520px') : 'auto',
                        maxHeight: isScrollable ? (isMobile ? '340px' : '520px') : 'none',
                        overflowY: isScrollable && !isCurrentVideo ? (isMobile ? 'auto' : 'scroll') : 'hidden',
                        overflowX: 'hidden',
                        background: 'transparent',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <AnimatePresence 
                        custom={direction} 
                        mode="wait"
                        onExitComplete={() => {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollTop = 0;
                            }
                        }}
                    >
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{
                                width: '100%',
                                height: isScrollable ? 'auto' : '100%',
                                display: 'block',
                                position: 'relative',
                            }}
                        >
                            {/* Sleek Skeleton Loading Indicator */}
                            {!isImgLoaded && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    minHeight: isMobile ? '200px' : '360px',
                                    zIndex: 5,
                                    background: 'linear-gradient(180deg, rgba(8, 24, 18, 0.95) 0%, rgba(4, 14, 10, 0.98) 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        border: '2px solid rgba(16, 185, 129, 0.2)',
                                        borderTopColor: '#10b981',
                                        animation: 'spin 0.8s linear infinite',
                                    }} />
                                    <span style={{
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: isMobile ? '10px' : '11px',
                                        color: 'rgba(16, 185, 129, 0.85)',
                                        letterSpacing: '0.6px',
                                    }}>
                                        {isCurrentVideo ? '⚡ Loading Video Showcase...' : '⚡ Loading Showcase...'}
                                    </span>
                                </div>
                            )}

                            {isCurrentVideo ? (
                                <div style={{
                                    width: '100%',
                                    height: isMobile ? '340px' : '520px',
                                    background: '#020604',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <video
                                        key={current.video || current.image}
                                        src={current.video || current.image}
                                        poster={current.poster || (current.image !== current.video ? current.image : undefined)}
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        onLoadedData={handleVideoLoaded}
                                        onCanPlay={handleVideoLoaded}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            maxHeight: isMobile ? '340px' : '520px',
                                            objectFit: 'contain',
                                            display: 'block',
                                            background: '#000000',
                                            opacity: isImgLoaded ? 1 : 0,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    />
                                </div>
                            ) : (
                                <img
                                    src={current.image}
                                    alt={`${title} - ${current.title}`}
                                    loading="eager"
                                    decoding="async"
                                    onLoad={checkScrollable}
                                    style={{
                                        width: '100%',
                                        height: isScrollable ? 'auto' : '100%',
                                        display: 'block',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                        opacity: isImgLoaded ? 1 : 0,
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Scroll Hint Badge (Desktop Only - hidden on mobile for clean unobstructed view) */}
                    {!isMobile && isScrollable && !hasScrolled && !isCurrentVideo && (
                        <div style={{
                            position: 'sticky',
                            bottom: '16px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'fit-content',
                            margin: '0 auto',
                            zIndex: 30,
                            padding: '8px 16px',
                            borderRadius: '999px',
                            background: 'rgba(4, 20, 15, 0.88)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(16, 185, 129, 0.55)',
                            color: '#10b981',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '12px',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                            pointerEvents: 'none',
                        }}>
                            <span>
                                {autoScroll ? '⚡ Auto-scrolling • Scroll or drag to explore' : '↕ Scroll or drag to explore full page'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Previous Slide Arrow */}
                {slides.length > 1 && (
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Page"
                        style={{
                            position: 'absolute',
                            left: isMobile ? '6px' : '20px',
                            top: '55%',
                            transform: 'translateY(-50%)',
                            zIndex: 25,
                            width: isMobile ? '30px' : '46px',
                            height: isMobile ? '30px' : '46px',
                            borderRadius: '50%',
                            background: 'rgba(4, 20, 15, 0.78)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(16, 185, 129, 0.45)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(4, 20, 15, 0.78)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.5)';
                        }}
                    >
                        <svg width={isMobile ? "14" : "22"} height={isMobile ? "14" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                )}

                {/* Next Slide Arrow */}
                {slides.length > 1 && (
                    <button
                        onClick={nextSlide}
                        aria-label="Next Page"
                        style={{
                            position: 'absolute',
                            right: isMobile ? '6px' : '20px',
                            top: '55%',
                            transform: 'translateY(-50%)',
                            zIndex: 25,
                            width: isMobile ? '30px' : '46px',
                            height: isMobile ? '30px' : '46px',
                            borderRadius: '50%',
                            background: 'rgba(4, 20, 15, 0.78)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(16, 185, 129, 0.45)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(4, 20, 15, 0.78)';
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.5)';
                        }}
                    >
                        <svg width={isMobile ? "14" : "22"} height={isMobile ? "14" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Thumbnail Navigation Strip (Clean Centered Mini-Browser Cards, Standard 16:10 Proportions) */}
            {slides.length > 1 && (
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexWrap: isMobile ? 'nowrap' : 'wrap',
                    justifyContent: isMobile ? (slides.length <= 2 ? 'center' : 'flex-start') : 'center',
                    alignItems: 'center',
                    overflowX: isMobile ? 'auto' : 'visible',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    gap: isMobile ? '10px' : '16px',
                    maxWidth: '1100px',
                    width: '100%',
                    marginTop: isMobile ? '16px' : '24px',
                    padding: isMobile ? '4px 6px 14px 6px' : '4px 0',
                    boxSizing: 'border-box',
                }}>
                    {slides.map((s, idx) => {
                        const isSlideVideo = Boolean(s.video || s.type === 'video' || (typeof s.image === 'string' && s.image.match(/\.(mp4|webm|mov|ogg)($|\?)/i)));
                        return (
                            <motion.div
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    width: isMobile ? '140px' : '205px',
                                    flexShrink: 0,
                                    borderRadius: isMobile ? '10px' : '14px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(180deg, rgba(14, 28, 22, 0.95) 0%, rgba(6, 16, 12, 0.98) 100%)',
                                    border: currentIndex === idx
                                        ? '2px solid #10b981'
                                        : '1.5px solid rgba(16, 185, 129, 0.25)',
                                    boxShadow: currentIndex === idx
                                        ? '0 8px 24px rgba(16, 185, 129, 0.45), 0 0 16px rgba(16, 185, 129, 0.25)'
                                        : '0 4px 14px rgba(0, 0, 0, 0.55)',
                                    opacity: currentIndex === idx ? 1 : 0.65,
                                    transition: 'all 0.25s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxSizing: 'border-box',
                                }}
                            >
                                {/* Mini Chrome Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: isMobile ? '4px 7px' : '5px 10px',
                                    background: currentIndex === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(12, 24, 18, 0.92)',
                                    borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
                                }}>
                                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ff5f56' }} />
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ffbd2e' }} />
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#27c93f' }} />
                                    </div>
                                    <span style={{
                                        fontSize: isMobile ? '8.5px' : '9.5px',
                                        fontFamily: '"Fira Code", monospace',
                                        color: currentIndex === idx ? '#10b981' : 'rgba(255, 255, 255, 0.55)',
                                        fontWeight: 600,
                                    }}>
                                        0{idx + 1}
                                    </span>
                                </div>

                                {/* Thumbnail Image Frame with Standard 16:10 Proportion */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '16/10',
                                    overflow: 'hidden',
                                    background: '#040d0a',
                                    position: 'relative',
                                }}>
                                    {s.image ? (
                                        <img
                                            src={s.image}
                                            alt={`Thumbnail ${idx + 1}`}
                                            loading="lazy"
                                            decoding="async"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                                pointerEvents: 'none',
                                                display: 'block',
                                            }}
                                        />
                                    ) : (
                                        <video
                                            src={s.video}
                                            muted
                                            preload="metadata"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                pointerEvents: 'none',
                                                display: 'block',
                                            }}
                                        />
                                    )}

                                    {/* Video Play Badge overlay */}
                                    {isSlideVideo && (
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(0, 0, 0, 0.35)',
                                            pointerEvents: 'none',
                                        }}>
                                            <div style={{
                                                width: isMobile ? '20px' : '26px',
                                                height: isMobile ? '20px' : '26px',
                                                borderRadius: '50%',
                                                background: 'rgba(16, 185, 129, 0.95)',
                                                boxShadow: '0 0 10px rgba(16, 185, 129, 0.7)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#000000',
                                                paddingLeft: '2px',
                                            }}>
                                                <svg width={isMobile ? "9" : "11"} height={isMobile ? "9" : "11"} viewBox="0 0 24 24" fill="currentColor">
                                                    <polygon points="6 4 20 12 6 20 6 4" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Label Bar */}
                                <div style={{
                                    padding: isMobile ? '5px 6px' : '7px 10px',
                                    background: 'rgba(4, 16, 12, 0.92)',
                                    borderTop: '1px solid rgba(16, 185, 129, 0.15)',
                                    textAlign: 'center',
                                }}>
                                    <span style={{
                                        fontSize: isMobile ? '9.5px' : '11px',
                                        fontFamily: '"Fira Code", monospace',
                                        color: currentIndex === idx ? '#10b981' : '#e2e8f0',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                    }}>
                                        {s.label || s.title}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Subtle Emerald Bottom Glow (Desktop only) */}
            {!isMobile && (
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    width: '75%',
                    height: '35%',
                    background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }} />
            )}

            {/* Enlarged Video Lightbox Modal (Click-to-enlarge, 100% strictly muted) */}
            <AnimatePresence>
                {activeModalVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveModalVideo(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99999,
                            background: 'rgba(2, 8, 5, 0.88)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobile ? '16px' : '32px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 15 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '1080px',
                                background: 'linear-gradient(180deg, #0e1e17 0%, #06110d 100%)',
                                border: '1.5px solid #10b981',
                                borderRadius: isMobile ? '12px' : '18px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Modal macOS Chrome Bar */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: isMobile ? '10px 14px' : '14px 20px',
                                background: 'rgba(18, 36, 28, 0.98)',
                                borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
                                boxSizing: 'border-box',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button
                                        onClick={() => setActiveModalVideo(null)}
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: '#ff5f56',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                        }}
                                        title="Close"
                                    />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        fontSize: isMobile ? '12px' : '14px',
                                        fontFamily: '"Fira Code", monospace',
                                        color: '#ffffff',
                                        fontWeight: 600,
                                    }}>
                                        {activeModalVideo.title}
                                    </span>
                                    <span style={{
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: '#10b981',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        fontFamily: '"Fira Code", monospace',
                                    }}>
                                        🔇 Silent Visuals
                                    </span>
                                </div>

                                <button
                                    onClick={() => setActiveModalVideo(null)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        color: '#e2e8f0',
                                        borderRadius: '8px',
                                        padding: '4px 10px',
                                        fontSize: '12px',
                                        fontFamily: '"Fira Code", monospace',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                        e.currentTarget.style.borderColor = '#ef4444';
                                        e.currentTarget.style.color = '#ef4444';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                        e.currentTarget.style.color = '#e2e8f0';
                                    }}
                                >
                                    ✕ ESC
                                </button>
                            </div>

                            {/* Enlarged Video Player - PERMANENTLY MUTED */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                background: '#000000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <video
                                    src={activeModalVideo.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controls
                                    onVolumeChange={(e) => {
                                        e.target.muted = true;
                                        e.target.volume = 0;
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '78vh',
                                        objectFit: 'contain',
                                        background: '#000000',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectBrowserSlider;
