import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            // Smooth, progressive velocity curve (fast start, smooth deceleration into 100%)
            const step = current < 45 ? 5 : current < 80 ? 4 : current < 95 ? 2 : 1;
            current += step;

            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                // Brief pause at 100% before smoothly sliding up to reveal website
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
                opacity: 0.95,
                transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'radial-gradient(ellipse at center, #051c14 0%, #030e0a 60%, #020805 100%)',
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
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            {/* Subtle Grid Texture */}
            <div 
                className="ambient-bg-grid" 
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.35,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '90vw',
            }}>
                {/* Percentage Counter (Signature Website Emerald Gradient & Glow) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    marginBottom: '10px',
                }}>
                    <span style={{
                        fontSize: 'clamp(5.5rem, 18vw, 10.5rem)',
                        fontWeight: 900,
                        fontFamily: '"Outfit", sans-serif',
                        lineHeight: 0.9,
                        letterSpacing: '-3px',
                        background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 30%, #10b981 70%, #059669 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 35px rgba(16, 185, 129, 0.55)) drop-shadow(0 0 70px rgba(5, 150, 105, 0.3))',
                    }}>
                        {progress}
                    </span>
                    <span style={{
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontWeight: 800,
                        fontFamily: '"Outfit", sans-serif',
                        background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))',
                        marginLeft: '4px',
                    }}>
                        %
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div style={{
                    width: 'clamp(220px, 75vw, 320px)',
                    height: '5px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '999px',
                    padding: '2px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(0, 0, 0, 0.6)',
                }}>
                    {/* Active Progress Fill */}
                    <motion.div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #059669 0%, #10b981 60%, #34d399 100%)',
                            borderRadius: '999px',
                            boxShadow: '0 0 16px #10b981, 0 0 28px rgba(16, 185, 129, 0.7)',
                            transition: 'width 0.04s linear',
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
