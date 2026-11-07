import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

import img1 from '../assets/projects/1.png';
import img2 from '../assets/projects/2.png';
import img3 from '../assets/projects/3.png';
import img4 from '../assets/projects/4.png';
import img5 from '../assets/projects/5.png';
import img6 from '../assets/projects/6.png';
import img7 from '../assets/projects/7.png';
import img8 from '../assets/projects/8.png';
import img9 from '../assets/projects/9.png';
import img10 from '../assets/projects/10.png';

const projects = [
    {
        id: "01",
        title: "CAS Advisory Dashboard",
        subtitle: "fintech · react · analytics",
        image: img9,
    },
    {
        id: "02",
        title: "BK Car Wash Platform",
        subtitle: "booking system · react · tailwind",
        image: img8,
    },
    {
        id: "03",
        title: "Dubai Real Estate",
        subtitle: "property portal · react · mapbox",
        image: img2,
    },
    {
        id: "04",
        title: "EmmaDesigns E-Commerce",
        subtitle: "full-stack · shopify · react",
        image: img6,
    },
    {
        id: "05",
        title: "Dental Clinic Web App",
        subtitle: "healthcare · next.js · ui/ux",
        image: img4,
    },
    {
        id: "06",
        title: "Digital Products Market",
        subtitle: "admin dashboard · react · node.js",
        image: img1,
    },
    {
        id: "07",
        title: "AI Development Agency",
        subtitle: "machine learning · python · react",
        image: img3,
    },
    {
        id: "08",
        title: "Custom CakeStore",
        subtitle: "e-commerce · wordpress · custom design",
        image: img5,
    },
    {
        id: "09",
        title: "Mobile App Suite",
        subtitle: "mobile · react native · ui/ux",
        image: img7,
    },
    {
        id: "10",
        title: "Expenso Finance Tracker",
        subtitle: "analytics · react · chart.js",
        image: img10,
    },
];

const ProjectsSection = () => {
    const isMobile = useIsMobile();
    // Triple projects array for a perfectly seamless 3-stage loop
    const displayProjects = [...projects, ...projects, ...projects];

    return (
        <section
            style={{
                position: 'relative',
                padding: '20px 0',
                background: 'transparent',
                overflow: 'hidden',
                zIndex: 1,
            }}
        >

            {/* Infinite scrolling track container */}
            <div style={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '20px 0',
            }}>
                <div
                    className="projects-scroll-track"
                    style={{
                        display: 'flex',
                        gap: isMobile ? '25px' : '40px', // Gap between items
                        paddingRight: isMobile ? '25px' : '40px', // Essential for perfect loop
                        width: 'max-content',
                    }}
                >
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={`${project.id}-${index}`}
                            initial="initial"
                            style={{
                                flexShrink: 0,
                                width: isMobile ? '280px' : '400px',
                                height: isMobile ? '60vh' : '95vh',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#0a0910',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                cursor: 'default',
                                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                                zIndex: index % projects.length,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Browser Header Bar */}
                            <div style={{
                                height: '32px',
                                background: 'rgba(20, 18, 30, 0.95)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 14px',
                                gap: '8px',
                                flexShrink: 0,
                                zIndex: 4,
                            }}>
                                {/* Mac OS Dots */}
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />

                                {/* Empty Minimal URL Bar */}
                                <div style={{
                                    marginLeft: '10px',
                                    flex: 1,
                                    maxWidth: '180px',
                                    height: '14px',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    borderRadius: '100px',
                                }} />
                            </div>

                            {/* Image Container with Top-Aligned Crop */}
                            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'top center',
                                        display: 'block',
                                    }}
                                />
                            </div>

                            {/* Browser Footer / Status Bar */}
                            <div style={{
                                height: '24px',
                                background: 'rgba(20, 18, 30, 0.95)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 14px',
                                flexShrink: 0,
                                zIndex: 4,
                            }}>
                                {/* Left indicator */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                    <div style={{ width: '40px', height: '4px', borderRadius: '100px', background: 'rgba(255, 255, 255, 0.1)' }} />
                                </div>

                                {/* Right minimal accents */}
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div style={{ width: '12px', height: '4px', borderRadius: '100px', background: 'rgba(255, 255, 255, 0.15)' }} />
                                    <div style={{ width: '6px', height: '4px', borderRadius: '100px', background: 'rgba(255, 255, 255, 0.1)' }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Fade Mask */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
                background: 'linear-gradient(to top, #050505, transparent)',
                zIndex: 5,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default ProjectsSection;
