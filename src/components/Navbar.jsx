import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      setScrolled(window.scrollY > 20);
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
        top: '0.75rem',
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 0.75rem',
        pointerEvents: 'none'
      }}
    >
      <div
        className="container glass-panel"
        style={{
          pointerEvents: 'auto',
          padding: '0.55rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: scrolled ? 'rgba(7, 11, 22, 0.94)' : 'rgba(11, 16, 30, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 15px 35px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.1)' : 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Clean Logo: MY PORTFOLIO */}
        <a
          href="#"
          className="flex items-center gap-2"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={() => sound.playHover()}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              color: '#030814',
              fontSize: '0.9rem',
              boxShadow: '0 0 10px var(--accent-cyan-glow)'
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            MY <span className="text-gradient">PORTFOLIO</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="flex items-center gap-5 hidden-mobile">
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
        <div className="flex items-center gap-1.5">
          {/* Showreel Trigger (Desktop) */}
          <button
            onClick={() => {
              sound.playPowerUp();
              onOpenShowreel();
            }}
            className="btn btn-sm btn-primary hidden-mobile"
            style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem' }}
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
            style={{ width: '32px', height: '32px' }}
            title={isZeroG ? 'Disable Zero-G Drift' : 'Enable Zero-G Drift'}
          >
            <Radio size={13} />
          </button>

          {/* Sound FX Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`btn btn-icon btn-sm ${!isMuted ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '32px', height: '32px' }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {!isMuted ? (
              <div className="flex items-center gap-0.5">
                <span className="visualizer-bar" style={{ animationDelay: '0.1s' }} />
                <span className="visualizer-bar" style={{ animationDelay: '0.3s' }} />
                <span className="visualizer-bar" style={{ animationDelay: '0.2s' }} />
              </div>
            ) : (
              <VolumeX size={13} />
            )}
          </button>

          {/* Discord CTA (Desktop) */}
          <button
            onClick={() => {
              sound.playClick();
              window.open(PORTFOLIO_DATA.profile.discordUrl, '_blank');
            }}
            className="btn btn-sm btn-violet hidden-mobile"
            style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem' }}
          >
            DISCORD
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick(800, 0.03);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="btn btn-icon btn-sm btn-outline hidden-desktop"
            style={{ width: '32px', height: '32px' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass-panel"
            style={{
              pointerEvents: 'auto',
              marginTop: '0.5rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              textAlign: 'center',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              background: 'rgba(9, 13, 26, 0.96)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.85)'
            }}
          >
            <button
              onClick={() => {
                onOpenShowreel();
                setMobileMenuOpen(false);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              <Play size={14} />
              WATCH SHOWREEL DECK
            </button>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              ABOUT ME
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              MY PROJECTS
            </a>
            <a
              href="#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              ZERO-G SANDBOX
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              SKILLS MATRIX
            </a>
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              PORTFOLIO TERMINAL
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-pill"
              style={{ textDecoration: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.65rem' }}
            >
              CONTACT & DISCORD
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
