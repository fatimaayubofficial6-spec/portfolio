import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const Separator = () => {
    const isMobile = useIsMobile();

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '25px 0' : '50px 0',
            position: 'relative',
            zIndex: 10,
        }}>
            {/* Ambient emerald backlight behind separator */}
            <div style={{
                position: 'absolute',
                width: isMobile ? '280px' : '500px',
                height: '30px',
                background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, transparent 75%)',
                filter: 'blur(10px)',
                pointerEvents: 'none',
            }} />

            <div style={{
                width: '80%',
                maxWidth: '1200px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.45), transparent)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Glowing Center Dot */}
                <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#10b981',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.7)',
                }} />
            </div>
        </div>
    );
};

export default Separator;
