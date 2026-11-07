import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SVGMobile = ({ activeSection = 'education', data = {} }) => {
    // Premium Mobile Frame Details
    const frameColor = "#1a1a1a";
    const accentColor = "#10b981";

    return (
        <div style={{
            position: 'relative',
            width: '320px',
            height: '640px',
            background: frameColor,
            borderRadius: '45px',
            padding: '12px',
            boxShadow: `
                0 0 0 2px rgba(255,255,255,0.05),
                0 20px 50px rgba(0,0,0,0.8),
                0 0 100px rgba(16, 185, 129, 0.1)
            `,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {/* Top Notch Area */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '160px',
                height: '30px',
                background: frameColor,
                borderRadius: '0 0 20px 20px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <div style={{ width: '40px', height: '4px', background: '#333', borderRadius: '2px' }} />
                <div style={{ width: '8px', height: '8px', background: '#333', borderRadius: '50%' }} />
            </div>

            {/* Screen Content */}
            <div style={{
                flex: 1,
                background: '#0a0a0a',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Status Bar */}
                <div style={{
                    height: '40px',
                    padding: '0 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: '"Outfit", sans-serif',
                    paddingTop: '10px'
                }}>
                    <span>9:41</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <span>📶</span>
                        <span>🔋</span>
                    </div>
                </div>

                {/* App Content */}
                <div style={{ flex: 1, padding: '20px', color: '#fff' }}>
                    <AnimatePresence mode="wait">
                        {activeSection === 'education' ? (
                            <motion.div
                                key="education"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px', color: accentColor }}>Education</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {data.education?.map((item, idx) => (
                                        <div key={idx} style={{ borderLeft: `2px solid ${accentColor}`, paddingLeft: '15px' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{item.degree}</p>
                                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '4px 0' }}>{item.school}</p>
                                            <p style={{ fontSize: '11px', color: accentColor, margin: 0 }}>{item.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="experience"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px', color: accentColor }}>Experience</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {data.experience?.map((item, idx) => (
                                        <div key={idx} style={{ borderLeft: `2px solid ${accentColor}`, paddingLeft: '15px' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{item.role}</p>
                                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '4px 0' }}>{item.company}</p>
                                            <p style={{ fontSize: '11px', color: accentColor, margin: 0 }}>{item.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Indicator */}
                <div style={{
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                </div>
            </div>
        </div>
    );
};

export default SVGMobile;
