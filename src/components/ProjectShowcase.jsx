import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Zap, Shield, Dices, Radio, Play } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

// -------------------------------------------------------------
// Interactive In-Card Simulators
// -------------------------------------------------------------

// 1. MeshTalk Topology Simulator
const MeshSimulator = () => {
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Phone Alpha', x: 20, y: 30, active: true },
    { id: 2, name: 'Relay Node 1', x: 50, y: 15, active: false },
    { id: 3, name: 'Relay Node 2', x: 45, y: 75, active: false },
    { id: 4, name: 'Target Phone', x: 80, y: 45, active: false }
  ]);
  const [hops, setHops] = useState(0);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const triggerBroadcast = () => {
    if (isBroadcasting) return;
    setIsBroadcasting(true);
    sound.playLaser();

    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id <= 2 ? { ...n, active: true } : n));
      setHops(1);
      sound.playHover(700, 0.04);
    }, 400);

    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id <= 3 ? { ...n, active: true } : n));
      setHops(2);
      sound.playHover(900, 0.04);
    }, 800);

    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, active: true })));
      setHops(3);
      setIsBroadcasting(false);
      sound.playClick(1100, 0.08);
    }, 1200);
  };

  return (
    <div className="sim-screen" style={{ marginTop: '1rem', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>
          OFFLINE P2P MESH DEMO
        </span>
        <span className="glass-pill" style={{ fontSize: '0.65rem' }}>
          HOPS: {hops} / OFFLINE
        </span>
      </div>

      <div style={{ height: '90px', position: 'relative', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', overflow: 'hidden' }}>
        {nodes.map(n => (
          <div
            key={n.id}
            style={{
              position: 'absolute',
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: n.active ? '#10b981' : '#334155',
                boxShadow: n.active ? '0 0 12px #10b981' : 'none',
                transition: 'all 0.3s'
              }}
            />
            <span style={{ fontSize: '9px', color: n.active ? '#86efac' : '#64748b', marginTop: '2px' }}>
              {n.name}
            </span>
          </div>
        ))}

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <line x1="20%" y1="30%" x2="50%" y2="15%" stroke={nodes[1].active ? "#10b981" : "#1e293b"} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="20%" y1="30%" x2="45%" y2="75%" stroke={nodes[2].active ? "#10b981" : "#1e293b"} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="15%" x2="80%" y2="45%" stroke={nodes[3].active ? "#10b981" : "#1e293b"} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="45%" y1="75%" x2="80%" y2="45%" stroke={nodes[3].active ? "#10b981" : "#1e293b"} strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>

      <button
        onClick={triggerBroadcast}
        disabled={isBroadcasting}
        className="btn btn-sm btn-primary"
        style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff' }}
      >
        <Radio size={12} />
        {isBroadcasting ? 'ROUTING OFFLINE PACKET...' : 'SEND TEST OFFLINE MESSAGE'}
      </button>
    </div>
  );
};

// 2. Zedox Rarity RNG Simulator
const RngSimulator = () => {
  const [rollResult, setRollResult] = useState({ name: 'Standard Item', tier: 'COMMON', rate: '75%', color: '#94a3b8' });
  const [isRolling, setIsRolling] = useState(false);

  const rollTiers = [
    { name: 'Mythic Relic', tier: 'MYTHIC', rate: '1%', color: '#ec4899' },
    { name: 'Legendary Sword', tier: 'LEGENDARY', rate: '5%', color: '#f59e0b' },
    { name: 'Epic Armor', tier: 'EPIC', rate: '15%', color: '#a855f7' },
    { name: 'Rare Shield', tier: 'RARE', rate: '25%', color: '#00f0ff' },
    { name: 'Standard Item', tier: 'COMMON', rate: '54%', color: '#94a3b8' }
  ];

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    sound.playClick(600, 0.04);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * rollTiers.length);
      setRollResult(rollTiers[randomIdx]);
      sound.playKeyBeep();
      counter++;

      if (counter > 7) {
        clearInterval(interval);
        const rand = Math.random();
        let final;
        if (rand < 0.05) {
          final = rollTiers[0];
          sound.playJackpot();
          try {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          } catch(e){}
        } else if (rand < 0.20) {
          final = rollTiers[1];
          sound.playPowerUp();
        } else if (rand < 0.45) {
          final = rollTiers[2];
          sound.playHover(900, 0.06);
        } else if (rand < 0.75) {
          final = rollTiers[3];
          sound.playHover(700, 0.05);
        } else {
          final = rollTiers[4];
          sound.playClick(800, 0.04);
        }

        setRollResult(final);
        setIsRolling(false);
      }
    }, 60);
  };

  return (
    <div className="sim-screen" style={{ marginTop: '1rem', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 'bold' }}>
          ROBLOX RNG SCRIPT DEMO
        </span>
        <span className="glass-pill" style={{ fontSize: '0.65rem' }}>
          LUAU ENGINE
        </span>
      </div>

      <div
        style={{
          padding: '0.75rem',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '8px',
          textAlign: 'center',
          border: `1px solid ${rollResult.color}50`
        }}
      >
        <div style={{ fontSize: '0.7rem', color: rollResult.color, fontWeight: 'bold', letterSpacing: '1px' }}>
          [ {rollResult.tier} // DROP CHANCE: {rollResult.rate} ]
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', marginTop: '0.25rem' }}>
          {rollResult.name}
        </div>
      </div>

      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="btn btn-sm btn-primary"
        style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000000' }}
      >
        <Dices size={14} />
        {isRolling ? 'CALCULATING DROP...' : 'TEST RNG ROLL'}
      </button>
    </div>
  );
};

// 3. Server Hosting Simulator
const CloudSimulator = () => {
  const [status, setStatus] = useState('SERVER ONLINE (PORT 25565)');
  const [ping, setPing] = useState(12.4);

  const testPing = () => {
    sound.playLaser();
    setStatus('PINGING GAME SERVER...');
    setTimeout(() => {
      setPing((10 + Math.random() * 5).toFixed(1));
      setStatus('SERVER ONLINE // LOW LATENCY');
      sound.playClick(1000, 0.06);
    }, 400);
  };

  return (
    <div className="sim-screen" style={{ marginTop: '1rem', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 'bold' }}>
          SERVER CONNECTION TEST
        </span>
        <span className="glass-pill" style={{ fontSize: '0.65rem' }}>
          PING: {ping}ms
        </span>
      </div>

      <div style={{ padding: '0.6rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', fontSize: '0.75rem' }}>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-dim)' }}>Status:</span>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>{status}</span>
        </div>
      </div>

      <button
        onClick={testPing}
        className="btn btn-sm btn-violet"
        style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem' }}
      >
        <Shield size={12} />
        TEST SERVER PING
      </button>
    </div>
  );
};

// -------------------------------------------------------------
// Main Projects Component
// -------------------------------------------------------------
const ProjectShowcase = ({ onOpenShowreel }) => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section className="container section-spacing" id="projects">
      {/* Section Header */}
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '3rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-cyan)' }} />
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Hands-on Builds
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)' }}>
            FEATURED <span className="text-gradient">PROJECTS</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '550px', marginTop: '0.4rem' }}>
            Interactive demonstrations of projects I built in Android, Roblox game scripting, server hosting, and web dev.
          </p>
        </div>

        <button
          onClick={onOpenShowreel}
          className="btn btn-primary btn-sm"
        >
          <Play size={14} />
          WATCH SHOWREEL
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 grid-md-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="glass-panel"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              borderColor: `${project.accent}30`
            }}
          >
            {/* Card Header */}
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div>
                <span
                  className="glass-pill"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}40`,
                    background: `${project.accent}15`,
                    marginBottom: '0.4rem',
                    display: 'inline-block'
                  }}
                >
                  {project.category}
                </span>
                <h3 style={{ fontSize: '1.35rem', color: '#f8fafc', marginTop: '0.2rem' }}>
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-icon btn-sm btn-outline"
                  title="View on GitHub"
                  onClick={() => sound.playClick()}
                >
                  <Github size={15} />
                </a>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem', flexGrow: 1 }}>
              {project.description}
            </p>

            {/* Embedded Live Simulator */}
            {project.simulatorType === 'mesh' && <MeshSimulator />}
            {project.simulatorType === 'rng' && <RngSimulator />}
            {project.simulatorType === 'ping' && <CloudSimulator />}
            {project.simulatorType === 'terminal' && (
              <div className="sim-screen" style={{ marginTop: '1rem', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                  INTERACTIVE CLI SHELL READY
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Use the CLI terminal below to type commands like <code style={{ color: '#00f0ff' }}>`help`</code>.
                </div>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2" style={{ marginTop: '1.25rem' }}>
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
