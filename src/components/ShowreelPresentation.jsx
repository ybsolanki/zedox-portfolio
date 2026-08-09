import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Maximize2, Minimize2, Terminal, Volume2, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const ShowreelPresentation = ({ isOpen, onClose }) => {
  const { showreel } = PORTFOLIO_DATA;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const SLIDE_DURATION = 8000; // 8 seconds per slide in autoplay
  const currentSlide = showreel.slides[currentSlideIndex];

  // Auto-play progress timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = 50; // ms
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentSlideIndex]);

  const handleNextSlide = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev + 1) % showreel.slides.length);
    sound.playHover(850, 0.05);
  };

  const handlePrevSlide = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev === 0 ? showreel.slides.length - 1 : prev - 1));
    sound.playHover(650, 0.05);
  };

  const jumpToSlide = (index) => {
    setProgress(0);
    setCurrentSlideIndex(index);
    sound.playClick(900, 0.05);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    sound.playClick(isPlaying ? 500 : 1000, 0.06);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-backdrop"
        style={{ zIndex: 1100, padding: fullscreen ? '0' : '1.5rem' }}
      >
        <motion.div
          initial={{ scale: 0.94, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="glass-panel"
          style={{
            width: fullscreen ? '100vw' : '100%',
            maxWidth: fullscreen ? '100vw' : '1100px',
            height: fullscreen ? '100vh' : 'auto',
            maxHeight: fullscreen ? '100vh' : '90vh',
            borderRadius: fullscreen ? '0' : 'var(--radius-lg)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 240, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'rgba(6, 10, 20, 0.92)'
          }}
        >
          {/* Deck Header / Top Bar */}
          <div
            className="flex justify-between items-center"
            style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="telemetry-dot" style={{ backgroundColor: currentSlide.accent, boxShadow: `0 0 10px ${currentSlide.accent}` }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  ANTIGRAVITY KEYNOTE // DECK v2.6
                </span>
                <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>
                  {showreel.title}
                </h3>
              </div>
            </div>

            {/* Chapter Indicator Pills */}
            <div className="flex items-center gap-2 hidden-mobile">
              {showreel.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => jumpToSlide(idx)}
                  className="btn-sm"
                  style={{
                    background: currentSlideIndex === idx ? slide.accent : 'rgba(255, 255, 255, 0.05)',
                    color: currentSlideIndex === idx ? '#030814' : 'var(--text-dim)',
                    border: `1px solid ${currentSlideIndex === idx ? slide.accent : 'rgba(255,255,255,0.08)'}`,
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {slide.chapter}
                </button>
              ))}
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`btn btn-icon btn-sm ${showNotes ? 'btn-primary' : 'btn-outline'}`}
                title="Toggle Narration Notes"
              >
                <Terminal size={14} />
              </button>
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="btn btn-icon btn-sm btn-outline"
                title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={onClose}
                className="btn btn-icon btn-sm btn-outline"
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                title="Close Presentation"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Slide Main Content Area */}
          <div
            style={{
              padding: '2rem',
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 grid-md-2 gap-8 items-center"
              >
                {/* Left Side: Presentation Content & Highlights */}
                <div>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                    <span
                      className="glass-pill"
                      style={{
                        color: currentSlide.accent,
                        borderColor: `${currentSlide.accent}40`,
                        background: `${currentSlide.accent}15`
                      }}
                    >
                      {currentSlide.badge}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      CHAPTER {currentSlide.chapter} / 05
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.2, marginBottom: '0.75rem', color: '#ffffff' }}>
                    {currentSlide.title}
                  </h2>

                  <h4 style={{ fontSize: '1.05rem', color: currentSlide.accent, marginBottom: '1.25rem', fontFamily: 'var(--font-sub)', fontWeight: 500 }}>
                    {currentSlide.subtitle}
                  </h4>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {currentSlide.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="flex flex-col gap-2" style={{ marginBottom: '1.5rem' }}>
                    {currentSlide.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={16} style={{ color: currentSlide.accent, flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Chips */}
                  <div className="flex items-center gap-4">
                    {currentSlide.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="sim-screen flex-1"
                        style={{ padding: '0.75rem 1rem', borderColor: `${currentSlide.accent}30` }}
                      >
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: currentSlide.accent }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Live Code / Topology / Terminal Feed */}
                <div>
                  <div className="sim-screen" style={{ borderColor: `${currentSlide.accent}40`, boxShadow: `0 0 30px ${currentSlide.accent}15` }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2">
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                          live_system_telemetry.lua
                        </span>
                      </div>
                      <span className="glass-pill" style={{ fontSize: '0.65rem', color: currentSlide.accent }}>
                        EXECUTION: REALTIME
                      </span>
                    </div>

                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', lineHeight: 1.6 }}>
                      <code>{currentSlide.codeSnippet}</code>
                    </pre>
                  </div>

                  {showNotes && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        color: '#fde68a',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      💡 <strong>SPEAKER TRANSCRIPT NOTE:</strong> Emphasize sub-millisecond execution benchmarks and zero-cloud resilience during client and investor walk-throughs.
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Video-Style Scrubber & Presentation Footer */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.6)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Scrubber Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                const targetIdx = Math.floor(ratio * showreel.slides.length);
                jumpToSlide(targetIdx);
              }}
              style={{
                width: '100%',
                height: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                marginBottom: '1rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${((currentSlideIndex + progress / 100) / showreel.slides.length) * 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, var(--accent-cyan), ${currentSlide.accent})`,
                  borderRadius: '3px',
                  transition: 'width 0.05s linear'
                }}
              />
            </div>

            {/* Playback Controls Bar */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevSlide}
                  className="btn btn-icon btn-sm btn-outline"
                  title="Previous Chapter"
                >
                  <SkipBack size={14} />
                </button>
                <button
                  onClick={togglePlay}
                  className="btn btn-sm btn-primary"
                  style={{ minWidth: '95px' }}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button
                  onClick={handleNextSlide}
                  className="btn btn-icon btn-sm btn-outline"
                  title="Next Chapter"
                >
                  <SkipForward size={14} />
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                SLIDE {currentSlideIndex + 1} OF {showreel.slides.length} • {showreel.duration} TOTAL
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(PORTFOLIO_DATA.profile.discordUrl, '_blank')}
                  className="btn btn-sm btn-violet"
                >
                  INITIATE PROJECT COLLAB
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShowreelPresentation;
