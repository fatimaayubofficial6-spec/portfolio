import React, { useRef } from 'react'
import { Html, Float, PresentationControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function Laptop({ scrollProgress }) {
    const lidRotation = -Math.PI / 2 + (Math.min(1, Math.max(0, (scrollProgress - 0.05) / 0.3)) * (Math.PI / 2 - 0.1))

    return (
        <group position={[0, -0.6, 0]} scale={1.2}>
            <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0.1, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
                <Float rotationIntensity={0.2} speed={1.5}>
                    {/* Main Body */}
                    <mesh position={[0, 0, 0]} receiveShadow>
                        <boxGeometry args={[4, 0.12, 2.8]} />
                        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                    </mesh>

                    {/* Screen Lid */}
                    <group position={[0, 0.05, -1.4]} rotation={[lidRotation, 0, 0]}>
                        <mesh position={[0, 1.4, 0]} castShadow>
                            <boxGeometry args={[4, 2.8, 0.08]} />
                            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                        </mesh>

                        {/* Screen Content */}
                        <Html
                            transform
                            wrapperClass="htmlScreen"
                            distanceFactor={1.2}
                            position={[0, 1.4, 0.05]}
                        >
                            <div className="laptop-screen-content">
                                <LaptopScreenContent scrollProgress={scrollProgress} />
                            </div>
                        </Html>
                    </group>
                </Float>
            </PresentationControls>
        </group>
    )
}

function LaptopScreenContent({ scrollProgress }) {
    // HTML-tagged text
    const line1 = "<h1>Hira Fatima</h1>";
    const line2 = "<h2>Full Stack Developer</h2>";
    const line3 = "<p>Turning Ideas into Product</p>";
    const line4 = "<p>MERN • Next.js • MongoDB • SQL • Deployment </p>";
    const line5 = "<small>AI • SaaS • Web Apps</small>";

    // Animation timing
    const textProgress = Math.max(0, (scrollProgress - 0.3) / 0.6)
    const totalLength = line1.length + line2.length + line3.length + line4.length + line5.length;

    const renderText = (text, startIdx, color) => {
        return text.split('').map((char, i) => {
            const idx = startIdx + i;
            const isVisible = textProgress * totalLength > idx;

            // Syntax highlighting for tags
            let charColor = color;
            if (char === '<' || char === '>' || char === '/') {
                charColor = '#d946ef'; // Fuchsia/Pink for tags
            } else if (char === '•') {
                charColor = '#10b981';
            }

            return (
                <motion.span
                    key={idx}
                    style={{
                        display: 'inline-block',
                        color: charColor,
                        opacity: 0,
                        textShadow: `0 0 10px ${charColor}40`
                    }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 5
                    }}
                    transition={{ duration: 0.1 }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            );
        });
    };

    return (
        <div style={{
            width: '1000px',
            height: '670px',
            background: '#0a0510', // Deep purple-black
            color: '#a855f7', // Default Purple
            padding: '60px 80px',
            fontFamily: '"Fira Code", monospace',
            fontSize: '32px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '6px solid #1a1a1a',
            borderRadius: '12px',
            boxShadow: 'inset 0 0 150px rgba(168, 85, 247, 0.1)'
        }}>
            <div style={{ marginBottom: '8px' }}>
                {renderText(line1, 0, '#a855f7')}
            </div>
            <div style={{ marginBottom: '8px' }}>
                {renderText(line2, line1.length, '#c084fc')}
            </div>
            <div style={{ marginBottom: '8px' }}>
                {renderText(line3, line1.length + line2.length, '#b181ff')}
            </div>
            <div style={{ marginBottom: '8px' }}>
                {renderText(line4, line1.length + line2.length + line3.length, '#38bdf8')}
            </div>
            <div>
                {renderText(line5, line1.length + line2.length + line3.length + line4.length, '#10b981')}
            </div>

            {/* Blinking cursor */}
            <div style={{ marginTop: '16px' }}>
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ width: '20px', height: '34px', background: '#a855f7', display: 'inline-block' }}
                />
            </div>

            <div style={{
                marginTop: '40px',
                fontSize: '20px',
                opacity: 0.4,
                color: '#a855f7'
            }}>
                {`/* Building something awesome */`}
            </div>
        </div>
    )
}
