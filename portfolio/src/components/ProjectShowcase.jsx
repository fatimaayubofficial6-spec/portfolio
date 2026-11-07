import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const ProjectShowcase = ({
    title = "Project Title",
    label = "// Featured Case Study",
    description = "A detailed overview of the project's core objectives, implementation strategies, and successful outcomes. This section highlights the technical challenges overcome and the innovative solutions applied to deliver a world-class digital experience.",
    image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    isReversed = false,
    accentColor = "#10b981",
    number = "03"
}) => {
    const isMobile = useIsMobile();
    const words = description.split(" ");

    // Tilt Animation Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - (rect.left + rect.width / 2));
        mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.8,
            }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: isReversed ? 100 : -100 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section style={{
            width: '100%',
            padding: isMobile ? '80px 20px' : '150px 10vw',
            background: 'transparent',
            display: 'flex',
            flexDirection: isMobile ? 'column' : (isReversed ? 'row-reverse' : 'row'),
            alignItems: 'center',
            gap: isMobile ? '40px' : '6vw', // Tighter gap
            position: 'relative',
            overflow: 'visible'
        }}>
            {/* Massive Background Number */}
            <motion.h3
                initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                whileInView={{ opacity: 0.04, x: isReversed ? -20 : 20 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    [isReversed ? 'left' : 'right']: '0%',
                    transform: 'translateY(-50%)',
                    fontSize: 'clamp(10rem, 35vw, 45rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: '#fff',
                    pointerEvents: 'none',
                    zIndex: 0,
                    fontFamily: '"Syncopate", sans-serif'
                }}
            >
                {number}
            </motion.h3>

            {/* Image Column with 3D Tilt */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageVariants}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    flex: 1, // Balanced ratio
                    width: '100%',
                    perspective: '1500px',
                    zIndex: 2,
                    position: 'relative'
                }}
            >
                {/* Horizontal Aesthetic Line */}
                <div style={{
                    position: 'absolute',
                    top: '-20px',
                    [isReversed ? 'right' : 'left']: '10%',
                    width: '60%',
                    height: '1px',
                    background: `linear-gradient(to ${isReversed ? 'left' : 'right'}, ${accentColor}, transparent)`,
                    opacity: 0.3
                }} />

                <motion.div
                    style={{
                        rotateX: isMobile ? 0 : springRotateX,
                        rotateY: isMobile ? 0 : springRotateY,
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        aspectRatio: isMobile ? '16/11' : '4/5', // Portrait ratio for more height
                        boxShadow: `0 50px 120px -30px rgba(0,0,0,0.8), 0 0 80px ${accentColor}10`,
                        border: `1px solid rgba(255, 255, 255, 0.08)`,
                        background: '#13111c',
                        transformStyle: 'preserve-3d',
                        zIndex: 2
                    }}
                >
                    <motion.img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: 'translateZ(-10px) scale(1.1)',
                            filter: 'brightness(1.1) contrast(1.05)' // Aesthetic boost
                        }}
                    />

                    {/* Glass Surface Overlay - Lighter */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`,
                        pointerEvents: 'none'
                    }} />

                    {/* Glowing Accent Frame - More Vibrant */}
                    <div style={{
                        position: 'absolute',
                        inset: '12px',
                        border: `1px solid ${accentColor}40`,
                        borderRadius: '16px',
                        pointerEvents: 'none',
                        mixBlendMode: 'plus-lighter'
                    }} />

                    {/* Vertical Aesthetic Label */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        [isReversed ? 'left' : 'right']: '20px',
                        transform: 'rotate(-90deg) translateX(50%)',
                        transformOrigin: 'bottom right',
                        fontSize: '9px',
                        fontFamily: '"Fira Code", monospace',
                        color: '#fff',
                        opacity: 0.4,
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}>
                        {label.replace('// ', '')} / {number}
                    </div>
                </motion.div>

                {/* Mesh Gradient / Float Light */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: isReversed ? '0%' : '70%',
                        width: '400px',
                        height: '400px',
                        background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
                        zIndex: -1,
                        filter: 'blur(80px)'
                    }}
                />
            </motion.div>

            {/* Content Column */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                    gap: 32,
                    zIndex: 2,
                    padding: isMobile ? '0' : '40px',
                    borderRadius: '40px',
                    background: isMobile ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: isMobile ? 'none' : 'blur(10px)',
                    border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <motion.span
                        variants={wordVariants}
                        style={{
                            fontSize: '10px',
                            fontFamily: '"Fira Code", monospace',
                            color: accentColor,
                            letterSpacing: '5px',
                            textTransform: 'lowercase', // Modern lowercase look
                            opacity: 0.8
                        }}
                    >
                        {label}
                    </motion.span>
                    <motion.h2
                        variants={wordVariants}
                        style={{
                            fontSize: isMobile ? '2.5rem' : '4.5rem',
                            fontWeight: 900,
                            margin: 0,
                            color: '#fff',
                            lineHeight: 0.9,
                            fontFamily: '"Syncopate", sans-serif',
                            letterSpacing: '-2px'
                        }}
                    >
                        {title}
                    </motion.h2>
                </div>

                <div style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 300,
                    fontFamily: '"Outfit", sans-serif',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={wordVariants}
                            style={{
                                display: 'inline-block',
                                marginRight: '0.25em'
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                <motion.button
                    variants={wordVariants}
                    whileHover={{
                        scale: 1.02,
                        backgroundColor: '#fff',
                        color: '#000',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        marginTop: 12,
                        padding: '20px 40px',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"Syncopate", sans-serif',
                        color: '#fff',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '0', // Sharp modern look
                        cursor: 'pointer',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        textTransform: 'uppercase',
                        letterSpacing: '3px'
                    }}
                >
                    Case Study
                </motion.button>
            </motion.div>
        </section>
    );
};

export default ProjectShowcase;
