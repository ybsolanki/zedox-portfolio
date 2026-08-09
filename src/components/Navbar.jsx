import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Terminal, Radio, Play, Menu, X, Disc, ExternalLink, Code } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const Navbar = ({ onOpenShowreel, onToggleZeroG, isZeroG, onToggleScanlines, isScanlines }) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsMuted(muted));
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '1rem',
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        pointerEvents: 'none'
      }}
    >
      <div
        className="container glass-panel"
        style={{
          pointerEvents: 'auto',
          padding: '0.65rem 1.5rem',
          borderRadius: 'var(--radius-full)',
          background: scrolled ? 'rgba(7, 11, 22, 0.92)' : 'rgba(11, 16, 30, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.1)' : 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Clean Logo: MY PORTFOLIO */}
        <a
          href="#"
          className="flex items-center gap-2.5"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={() => sound.playHover()}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              color: '#030814',
              boxShadow: '0 0 12px var(--accent-cyan-glow)'
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '1.5px' }}>
            MY <span className="text-gradient">PORTFOLIO</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="flex items-center gap-6 hidden-mobile">
          <a
            href="#about"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(550, 0.03)}
          >
            ABOUT
          </a>
          <a
            href="#projects"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(600, 0.03)}
          >
            PROJECTS
          </a>
          <a
            href="#sandbox"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(650, 0.03)}
          >
            ZERO-G SANDBOX
          </a>
          <a
            href="#skills"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(700, 0.03)}
          >
            SKILLS
          </a>
          <a
            href="#terminal"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(750, 0.03)}
          >
            CLI
          </a>
          <a
            href="#contact"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}
            onMouseEnter={() => sound.playHover(800, 0.03)}
          >
            CONTACT
          </a>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-2">
          {/* Showreel Trigger */}
          <button
            onClick={() => {
              sound.playPowerUp();
              onOpenShowreel();
            }}
            className="btn btn-sm btn-primary hidden-mobile"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
          >
            <Play size={12} />
            SHOWREEL
          </button>

          {/* Zero-G Toggle */}
          <button
            onClick={() => {
              sound.playWhoosh();
              onToggleZeroG();
            }}
            className={`btn btn-icon btn-sm ${isZeroG ? 'btn-primary' : 'btn-outline'}`}
            title={isZeroG ? 'Disable Zero-G Drift' : 'Enable Zero-G Drift'}
          >
            <Radio size={14} />
          </button>

          {/* Sound FX Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`btn btn-icon btn-sm ${!isMuted ? 'btn-primary' : 'btn-outline'}`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {!isMuted ? (
              <div className="flex items-center gap-1">
                <span className="visualizer-bar" style={{ animationDelay: '0.1s' }} />
                <span className="visualizer-bar" style={{ animationDelay: '0.3s' }} />
                <span className="visualizer-bar" style={{ animationDelay: '0.2s' }} />
              </div>
            ) : (
              <VolumeX size={14} />
            )}
          </button>

          {/* Discord CTA */}
          <button
            onClick={() => {
              sound.playClick();
              window.open(PORTFOLIO_DATA.profile.discordUrl, '_blank');
            }}
            className="btn btn-sm btn-violet"
            style={{ padding: '0.4rem 0.95rem', fontSize: '0.78rem' }}
          >
            DISCORD
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-icon btn-sm btn-outline hidden-desktop"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            marginTop: '0.5rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            textAlign: 'center'
          }}
        >
          <button
            onClick={() => {
              onOpenShowreel();
              setMobileMenuOpen(false);
            }}
            className="btn btn-primary btn-sm"
          >
            <Play size={14} />
            WATCH SHOWREEL
          </button>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            ABOUT ME
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            MY PROJECTS
          </a>
          <a
            href="#sandbox"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            ZERO-G SANDBOX
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            SKILLS
          </a>
          <a
            href="#terminal"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            TERMINAL CLI
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            CONTACT
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
