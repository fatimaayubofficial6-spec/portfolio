import React, { useRef } from 'react';
import SkillCard from './SkillCard';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const skills = [
    {
        title: 'React',
        icon: '⚛️',
        color: '#61dafb',
        code: `export const App = () => {\n  const [state, setState] = useState();\n  \n  return (\n    <div className="portfolio-v2">\n      <Scene>\n        <Canvas shadows />\n      </Scene>\n    </div>\n  );\n};`
    },
    {
        title: 'TypeScript',
        icon: '🟦',
        color: '#3178c6',
        code: `interface IProject {\n  id: string;\n  name: string;\n  status: 'live' | 'build';\n}\n\nconst project: IProject = {\n  id: '01',\n  name: 'Portfolio',\n  status: 'live'\n};`
    },
    {
        title: 'Node.js',
        icon: '🟢',
        color: '#339933',
        code: `const express = require('express');\nconst app = express();\n\napp.get('/api/health', (req, res) => {\n  res.status(200).send({\n    data: 'System Online'\n  });\n});`
    },
    {
        title: 'Three.js',
        icon: '🌐',
        color: '#ffffff',
        code: `const renderer = new WebGLRenderer();\nrenderer.setPixelRatio(window.devicePixelRatio);\n\nconst animate = () => {\n  requestAnimationFrame(animate);\n  mesh.rotation.y += 0.01;\n};`
    },
    {
        title: 'Next.js',
        icon: '▲',
        color: '#fff',
        code: `export default function Page() {\n  return (\n    <main className="flex min-h-screen">\n      <Suspense fallback={<Loading />}>\n        <DynamicContent />\n      </Suspense>\n    </main>\n  );\n}`
    }
];

const SkillsSection = () => {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} style={{
            paddingBottom: '10vh',
            background: 'transparent',
            position: 'relative',
            zIndex: 2,
            /* overflow:hidden removed — it breaks position:sticky */
        }}>

            {/* Cards on top */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {skills.map((skill, index) => (
                    <StackedCard key={index} skill={skill} index={index} />
                ))}
            </div>
        </section>

    );
};

const StackedCard = ({ skill, index }) => {
    const isMobile = useIsMobile();
    const stickyTop = isMobile ? (10 + (index * 10)) : (80 + (index * 40));

    return (
        <div
            style={{
                position: 'sticky',
                top: `${stickyTop}px`,
                width: '100%',
                marginBottom: isMobile ? '30px' : '20vh',
                display: 'flex',
                justifyContent: 'center',
                willChange: 'transform',
                zIndex: index + 1,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ width: '100%' }}
            >
                <SkillCard {...skill} />
            </motion.div>
        </div>
    );
};

export default SkillsSection;
