import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, Smartphone, Gamepad2, Cpu, Code2, MessageCircle, User, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const iconMap = {
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  Cpu: Cpu,
  Code2: Code2
};

const HeroSection = ({ onOpenShowreel }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      className="container flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '4.5rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Top Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '1.5rem' }}
      >
        <div
          className="glass-pill inline-flex items-center gap-2"
          style={{
            borderColor: 'rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)',
            background: 'rgba(7, 12, 26, 0.75)',
            padding: '0.35rem 1.1rem'
          }}
        >
          <span className="telemetry-dot" />
          <span style={{ color: 'var(--accent-cyan)', fontWeight: '600', letterSpacing: '1px' }}>
            {profile.status}
          </span>
        </div>
      </motion.div>

      {/* Clean, Elegant Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
          fontWeight: '900',
          letterSpacing: '-0.01em'
        }}
      >
        HI, I'M YUG SOLANKI <br />
        <span className="text-gradient">DEVELOPER & IT STUDENT</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          maxWidth: '650px',
          margin: '0 auto 2.25rem',
          color: 'var(--text-muted)',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          lineHeight: 1.65
        }}
      >
        Information Technology student creating hands-on projects in <strong>Android apps</strong>, <strong>Roblox game mechanics</strong>, <strong>server hosting</strong>, and <strong>web development</strong>.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3"
        style={{ marginBottom: '3.5rem' }}
      >
        <button
          onClick={() => {
            sound.playPowerUp();
            onOpenShowreel();
          }}
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}
        >
          <Play size={15} />
          WATCH SHOWREEL
        </button>

        <a
          href="#projects"
          className="btn btn-outline"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.88rem' }}
          onClick={() => sound.playClick()}
        >
          EXPLORE PROJECTS
        </a>

        <a
          href="#about"
          className="btn btn-outline"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.88rem' }}
          onClick={() => sound.playClick()}
        >
          <User size={15} />
          ABOUT ME
        </a>

        <button
          onClick={() => {
            sound.playLaser();
            window.open(profile.discordUrl, '_blank');
          }}
          className="btn btn-violet"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.88rem' }}
        >
          <MessageCircle size={15} />
          DISCORD
        </button>
      </motion.div>

      {/* 4 Core Focus Areas (Real & Professional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          padding: '1.25rem 1.5rem',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          background: 'rgba(10, 15, 28, 0.7)'
        }}
      >
        <div className="grid grid-cols-2 grid-md-4 gap-4">
          {profile.focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center"
              style={{
                borderRight: idx < 3 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                paddingRight: '0.5rem'
              }}
            >
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>
                {area.label}
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginTop: '0.25rem' }}>
                {area.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                {area.detail}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Down */}
      <div style={{ marginTop: '2.5rem' }}>
        <a
          href="#about"
          style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', letterSpacing: '1.5px' }}
          onClick={() => sound.playHover()}
        >
          <span>EXPLORE MY WORK</span>
          <ArrowDown size={13} className="animate-float" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
