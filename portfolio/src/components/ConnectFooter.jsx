import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

export default function ConnectFooter() {
    const isMobile = useIsMobile();

    return (
        <footer
            style={{
                position: 'relative',
                width: '100%',
                padding: isMobile ? '70px 20px 45px 20px' : '110px 40px 60px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'linear-gradient(180deg, transparent 0%, rgba(4, 20, 14, 0.75) 40%, rgba(2, 10, 7, 0.98) 100%)',
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Ambient Cyber Emerald Glow Backdrop */}
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '90vw' : '65vw',
                    height: isMobile ? '260px' : '380px',
                    background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 75%)',
                    filter: isMobile ? 'none' : 'blur(100px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Glowing Top Divider Line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '85%' : '60%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.7) 50%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '850px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: isMobile ? '16px' : '22px',
                }}
            >
                {/* Status Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: isMobile ? '6px 14px' : '8px 20px',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1.5px solid rgba(16, 185, 129, 0.45)',
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
                    }}
                >
                    <span
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#10b981',
                            boxShadow: '0 0 10px #10b981',
                        }}
                    />
                    <span
                        style={{
                            fontSize: isMobile ? '11px' : '12.5px',
                            fontFamily: '"Fira Code", monospace',
                            color: '#34d399',
                            fontWeight: 600,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Let's Collaborate
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        fontSize: isMobile ? 'clamp(2.2rem, 8.5vw, 3rem)' : '4.2rem',
                        fontWeight: 900,
                        margin: 0,
                        color: '#ffffff',
                        fontFamily: '"Outfit", sans-serif',
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1,
                    }}
                >
                    Connect{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 35px rgba(16, 185, 129, 0.35)',
                        }}
                    >
                        With Me
                    </span>
                </motion.h2>

                {/* Subtitle / Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        fontSize: isMobile ? '14px' : '18px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        maxWidth: '620px',
                        lineHeight: 1.6,
                        margin: '0 auto',
                        fontWeight: 300,
                        fontFamily: '"Outfit", sans-serif',
                    }}
                >
                    Available for AI Product Engineering, Full-Stack Architecture & High-Performance Web Applications.
                </motion.p>

                {/* LinkedIn Action Card & Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    style={{ marginTop: isMobile ? '14px' : '20px' }}
                >
                    <motion.a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: isMobile ? '12px' : '16px',
                            padding: isMobile ? '14px 26px' : '18px 38px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.45) 100%)',
                            border: '2px solid #10b981',
                            color: '#ffffff',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.35)',
                            backdropFilter: 'blur(12px)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#34d399';
                            e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.7), 0 0 45px rgba(16, 185, 129, 0.6)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(6, 78, 59, 0.65) 100%)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#10b981';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.35)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.45) 100%)';
                        }}
                    >
                        {/* Official LinkedIn SVG Icon with Glowing Frame */}
                        <div
                            style={{
                                width: isMobile ? '38px' : '46px',
                                height: isMobile ? '38px' : '46px',
                                borderRadius: '10px',
                                background: '#0a66c2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 16px rgba(10, 102, 194, 0.6)',
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                width={isMobile ? "22" : "26"}
                                height={isMobile ? "22" : "26"}
                                viewBox="0 0 24 24"
                                fill="#ffffff"
                            >
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                        </div>

                        {/* Button Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span
                                    style={{
                                        fontSize: isMobile ? '15px' : '18px',
                                        fontWeight: 800,
                                        fontFamily: '"Outfit", sans-serif',
                                        letterSpacing: '0.3px',
                                    }}
                                >
                                    LinkedIn
                                </span>
                                <svg
                                    width={isMobile ? "13" : "15"}
                                    height={isMobile ? "13" : "15"}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#34d399"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                            <span
                                style={{
                                    fontSize: isMobile ? '11px' : '12.5px',
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    fontFamily: '"Fira Code", monospace',
                                }}
                            >
                                Send a message or invite
                            </span>
                        </div>
                    </motion.a>
                </motion.div>

                {/* Bottom Minimal Copyright Bar */}
                <div
                    style={{
                        marginTop: isMobile ? '40px' : '65px',
                        paddingTop: isMobile ? '20px' : '26px',
                        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        style={{
                            fontSize: isMobile ? '11px' : '12.5px',
                            fontFamily: '"Fira Code", monospace',
                            color: 'rgba(255, 255, 255, 0.45)',
                        }}
                    >
                        © {new Date().getFullYear()} Portfolio. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

