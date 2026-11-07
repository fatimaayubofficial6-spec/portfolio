import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            const step = current < 45 ? 5 : current < 80 ? 4 : current < 95 ? 2 : 1;
            current += step;

            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 200);
                return;
            }
            setProgress(current);
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: '-100%',
                opacity: 0.98,
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'radial-gradient(ellipse 95% 75% at 50% 50%, #092e22 0%, #051c14 45%, #02100b 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: '"Outfit", sans-serif',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Ambient Background Glow matching Hero */}
            <div style={{
                position: 'absolute',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.14) 0%, rgba(5, 150, 105, 0.05) 40%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '90vw',
            }}>
                {/* Subtle "Please wait" indicator */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    marginBottom: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'rgba(16, 185, 129, 0.42)',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                }}>
                    <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.5)',
                    }} />
                    <span>Please wait</span>
                </div>

                {/* Percentage Counter (Exact Hero "DEVELOPMENT / SOFTWARE" style) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    marginBottom: '16px',
                }}>
                    <span 
                        className="loader-transparent-number"
                        style={{
                            fontSize: 'clamp(5.5rem, 18vw, 10.5rem)',
                            fontWeight: 900,
                            fontFamily: '"Outfit", sans-serif',
                            lineHeight: 0.88,
                            color: 'rgba(16, 185, 129, 0.32)',
                            letterSpacing: '-2px',
                            display: 'inline-block',
                        }}
                    >
                        {progress}
                    </span>
                    <span 
                        className="loader-transparent-percent"
                        style={{
                            fontSize: 'clamp(2rem, 7vw, 3.6rem)',
                            fontWeight: 900,
                            fontFamily: '"Outfit", sans-serif',
                            color: 'rgba(16, 185, 129, 0.32)',
                            marginLeft: '4px',
                        }}
                    >
                        %
                    </span>
                </div>

                {/* Matching slim progress bar */}
                <div style={{
                    width: 'clamp(180px, 55vw, 260px)',
                    height: '2.5px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '999px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Active Progress Fill */}
                    <motion.div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'rgba(16, 185, 129, 0.45)',
                            borderRadius: '999px',
                            transition: 'width 0.04s linear',
                        }}
                    />
                </div>

                {/* Subtle "Better view at desktop" note */}
                <div style={{
                    marginTop: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'rgba(16, 185, 129, 0.35)',
                    letterSpacing: '0.5px',
                    fontFamily: '"Outfit", sans-serif',
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span>Better view at desktop</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
