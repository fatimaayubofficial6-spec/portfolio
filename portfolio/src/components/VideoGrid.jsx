import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import vid1 from '../assets/project-2/vid1.webm';
import vid2 from '../assets/project-2/vid2.mp4';
import vid3 from '../assets/project-2/vid3.webm';
import vid4 from '../assets/project-2/vid4.webm';

const videos = [
    { id: 1, src: vid1, title: "Market Analysis" },
    { id: 2, src: vid2, title: "Buyer Intent" },
    { id: 3, src: vid3, title: "Asset Generation" },
    { id: 4, src: vid4, title: "Execution" },

];

const VideoGrid = () => {
    const isMobile = useIsMobile();
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section style={{
            padding: isMobile ? '30px 20px' : '60px 80px',
            background: '#050505',
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <span style={{
                    fontSize: '11px',
                    fontFamily: '"Fira Code", monospace',
                    color: '#10b981',
                    letterSpacing: '4px',
                    textTransform: 'uppercase'
                }}>
                    // Project Intelligence
                </span>
                <h2 style={{
                    fontSize: isMobile ? '2rem' : '3.5rem',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    color: '#fff',
                    margin: 0,
                    letterSpacing: '-2px'
                }}>
                    Automated Insights
                </h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
                gap: isMobile ? '30px' : '15px',
                width: '100%'
            }}>
                {videos.map((vid) => (
                    <motion.div
                        key={vid.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: vid.id * 0.1 }}
                        onClick={() => setSelectedVideo(vid)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: '#111',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            position: 'relative'
                        }}>
                            <video
                                src={vid.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }}
                            className="play-overlay"
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000',
                                    fontSize: '1.2rem'
                                }}>▶</div>
                            </div>
                        </div>
                        <div style={{ padding: '0 5px' }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                margin: 0,
                                color: '#fff',
                                fontFamily: '"Outfit", sans-serif'
                            }}>
                                {vid.title}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'rgba(255,255,255,0.5)',
                                marginTop: '8px',
                                lineHeight: 1.5
                            }}>
                                Click to play full intelligence stream.
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Video Modal Player */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobile ? '20px' : '40px'
                        }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                width: '100%',
                                maxWidth: '700px',
                                aspectRatio: '16/9',
                                background: '#000',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={selectedVideo.src}
                                autoPlay
                                controls
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10
                                }}
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .play-overlay:hover { opacity: 1 !important; }
            `}} />
        </section>
    );
};

export default VideoGrid;
