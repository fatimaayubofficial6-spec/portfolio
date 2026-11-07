import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const SVGLaptop = ({ scrollProgress }) => {
    const [scrollVal, setScrollVal] = useState(0);
    const isMobile = useIsMobile();
    const opacity = useTransform(scrollProgress, [0.7, 1], [1, 0]);

    useMotionValueEvent(scrollProgress, "change", (v) => {
        setScrollVal(v);
    });

    const lines = [
        "function Developer() {",
        "  return (",
        "    <div>",
        "      <h1>Hira Fatima</h1>",
        "      <h2>Full Stack Developer</h2>",
        "      <p>Turning Ideas into Product</p>",
        "      <small>AI • SaaS • Web Apps</small>",
        "    </div>",
        "  );",
        "}",
    ];

    // Maps textProgress from scrollVal 0 -> 0.42 on mobile (types faster and completes naturally)
    const textProgress = isMobile
        ? Math.max(0, Math.min(1, scrollVal / 0.42))
        : Math.max(0, Math.min(1, scrollVal / 0.55));
    const totalChars = lines.reduce((acc, l) => acc + l.length, 0);
    const charsToShow = Math.floor(textProgress * totalChars);

    let runningChars = 0;
    const lineData = lines.map((lineText) => {
        const start = runningChars;
        runningChars += lineText.length;
        const currentChars = Math.max(0, Math.min(lineText.length, charsToShow - start));
        const isTyping = charsToShow >= start && (charsToShow < runningChars || (charsToShow >= totalChars && start + lineText.length === totalChars));
        return {
            text: lineText.slice(0, currentChars),
            isTyping,
        };
    });

    // JSX Syntax highlighting per character
    const renderLine = (text, lineIdx) =>
        text.split('').map((char, i) => {
            let c = '#e2e8f0';
            let f = '"Outfit", sans-serif';
            let fs = isMobile ? '20px' : '18.5px';
            let fw = 400;

            if ('<>/'.includes(char)) c = '#4ade80';
            else if ('"'.includes(char)) c = '#fb923c';
            else if ('()[]'.includes(char)) c = '#94a3b8';
            else if (char === '•') c = '#10b981';
            else if (lineIdx === 0) c = '#818cf8';
            else if (lineIdx === 1) c = '#38bdf8';
            else if (lineIdx === 2) c = '#4ade80';
            else if (lineIdx === 3) { c = '#10b981'; fw = 700; }
            else if (lineIdx === 4) { c = '#34d399'; fw = 600; }
            else if (lineIdx === 5) { c = '#a7f3d0'; fw = 400; }
            else if (lineIdx === 6) { c = '#38bdf8'; fw = 500; }
            else if (lineIdx === 7) { c = '#6ee7b7'; fw = 600; }
            else if (lineIdx === 8) c = '#4ade80';
            else if (lineIdx === 9) c = '#38bdf8';
            else if (lineIdx === 10) c = '#818cf8';

            return (
                <span key={i} style={{
                    color: c,
                    fontFamily: f,
                    fontSize: fs,
                    fontWeight: fw,
                    lineHeight: isMobile ? 1.4 : 1.5,
                    textShadow: isMobile ? 'none' : `0 0 10px ${c}60`,
                }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            );
        });

    const laptopScale = isMobile
        ? typeof window !== 'undefined'
            ? Math.min(0.52, Math.max(0.40, (window.innerWidth - 30) / 680))
            : 0.46
        : 1;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '100vw',
            height: isMobile ? '310px' : 'auto',
            overflow: 'hidden',
            boxSizing: 'border-box',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                filter: isMobile
                    ? 'drop-shadow(0 14px 20px rgba(0,0,0,0.5))'
                    : 'drop-shadow(0 40px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 50px rgba(16,185,129,0.25)) drop-shadow(0 0 100px rgba(16,185,129,0.1))',
                transform: `scale(${laptopScale})`,
                transformOrigin: 'center center',
            }}>

                {/* Screen Lid */}
                <div style={{
                    width: '660px',
                    height: '420px',
                    position: 'relative',
                    background: 'linear-gradient(160deg, #101614 0%, #0d1210 60%, #0a0e0c 100%)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: '20px 20px 6px 6px',
                    boxShadow:
                        '0 -2px 0 rgba(16,185,129,0.08) inset,' +
                        '0 2px 0 rgba(0,0,0,0.5) inset,' +
                        '0 0 0 1px rgba(16,185,129,0.25),' +
                        '0 0 40px rgba(16,185,129,0.12),' +
                        '0 0 80px rgba(16,185,129,0.06),' +
                        '0 30px 60px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                }}>
                    {/* Neon emerald top edge */}
                    <div style={{
                        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), rgba(52,211,153,0.8), rgba(16,185,129,0.6), transparent)',
                        boxShadow: '0 0 10px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.1)',
                    }} />

                    {/* Side edge accents */}
                    <div style={{
                        position: 'absolute', top: '10%', left: 0, bottom: '10%', width: 1,
                        background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.15), transparent)',
                    }} />
                    <div style={{
                        position: 'absolute', top: '10%', right: 0, bottom: '10%', width: 1,
                        background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.15), transparent)',
                    }} />

                    {/* Apple-style logo area */}
                    <div style={{
                        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
                        width: 10, height: 10, borderRadius: '50%',
                        background: '#1a1a1a',
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                    }} />

                    {/* Screen glass */}
                    <div style={{
                        margin: '22px 14px 14px',
                        height: 'calc(100% - 36px)',
                        background: 'linear-gradient(145deg, #071712, #0b221a)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow:
                            '0 0 0 1px rgba(16,185,129,0.15) inset,' +
                            '0 0 40px rgba(16,185,129,0.12) inset',
                    }}>
                        {/* Screen glow bloom */}
                        <div style={{
                            position: 'absolute',
                            top: '-30%', left: '20%',
                            width: '60%', height: '60%',
                            background: 'radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                            pointerEvents: 'none',
                        }} />

                        {/* Content */}
                        <div style={{ padding: '16px 22px', position: 'relative', zIndex: 1 }}>
                            {/* Terminal bar */}
                            <div style={{
                                display: 'flex', gap: 7, marginBottom: 14, alignItems: 'center',
                            }}>
                                {[['#ff5f56', '#ff3b30'], ['#ffbd2e', '#ff9500'], ['#27c93f', '#34c759']].map(([bg, glow]) => (
                                    <div key={bg} style={{
                                        width: 11, height: 11, borderRadius: '50%', background: bg,
                                        boxShadow: `0 0 6px ${glow}80`,
                                    }} />
                                ))}
                                <div style={{
                                    marginLeft: 'auto',
                                    display: 'flex', gap: 6, alignItems: 'center',
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontFamily: '"Outfit", sans-serif' }}>
                                        portfolio.jsx
                                    </span>
                                    <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.08)' }} />
                                    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, fontFamily: '"Outfit", sans-serif' }}>UTF-8</span>
                                </div>
                            </div>

                            {/* Line numbers + code area */}
                            <div style={{ display: 'flex', gap: 16 }}>
                                {/* Line numbers */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', gap: 0,
                                    color: 'rgba(16,185,129,0.3)', fontFamily: '"Outfit", sans-serif', fontSize: 13,
                                    textAlign: 'right', minWidth: 16,
                                }}>
                                    {lines.map((_, i) => (
                                        <span key={i} style={{ minHeight: 24, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            {i + 1}
                                        </span>
                                    ))}
                                </div>

                                {/* Code lines */}
                                <div style={{ flex: 1 }}>
                                    {lineData.map((ld, idx) => (
                                        <div key={idx} style={{ minHeight: 24, display: 'flex', alignItems: 'center' }}>
                                            {renderLine(ld.text, idx)}
                                            {ld.isTyping && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.65 }}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 2,
                                                        height: 18,
                                                        background: '#10b981',
                                                        marginLeft: 2,
                                                        boxShadow: '0 0 6px #10b981',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom status bar - Fixed absolutely to bottom edge so it never moves on scroll */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 24,
                            background: 'rgba(6, 22, 16, 0.96)',
                            borderTop: '1px solid rgba(16, 185, 129, 0.22)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 14px',
                            gap: 12,
                            zIndex: 10,
                            boxSizing: 'border-box',
                            pointerEvents: 'none',
                        }}>
                            {['main', 'jsx', '✓'].map((t, i) => (
                                <span key={i} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: '"Outfit", sans-serif' }}>{t}</span>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: i < 2 ? '#10b981' : 'rgba(255,255,255,0.1)',
                                        boxShadow: i < 2 ? '0 0 4px #10b981' : 'none',
                                    }} />
                                ))}
                            </div>
                        </div>

                        {/* Screen scanlines */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Lid reflection */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                        background: 'linear-gradient(180deg, rgba(16,185,129,0.04) 0%, transparent 100%)',
                        pointerEvents: 'none', borderRadius: '20px 20px 0 0',
                    }} />
                </div>

                {/* Hinge bar — emerald accent line */}
                <div style={{
                    width: '680px', height: 8, position: 'relative',
                    background: 'linear-gradient(90deg, #0a0a0a, #1a1a1a 20%, #222 50%, #1a1a1a 80%, #0a0a0a)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.8), 0 -1px 0 rgba(16,185,129,0.2)',
                }}>
                    <div style={{
                        position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.7), transparent)',
                    }} />
                </div>

                {/* Keyboard Base */}
                <div style={{
                    width: '680px',
                    position: 'relative',
                    background: 'linear-gradient(180deg, #121815 0%, #0c1210 100%)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    borderTop: 'none',
                    borderRadius: '0 0 18px 18px',
                    padding: '10px 20px 16px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(16,185,129,0.12)',
                }}>
                    {/* Keyboard rows */}
                    {[14, 14, 14].map((count, rowIdx) => (
                        <div key={rowIdx} style={{
                            display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 4,
                        }}>
                            {[...Array(count)].map((_, i) => (
                                <div key={i} style={{
                                    flex: 1, height: 8,
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
                                    borderRadius: 3,
                                    border: '1px solid rgba(255,255,255,0.04)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                                }} />
                            ))}
                        </div>
                    ))}

                    {/* Spacebar row */}
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        {[3, 1, 6, 1, 3].map((flex, i) => (
                            <div key={i} style={{
                                flex, height: 8,
                                background: i === 2
                                    ? 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
                                    : 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                                borderRadius: 3,
                                border: '1px solid rgba(255,255,255,0.04)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                            }} />
                        ))}
                    </div>

                    {/* Trackpad */}
                    <div style={{
                        width: 160, height: 44, margin: '12px auto 0',
                        background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(16,185,129,0.12)',
                        borderRadius: 8,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.5) inset',
                    }} />
                </div>

                {/* Ground lighting — emerald pool */}
                <div style={{
                    width: 620, height: 40, marginTop: 4,
                    background: 'radial-gradient(ellipse, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0.18) 45%, rgba(0,0,0,0) 75%)',
                    filter: 'blur(16px)',
                }} />
            </div>
        </div>
    );
};

export default SVGLaptop;
