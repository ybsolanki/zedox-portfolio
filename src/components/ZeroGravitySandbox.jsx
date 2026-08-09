import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Move, Radio, Zap } from 'lucide-react';
import { sound } from '../utils/audioEngine';

const INITIAL_TOKENS = [
  { id: 1, text: "⚡ MeshTalk Native", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.4)", x: 120, y: 100, vx: 1.2, vy: -0.8, r: 60, angle: 0, va: 0.02 },
  { id: 2, text: "🎲 50k Rolls/s RNG", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", x: 300, y: 180, vx: -1.5, vy: 1.1, r: 65, angle: 0.2, va: -0.015 },
  { id: 3, text: "🛡️ eBPF DDoS Filter", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)", border: "rgba(139, 92, 246, 0.4)", x: 520, y: 90, vx: 0.9, vy: 1.4, r: 65, angle: -0.1, va: 0.01 },
  { id: 4, text: "🌐 Wi-Fi Direct P2P", color: "#00f0ff", bg: "rgba(0, 240, 255, 0.15)", border: "rgba(0, 240, 255, 0.4)", x: 200, y: 280, vx: 1.4, vy: -1.2, r: 65, angle: 0.3, va: 0.025 },
  { id: 5, text: "🚀 Zero-Cloud Grid", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", border: "rgba(236, 72, 153, 0.4)", x: 440, y: 260, vx: -1.1, vy: -1.0, r: 65, angle: -0.2, va: -0.02 },
  { id: 6, text: "💎 Luau Mechanics", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", x: 680, y: 160, vx: -0.8, vy: 1.3, r: 60, angle: 0.1, va: 0.018 },
  { id: 7, text: "🔒 ChaCha20 Cipher", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.4)", x: 600, y: 300, vx: 1.3, vy: -0.9, r: 65, angle: -0.15, va: -0.012 }
];

const ZeroGravitySandbox = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [gravityMode, setGravityMode] = useState('zero'); // 'zero' or 'earth'
  const [isInteracting, setIsInteracting] = useState(false);

  const stateRef = useRef({
    tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
    draggedToken: null,
    dragOffset: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    gravity: 0,
    width: 800,
    height: 420
  });

  useEffect(() => {
    stateRef.current.gravity = gravityMode === 'earth' ? 0.35 : 0;
  }, [gravityMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 420;
      stateRef.current.width = rect.width;
      stateRef.current.height = 420;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let animationId;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const { width, height, gravity } = stateRef.current;

      ctx.clearRect(0, 0, width, height);

      // Subtle cyber grid background inside sandbox
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
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
          // Being dragged: direct position match
          t.vx = stateRef.current.mouseVelocity.x * 0.4;
          t.vy = stateRef.current.mouseVelocity.y * 0.4;
        } else {
          // Apply velocity & gravity
          t.vy += gravity;
          t.x += t.vx;
          t.y += t.vy;
          t.angle += t.va;

          // Wall Collisions
          const padding = 55;
          if (t.x - padding < 0) {
            t.x = padding;
            t.vx = -t.vx * 0.85;
            t.va = (Math.random() - 0.5) * 0.03;
          } else if (t.x + padding > width) {
            t.x = width - padding;
            t.vx = -t.vx * 0.85;
            t.va = (Math.random() - 0.5) * 0.03;
          }

          if (t.y - 25 < 0) {
            t.y = 25;
            t.vy = -t.vy * 0.85;
          } else if (t.y + 25 > height) {
            t.y = height - 25;
            t.vy = -t.vy * 0.75;
            if (gravity > 0 && Math.abs(t.vy) < 0.5) {
              t.vy = 0;
              t.vx *= 0.94; // Friction on ground
            }
          }
        }

        // Draw Token Chip
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);

        // Glass Glow Shadow
        ctx.shadowColor = t.color;
        ctx.shadowBlur = stateRef.current.draggedToken === t ? 22 : 10;

        // Rounded badge shape
        const w = 150;
        const h = 42;
        const r = 12;

        ctx.fillStyle = t.bg;
        ctx.strokeStyle = t.border;
        ctx.lineWidth = stateRef.current.draggedToken === t ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fill();
        ctx.stroke();

        // Inner highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 13px "Space Grotesk", sans-serif';
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

  // Mouse / Touch handlers for dragging and tossing
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;

    const currentTokens = stateRef.current.tokens;
    for (let i = currentTokens.length - 1; i >= 0; i--) {
      const t = currentTokens[i];
      const dx = x - t.x;
      const dy = y - t.y;
      if (Math.abs(dx) < 80 && Math.abs(dy) < 30) {
        stateRef.current.draggedToken = t;
        stateRef.current.dragOffset = { x: dx, y: dy };
        stateRef.current.lastMouse = { x, y };
        setIsInteracting(true);
        sound.playClick(750, 0.05);
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!stateRef.current.draggedToken) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;

    const last = stateRef.current.lastMouse;
    stateRef.current.mouseVelocity = { x: x - last.x, y: y - last.y };
    stateRef.current.lastMouse = { x, y };

    stateRef.current.draggedToken.x = x - stateRef.current.dragOffset.x;
    stateRef.current.draggedToken.y = y - stateRef.current.dragOffset.y;
  };

  const handleMouseUp = () => {
    if (stateRef.current.draggedToken) {
      sound.playWhoosh();
      stateRef.current.draggedToken.va = (Math.random() - 0.5) * 0.06;
      stateRef.current.draggedToken = null;
      setIsInteracting(false);
    }
  };

  const resetTokens = () => {
    sound.playLaser();
    const w = stateRef.current.width;
    stateRef.current.tokens.forEach((t, idx) => {
      t.x = 100 + (idx % 4) * (w / 4);
      t.y = 100 + Math.floor(idx / 4) * 120;
      t.vx = (Math.random() - 0.5) * 3;
      t.vy = (Math.random() - 0.5) * 3;
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
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '2.5rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <span className="telemetry-dot"></span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Interactive Physics Engine
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            ANTIGRAVITY <span className="text-gradient">SANDBOX</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', marginTop: '0.5rem' }}>
            Zero-G experimental zone. Click, grab, and toss the technology modules across the physics field to explore core capabilities.
          </p>
        </div>

        {/* Sandbox Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleGravity}
            className={`btn btn-sm ${gravityMode === 'zero' ? 'btn-primary' : 'btn-outline'}`}
            title="Toggle Gravitational Field"
          >
            <Radio size={14} />
            {gravityMode === 'zero' ? 'ZERO-G MODE (ACTIVE)' : 'EARTH GRAVITY'}
          </button>
          <button
            onClick={resetTokens}
            className="btn btn-outline btn-sm"
            title="Reset Shard Positions"
          >
            <RefreshCw size={14} />
            RESET
          </button>
        </div>
      </div>

      {/* Physics Canvas Glass Box */}
      <div
        ref={containerRef}
        className="glass-panel"
        style={{
          height: '420px',
          cursor: isInteracting ? 'grabbing' : 'grab',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 240, 255, 0.05)'
        }}
      >
        <div style={{ position: 'absolute', top: '1rem', right: '1.25rem', zIndex: 10, pointerEvents: 'none' }} className="flex items-center gap-2">
          <span className="glass-pill" style={{ color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan-glow)' }}>
            <Move size={12} style={{ display: 'inline', marginRight: '4px' }} />
            DRAG & TOSS SHARDS
          </span>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </section>
  );
};

export default ZeroGravitySandbox;
