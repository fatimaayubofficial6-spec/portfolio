import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const TypingAnimation = ({ text, isVisible }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!isVisible) {
            setDisplayedText('');
            return;
        }

        let currentText = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                currentText += text[i];
                setDisplayedText(currentText);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [text, isVisible]);

    return (
        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '15px', whiteSpace: 'pre-wrap', color: '#d1d1d1', lineHeight: '1.4' }}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ display: 'inline-block', width: '8px', height: '15px', background: '#10b981', marginLeft: '4px' }}
            />
        </div>
    );
};

const SkillCard = ({ title, code, color, icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const isMobile = useIsMobile();

    return (
        <motion.div
            ref={ref}
            whileHover={{ y: -5 }}
            style={{
                width: '100%',
                maxWidth: '1000px',
                height: isMobile ? 'auto' : '420px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                background: '#050c0a',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: `0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)`,
                border: '1px solid rgba(16, 185, 129, 0.15)',
                position: 'relative'
            }}
        >
            {/* Left Side: Info (Dark Theme) */}
            <div style={{
                flex: '1',
                background: '#070f0d',
                padding: isMobile ? '30px 24px' : '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRight: isMobile ? 'none' : '1px solid rgba(16, 185, 129, 0.1)',
                borderBottom: isMobile ? '1px solid rgba(16, 185, 129, 0.1)' : 'none',
            }}>
                <div style={{ zIndex: 2 }}>
                    <div style={{
                        fontSize: isMobile ? '32px' : '42px',
                        marginBottom: '20px',
                        filter: `drop-shadow(0 0 15px ${color}60)`
                    }}>
                        {icon}
                    </div>
                    <h3 style={{
                        margin: 0,
                        fontSize: isMobile ? '32px' : '48px',
                        fontWeight: 800,
                        color: '#fff',
                        letterSpacing: '-1px'
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '16px',
                        marginTop: '12px',
                        maxWidth: '300px',
                        lineHeight: '1.5'
                    }}>
                        Specialized in building high-performance {title.toLowerCase()} systems with modern architecture.
                    </p>
                    <div style={{
                        marginTop: '30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: color,
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Technical Specs <span style={{ fontSize: '18px' }}>→</span>
                    </div>
                </div>

                {/* Ambient Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '60%',
                    height: '60%',
                    background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
                    zIndex: 1,
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Right Side: Code snippets (Deepest Dark) */}
            <div style={{
                flex: isMobile ? 'none' : '1.2',
                background: '#050408',
                padding: isMobile ? '24px' : '40px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: isMobile ? 'auto' : undefined,
            }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', opacity: 0.6 }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', opacity: 0.6 }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', opacity: 0.6 }} />
                    <span style={{ marginLeft: '12px', color: 'rgba(16, 185, 129, 0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
                        {title.toLowerCase()}.module.ts
                    </span>
                </div>

                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {isMobile ? (
                        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '13px', whiteSpace: 'pre-wrap', color: '#d1d1d1', lineHeight: '1.4' }}>
                            {code}
                        </div>
                    ) : (
                        <TypingAnimation text={code} isVisible={isInView} />
                    )}
                </div>

                {/* Syntax Glow */}
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-50px',
                    width: '250px',
                    height: '250px',
                    background: `radial-gradient(circle, #10b98108 0%, transparent 70%)`,
                    pointerEvents: 'none'
                }} />
            </div>
        </motion.div>
    );
};

export default SkillCard;
