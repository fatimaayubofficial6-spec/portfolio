import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import SVGMobile from './SVGMobile';
import useIsMobile from '../hooks/useIsMobile';

const cvData = {
    education: [
        { degree: "Master of Computer Science", school: "Stanford University", year: "2022 - 2024" },
        { degree: "Bachelor of Software Engineering", school: "MIT", year: "2018 - 2022" },
        { degree: "Specialization in AI", school: "Google Data Institute", year: "2021" }
    ],
    experience: [
        { role: "Senior Frontend Engineer", company: "Vercel", year: "2024 - Present" },
        { role: "Software Engineer", company: "Google", year: "2022 - 2024" },
        { role: "Frontend Intern", company: "Meta", year: "2021" },
        { role: "UI/UX Designer", company: "Freelance", year: "2019 - 2021" }
    ]
};

const TimelineSection = () => {
    const isMobile = useIsMobile();
    const containerRef = React.useRef(null);
    const [activeSection, setActiveSection] = useState('education');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v > 0.5) {
            setActiveSection('experience');
        } else {
            setActiveSection('education');
        }
    });

    // Background label animations - Symmetrical entry/exit from center
    const educationOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.3, 0.3, 0, 0]);
    const experienceOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0, 0, 0.3, 0.3]);

    // Move from center to left / right to center
    const educationX = useTransform(scrollYProgress, [0.45, 0.55], ["0%", "-30%"]);
    const experienceX = useTransform(scrollYProgress, [0.45, 0.55], ["30%", "0%"]);

    const educationScale = useTransform(scrollYProgress, [0.45, 0.55], [1, 0.8]);
    const experienceScale = useTransform(scrollYProgress, [0.45, 0.55], [0.8, 1]);

    return (
        <section ref={containerRef} style={{
            position: 'relative',
            height: '300vh',
            background: 'transparent',
            zIndex: 10
        }}>
            {/* Sticky Container */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {/* Background Text Labels - Centered behind mobile SVG */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 0
                }}>
                    <motion.div style={{
                        position: 'absolute',
                        opacity: educationOpacity,
                        x: educationX,
                        scale: educationScale,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        width: '100%'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(3.5rem, 15vw, 15vw)',
                            fontWeight: 900,
                            fontFamily: '"Syncopate", sans-serif',
                            color: '#fff',
                            lineHeight: 1,
                            textTransform: 'uppercase',
                            margin: 0
                        }}>Education</h2>
                    </motion.div>

                    <motion.div style={{
                        position: 'absolute',
                        opacity: experienceOpacity,
                        x: experienceX,
                        scale: experienceScale,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        width: '100%'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(3.5rem, 15vw, 15vw)',
                            fontWeight: 900,
                            fontFamily: '"Syncopate", sans-serif',
                            color: '#fff',
                            lineHeight: 1,
                            textTransform: 'uppercase',
                            margin: 0
                        }}>Experience</h2>
                    </motion.div>
                </div>

                {/* Centered Mobile SVG */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    style={{ zIndex: 20 }}
                >
                    <SVGMobile activeSection={activeSection} data={cvData} />
                </motion.div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 30
                }}>
                    <span style={{
                        fontSize: '10px',
                        fontFamily: '"Fira Code", monospace',
                        color: '#10b981',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        opacity: 0.6
                    }}>Scroll to Navigate History</span>
                    <div style={{
                        width: '2px',
                        height: '60px',
                        background: 'rgba(255,255,255,0.1)',
                        position: 'relative'
                    }}>
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                background: '#10b981',
                                height: '100%',
                                scaleY: scrollYProgress,
                                originY: 0
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
