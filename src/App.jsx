import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import { motion } from 'framer-motion';
import { Shield, Cpu, MessageSquare, Zap, ExternalLink, Code, Github, MessageCircle } from 'lucide-react';

function App() {
    return (
        <div className="portfolio-wrapper">
            <ThreeBackground />

            {/* Navbar */}
            <nav className="nav-fixed flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold', color: '#0f081a' }}>
                        <span style={{ margin: 'auto' }}>Z</span>
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ZEDOX <span className="text-[var(--primary)]">TECH</span></h1>
                </div>

                <div className="nav-links flex gap-8">
                    <a href="#projects">Projects</a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </div>

                <button className="btn btn-primary" onClick={() => window.open('https://discord.com/users/zedoxtech_06334', '_blank')}>HIRE ME</button>
            </nav>

            {/* Hero */}
            <section className="hero container flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <div className="hero-tag">Establishing the Offline Future</div>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                        INNOVATE <br />
                        <span className="text-gradient">EVERYWHERE</span>
                    </h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                        Independent Developer engineering high-performance mesh networks,
                        AI-driven crisis tools, and immersive gaming experiences.
                    </p>
                    <div className="flex justify-center gap-6">
                        <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView()}>EXPLORE WORK</button>
                        <a href="https://github.com/ybsolanki" target="_blank" rel="noreferrer" className="btn btn-outline">VIEW GITHUB</a>
                    </div>
                </motion.div>
            </section>

            {/* Projects */}
            <section id="projects" className="container" style={{ padding: '8rem 2rem' }}>
                <div className="flex flex-col flex-md-row justify-between items-center gap-4" style={{ marginBottom: '4rem', textAlign: 'left' }}>
                    <div>
                        <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px' }}>Portfolio Showcase</span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>FEATURED <span className="text-gradient">LABS</span></h2>
                    </div>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', maxWidth: '300px' }}>
                        A selection of my best work in mesh networking and game systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 grid-md-3 gap-8">
                    {/* MeshTalk */}
                    <motion.div whileHover={{ y: -10 }} className="glass-panel flex flex-col">
                        <div className="icon-box" style={{ background: 'rgba(183, 228, 199, 0.1)' }}>
                            <MessageSquare style={{ color: 'var(--primary)' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>MeshTalk Native</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem', flexGrow: 1 }}>
                            Android-based decentralized communication system for offline disaster recovery environments.
                        </p>
                        <div className="flex justify-between items-center">
                            <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px' }}>MOBILE / AI</span>
                            <ExternalLink size={16} style={{ color: 'var(--text-dim)' }} />
                        </div>
                    </motion.div>

                    {/* Zedox Rarity */}
                    <motion.div whileHover={{ y: -10 }} className="glass-panel flex flex-col">
                        <div className="icon-box" style={{ background: 'rgba(255, 204, 128, 0.1)' }}>
                            <Code style={{ color: 'var(--secondary)' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Zedox Rarity</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem', flexGrow: 1 }}>
                            Production-grade RNG core for Roblox developers. Modular, high-precision, and ultra-performant.
                        </p>
                        <div className="flex justify-between items-center">
                            <span style={{ fontSize: '10px', color: 'var(--secondary)', fontWeight: 'bold', letterSpacing: '2px' }}>ROBLOX / LUA</span>
                            <ExternalLink size={16} style={{ color: 'var(--text-dim)' }} />
                        </div>
                    </motion.div>

                    {/* Cloud Infra */}
                    <motion.div whileHover={{ y: -10 }} className="glass-panel flex flex-col">
                        <div className="icon-box" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                            <Cpu style={{ color: '#a855f7' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Cloud Infra</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem', flexGrow: 1 }}>
                            High-uptime server infrastructure for Minecraft networks. Specialized in DDoS mitigation and low-latency.
                        </p>
                        <div className="flex justify-between items-center">
                            <span style={{ fontSize: '10px', color: '#a855f7', fontWeight: 'bold', letterSpacing: '2px' }}>NETWORK / SERVER</span>
                            <ExternalLink size={16} style={{ color: 'var(--text-dim)' }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section (Placeholder ID) */}
            <section id="experience" className="container" style={{ padding: '4rem 2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Experience</h2>
                <div className="glass-panel">
                    <p className="text-gray-400">Owner & Lead Developer @ Zedox Server Networks</p>
                    <p className="text-gray-500 text-sm">2024 - Present</p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <h2 className="text-4xl mb-8">READY TO <span className="text-gradient">START?</span></h2>
                <p className="text-gray-400 mb-12">I'm currently available for freelance commissions in Roblox, Minecraft, and Android dev.</p>
                <button className="btn btn-primary" onClick={() => window.open('https://discord.com/users/zedoxtech_06334', '_blank')}>MESSAGE ON DISCORD</button>
            </section>

            {/* Footer */}
            <footer className="container" style={{ padding: '5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '1.5rem', letterSpacing: '2px' }}>DEVELOPED BY ZEDOXTECH</p>
                <div className="flex justify-center gap-6 mb-8">
                    <a href="https://github.com/ybsolanki" target="_blank" rel="noreferrer"><Github style={{ color: 'var(--text-dim)', cursor: 'pointer' }} /></a>
                    <MessageCircle style={{ color: 'var(--text-dim)', cursor: 'pointer' }} onClick={() => window.open('https://discord.com/users/zedoxtech_06334', '_blank')} />
                </div>
                <p style={{ fontSize: '10px', color: '#4a5568' }}>© 2026 INTERNAL PROTOCOL. ALL RIGHTS RESERVED.</p>
            </footer>
        </div>
    );
}

export default App;
