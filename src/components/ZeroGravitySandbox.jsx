import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Move, Radio, Zap } from 'lucide-react';
import { sound } from '../utils/audioEngine';

const INITIAL_TOKENS = [
  { id: 1, text: "📱 MeshTalk Native", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.4)", x: 120, y: 100, vx: 1.2, vy: -0.8, r: 60, angle: 0, va: 0.02 },
  { id: 2, text: "🎲 Roblox RNG Core", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", x: 260, y: 180, vx: -1.4, vy: 1.1, r: 65, angle: 0.2, va: -0.015 },
  { id: 3, text: "🖥️ Linux Game Server", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)", border: "rgba(139, 92, 246, 0.4)", x: 420, y: 90, vx: 0.9, vy: 1.3, r: 65, angle: -0.1, va: 0.01 },
  { id: 4, text: "🌐 Wi-Fi Direct P2P", color: "#00f0ff", bg: "rgba(0, 240, 255, 0.15)", border: "rgba(0, 240, 255, 0.4)", x: 180, y: 260, vx: 1.3, vy: -1.1, r: 65, angle: 0.3, va: 0.025 },
  { id: 5, text: "⚡ React & Three.js", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", border: "rgba(236, 72, 153, 0.4)", x: 360, y: 250, vx: -1.1, vy: -0.9, r: 65, angle: -0.2, va: -0.02 },
  { id: 6, text: "💎 Luau Mechanics", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", x: 500, y: 160, vx: -0.8, vy: 1.2, r: 60, angle: 0.1, va: 0.018 }
];

const ZeroGravitySandbox = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [gravityMode, setGravityMode] = useState('zero');
  const [isInteracting, setIsInteracting] = useState(false);

  const stateRef = useRef({
    tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
    draggedToken: null,
    dragOffset: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    gravity: 0,
    width: 800,
    height: 380
  });

  useEffect(() => {
    stateRef.current.gravity = gravityMode === 'earth' ? 0.32 : 0;
  }, [gravityMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const h = window.innerWidth < 640 ? 320 : 380;
      canvas.width = rect.width;
      canvas.height = h;
      stateRef.current.width = rect.width;
      stateRef.current.height = h;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let animationId;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const { width, height, gravity } = stateRef.current;

      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 35;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics loop
      const currentTokens = stateRef.current.tokens;

      for (let i = 0; i < currentTokens.length; i++) {
        const t = currentTokens[i];

        if (stateRef.current.draggedToken === t) {
          t.vx = stateRef.current.mouseVelocity.x * 0.4;
          t.vy = stateRef.current.mouseVelocity.y * 0.4;
        } else {
          t.vy += gravity;
          t.x += t.vx;
          t.y += t.vy;
          t.angle += t.va;

          const padding = window.innerWidth < 640 ? 45 : 55;
          if (t.x - padding < 0) {
            t.x = padding;
            t.vx = -t.vx * 0.85;
            t.va = (Math.random() - 0.5) * 0.03;
          } else if (t.x + padding > width) {
            t.x = width - padding;
            t.vx = -t.vx * 0.85;
            t.va = (Math.random() - 0.5) * 0.03;
          }

          if (t.y - 22 < 0) {
            t.y = 22;
            t.vy = -t.vy * 0.85;
          } else if (t.y + 22 > height) {
            t.y = height - 22;
            t.vy = -t.vy * 0.75;
            if (gravity > 0 && Math.abs(t.vy) < 0.5) {
              t.vy = 0;
              t.vx *= 0.94;
            }
          }
        }

        // Draw Token
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);

        ctx.shadowColor = t.color;
        ctx.shadowBlur = stateRef.current.draggedToken === t ? 18 : 8;

        const isMobile = width < 640;
        const w = isMobile ? 125 : 145;
        const h = isMobile ? 36 : 40;
        const r = 10;

        ctx.fillStyle = t.bg;
        ctx.strokeStyle = t.border;
        ctx.lineWidth = stateRef.current.draggedToken === t ? 2 : 1.5;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = `600 ${isMobile ? '11px' : '12px'} "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t.text, 0, 0);

        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Pointer / Touch Start
  const startInteraction = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;

    const currentTokens = stateRef.current.tokens;
    for (let i = currentTokens.length - 1; i >= 0; i--) {
      const t = currentTokens[i];
      const dx = x - t.x;
      const dy = y - t.y;
      if (Math.abs(dx) < 70 && Math.abs(dy) < 30) {
        stateRef.current.draggedToken = t;
        stateRef.current.dragOffset = { x: dx, y: dy };
        stateRef.current.lastMouse = { x, y };
        setIsInteracting(true);
        sound.playClick(750, 0.04);
        break;
      }
    }
  };

  // Pointer / Touch Move
  const moveInteraction = (clientX, clientY) => {
    if (!stateRef.current.draggedToken) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;

    const last = stateRef.current.lastMouse;
    stateRef.current.mouseVelocity = { x: x - last.x, y: y - last.y };
    stateRef.current.lastMouse = { x, y };

    stateRef.current.draggedToken.x = x - stateRef.current.dragOffset.x;
    stateRef.current.draggedToken.y = y - stateRef.current.dragOffset.y;
  };

  // Pointer / Touch End
  const endInteraction = () => {
    if (stateRef.current.draggedToken) {
      sound.playWhoosh();
      stateRef.current.draggedToken.va = (Math.random() - 0.5) * 0.05;
      stateRef.current.draggedToken = null;
      setIsInteracting(false);
    }
  };

  const resetTokens = () => {
    sound.playLaser();
    const w = stateRef.current.width;
    stateRef.current.tokens.forEach((t, idx) => {
      t.x = 80 + (idx % 3) * (w / 3.5);
      t.y = 70 + Math.floor(idx / 3) * 100;
      t.vx = (Math.random() - 0.5) * 2.5;
      t.vy = (Math.random() - 0.5) * 2.5;
      t.angle = 0;
    });
  };

  const toggleGravity = () => {
    const next = gravityMode === 'zero' ? 'earth' : 'zero';
    setGravityMode(next);
    sound.playClick(next === 'zero' ? 1200 : 400, 0.08);
  };

  return (
    <section className="container section-spacing" id="sandbox">
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
            <span className="telemetry-dot"></span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Interactive Physics Sandbox
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)' }}>
            ZERO-G <span className="text-gradient">PHYSICS SANDBOX</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '520px', marginTop: '0.35rem' }}>
            Drag and toss the project tokens on touch or mouse to test zero-gravity physics.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleGravity}
            className={`btn btn-sm ${gravityMode === 'zero' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <Radio size={13} />
            {gravityMode === 'zero' ? 'ZERO-G MODE' : 'EARTH GRAVITY'}
          </button>
          <button
            onClick={resetTokens}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <RefreshCw size={13} />
            RESET
          </button>
        </div>
      </div>

      {/* Physics Box */}
      <div
        ref={containerRef}
        className="glass-panel"
        style={{
          height: '340px',
          cursor: isInteracting ? 'grabbing' : 'grab',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), inset 0 0 35px rgba(0, 240, 255, 0.04)',
          touchAction: 'none'
        }}
      >
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, pointerEvents: 'none' }}>
          <span className="glass-pill" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem', border: '1px solid var(--accent-cyan-glow)' }}>
            <Move size={10} style={{ display: 'inline', marginRight: '3px' }} />
            DRAG & FLING TOKENS
          </span>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={(e) => startInteraction(e.clientX, e.clientY)}
          onMouseMove={(e) => moveInteraction(e.clientX, e.clientY)}
          onMouseUp={endInteraction}
          onMouseLeave={endInteraction}
          onTouchStart={(e) => {
            if (e.touches.length > 0) startInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) moveInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={endInteraction}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </section>
  );
};

export default ZeroGravitySandbox;
