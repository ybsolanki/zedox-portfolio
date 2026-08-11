import React, { useState, useEffect } from 'react';
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

  const SLIDE_DURATION = 8000;
  const currentSlide = showreel.slides[currentSlideIndex];

  // Auto-play progress timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = 50;
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
    sound.playHover(850, 0.04);
  };

  const handlePrevSlide = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev === 0 ? showreel.slides.length - 1 : prev - 1));
    sound.playHover(650, 0.04);
  };

  const jumpToSlide = (index) => {
    setProgress(0);
    setCurrentSlideIndex(index);
    sound.playClick(900, 0.04);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    sound.playClick(isPlaying ? 500 : 1000, 0.05);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-backdrop"
        style={{ zIndex: 1100 }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '1050px',
            height: '100%',
            maxHeight: '92vh',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 240, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'rgba(6, 10, 20, 0.96)'
          }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center"
            style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="telemetry-dot" style={{ backgroundColor: currentSlide.accent, boxShadow: `0 0 10px ${currentSlide.accent}` }} />
              <div>
                <h3 style={{ fontSize: '0.95rem', color: '#f8fafc', margin: 0, fontWeight: '700' }}>
                  {showreel.title}
                </h3>
              </div>
            </div>

            {/* Chapter Pills (Desktop) */}
            <div className="flex items-center gap-1.5 hidden-mobile">
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
                    fontSize: '0.68rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {slide.chapter}
                </button>
              ))}
            </div>

            {/* Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="btn btn-icon btn-sm btn-outline"
                style={{ width: '32px', height: '32px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Slide Content */}
          <div
            style={{
              padding: '1.5rem',
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
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 grid-md-2 gap-6 items-center"
              >
                {/* Left Side: Presentation Content */}
                <div>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                    <span
                      className="glass-pill"
                      style={{
                        color: currentSlide.accent,
                        borderColor: `${currentSlide.accent}40`,
                        background: `${currentSlide.accent}15`,
                        fontSize: '0.68rem'
                      }}
                    >
                      {currentSlide.badge}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      CHAPTER {currentSlide.chapter} / 05
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', lineHeight: 1.2, marginBottom: '0.5rem', color: '#ffffff' }}>
                    {currentSlide.title}
                  </h2>

                  <h4 style={{ fontSize: '0.95rem', color: currentSlide.accent, marginBottom: '1rem', fontFamily: 'var(--font-sub)', fontWeight: 500 }}>
                    {currentSlide.subtitle}
                  </h4>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {currentSlide.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="flex flex-col gap-1.5" style={{ marginBottom: '1.25rem' }}>
                    {currentSlide.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} style={{ color: currentSlide.accent, flexShrink: 0 }} />
                        <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Chips */}
                  <div className="flex items-center gap-3">
                    {currentSlide.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="sim-screen flex-1"
                        style={{ padding: '0.6rem 0.8rem', borderColor: `${currentSlide.accent}30` }}
                      >
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 'bold', color: currentSlide.accent }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Code Snippet */}
                <div>
                  <div className="sim-screen" style={{ borderColor: `${currentSlide.accent}40` }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-1.5">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                          project_code.js
                        </span>
                      </div>
                    </div>

                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', lineHeight: 1.55 }}>
                      <code>{currentSlide.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div
            style={{
              padding: '0.85rem 1.25rem',
              background: 'rgba(0, 0, 0, 0.7)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Progress Scrubber */}
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
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                marginBottom: '0.75rem',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${((currentSlideIndex + progress / 100) / showreel.slides.length) * 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, var(--accent-cyan), ${currentSlide.accent})`,
                  borderRadius: '2px',
                  transition: 'width 0.05s linear'
                }}
              />
            </div>

            {/* Playback Controls */}
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="btn btn-icon btn-sm btn-outline"
                  style={{ width: '32px', height: '32px' }}
                  title="Previous"
                >
                  <SkipBack size={13} />
                </button>
                <button
                  onClick={togglePlay}
                  className="btn btn-sm btn-primary"
                  style={{ minWidth: '85px', padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button
                  onClick={handleNextSlide}
                  className="btn btn-icon btn-sm btn-outline"
                  style={{ width: '32px', height: '32px' }}
                  title="Next"
                >
                  <SkipForward size={13} />
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {currentSlideIndex + 1} / {showreel.slides.length}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShowreelPresentation;
