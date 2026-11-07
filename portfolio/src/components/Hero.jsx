import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import SVGLaptop from './SVGLaptop';
import useIsMobile from '../hooks/useIsMobile';

export default function Hero() {
    const containerRef = useRef(null);
    const isMobile = useIsMobile();

    // Use scroll progress for the sticky container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, -300]);

    return (
        <div ref={containerRef} style={{ height: isMobile ? '135vh' : '220vh', position: 'relative', background: 'transparent' }}>

            {/* Sticky container for the laptop */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100dvh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse 95% 75% at 50% 50%, #092e22 0%, #051c14 45%, #02100b 100%)'
            }}>

                {/* Primary Emerald Glow behind laptop */}
                <div style={{
                    position: 'absolute',
                    width: isMobile ? '90vw' : '55vw',
                    height: isMobile ? '90vw' : '55vw',
                    background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.12) 40%, transparent 70%)',
                    borderRadius: '50%',
                    filter: isMobile ? 'none' : 'blur(90px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }} />

                {/* Secondary Teal/Mint ambient bloom */}
                <div style={{
                    position: 'absolute',
                    width: '75vw',
                    height: '45vh',
                    background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.14) 0%, transparent 75%)',
                    filter: isMobile ? 'none' : 'blur(110px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <SVGLaptop scrollProgress={scrollYProgress} />
                </div>

                {/* Minimalist Floating Tags (Desktop Only) */}
                {!isMobile && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '25%',
                            left: '5%',
                            width: '90%',
                            textAlign: 'center',
                            color: 'rgba(16, 185, 129, 0.18)',
                            fontSize: 'clamp(4rem, 12vw, 10rem)',
                            fontWeight: 900,
                            fontFamily: '"Outfit", sans-serif',
                            pointerEvents: 'none',
                            y: textY
                        }}
                    >
                        DEVELOPMENT
                    </motion.div>
                )}

                {/* Scrolling Marquees (Mobile Only) */}
                {isMobile && (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: '15%',
                                left: 0,
                                width: '100%',
                                overflow: 'hidden',
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                width: 'max-content',
                                animation: 'bg-scroll-left 40s linear infinite',
                            }}>
                                {[...Array(2)].map((_, groupIdx) => (
                                    <div key={groupIdx} style={{ display: 'flex' }}>
                                        {[...Array(6)].map((_, i) => (
                                            <span key={i} style={{
                                                color: 'rgba(16, 185, 129, 0.18)',
                                                fontSize: 'clamp(2.4rem, 10vw, 4rem)',
                                                fontWeight: 900,
                                                fontFamily: '"Outfit", sans-serif',
                                                whiteSpace: 'nowrap',
                                                paddingRight: '20px',
                                                textTransform: 'uppercase',
                                            }}>
                                                DEVELOPMENT
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: '15%',
                                left: 0,
                                width: '100%',
                                overflow: 'hidden',
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                width: 'max-content',
                                animation: 'bg-scroll-right 40s linear infinite',
                            }}>
                                {[...Array(2)].map((_, groupIdx) => (
                                    <div key={groupIdx} style={{ display: 'flex' }}>
                                        {[...Array(6)].map((_, i) => (
                                            <span key={i} style={{
                                                color: 'rgba(16, 185, 129, 0.18)',
                                                fontSize: 'clamp(2.4rem, 10vw, 4rem)',
                                                fontWeight: 900,
                                                fontFamily: '"Outfit", sans-serif',
                                                whiteSpace: 'nowrap',
                                                paddingRight: '20px',
                                                textTransform: 'uppercase',
                                            }}>
                                                SOFTWARE
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}
