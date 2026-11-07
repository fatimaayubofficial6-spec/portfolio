import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            // Smooth velocity curve
            const step = current < 45 ? 5 : current < 80 ? 4 : current < 95 ? 2 : 1;
            current += step;

            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                // Brief smooth pause before revealing site
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
                background: '#030d0a',
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
            {/* Very soft, subtle ambient background glow */}
            <div style={{
                position: 'absolute',
                width: '45vw',
                height: '45vw',
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.06) 0%, transparent 65%)',
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
                {/* Simple, understated "Please wait" indicator */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    marginBottom: '14px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.45)',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                }}>
                    <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'rgba(167, 243, 208, 0.65)',
                    }} />
                    <span>Please wait</span>
                </div>

                {/* Percentage Counter: Clean, light, transparent outline */}
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    marginBottom: '16px',
                }}>
                    <span 
                        className="loader-transparent-number"
                        style={{
                            fontSize: 'clamp(4.8rem, 15vw, 8.5rem)',
                            fontWeight: 800,
                            fontFamily: '"Outfit", sans-serif',
                            lineHeight: 0.9,
                            letterSpacing: '-2px',
                            color: 'transparent',
                            WebkitTextStroke: '1.2px rgba(236, 253, 245, 0.65)',
                            display: 'inline-block',
                        }}
                    >
                        {progress}
                    </span>
                    <span 
                        className="loader-transparent-percent"
                        style={{
                            fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
                            fontWeight: 700,
                            fontFamily: '"Outfit", sans-serif',
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(236, 253, 245, 0.45)',
                            marginLeft: '4px',
                        }}
                    >
                        %
                    </span>
                </div>

                {/* Slim, understated progress bar */}
                <div style={{
                    width: 'clamp(180px, 55vw, 240px)',
                    height: '2.5px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Active Progress Fill */}
                    <motion.div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'rgba(167, 243, 208, 0.7)',
                            borderRadius: '999px',
                            transition: 'width 0.04s linear',
                        }}
                    />
                </div>

                {/* Subtle, soft "Better view at desktop" note */}
                <div style={{
                    marginTop: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.38)',
                    letterSpacing: '0.5px',
                    fontFamily: '"Outfit", sans-serif',
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.38)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
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
