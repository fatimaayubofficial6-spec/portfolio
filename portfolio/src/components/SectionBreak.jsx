import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const SectionBreak = () => {
    const isMobile = useIsMobile();

    const MarqueeRow = ({ children, direction = 'left', speed = 35 }) => (
        <div style={{ width: '100%' }}>
            <div style={{
                display: 'flex',
                width: 'max-content',
                animation: `scroll-${direction} ${speed}s linear infinite`,
                whiteSpace: 'nowrap',
            }}>
                {children}
                {children}
            </div>
        </div>
    );

    // Shared style for both mobile and desktop
    const rowStyle = {
        fontSize: isMobile ? 'clamp(4.5rem, 15vw, 7rem)' : 'clamp(4rem, 10vw, 9rem)',
        fontWeight: 900,
        fontFamily: '"Outfit", sans-serif',
        color: 'rgba(16, 185, 129, 0.15)',
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        paddingRight: '30px',
        textTransform: 'uppercase',
    };

    // Row 2: very faint white outlined
    const rowStyleWhite = {
        fontSize: isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : 'clamp(3rem, 8vw, 7rem)',
        fontWeight: 900,
        fontFamily: '"Syncopate", sans-serif',
        color: 'rgba(255, 255, 255, 0.06)',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        paddingRight: '30px',
        textTransform: 'uppercase',
    };

    return (
        <>
            <style>{`
                @keyframes scroll-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
            `}</style>
            <div style={{
                padding: isMobile ? '4px 0' : '20px 0',
                overflow: 'hidden',
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '2px' : '8px',
                userSelect: 'none',
                pointerEvents: 'none',
                opacity: isMobile ? 0.9 : 1,
            }}>
                {/* Row 1: Moving Left */}
                <MarqueeRow direction="left" speed={38}>
                    {[...Array(6)].map((_, i) => (
                        <span key={i} style={rowStyle}>
                            SKILLS
                        </span>
                    ))}
                </MarqueeRow>
            </div>
        </>
    );
};

export default SectionBreak;
