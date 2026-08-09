import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const InteractiveTerminal = ({ onOpenShowreel, onToggleZeroG, onToggleScanlines }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'PORTFOLIO OS v2.6 (x86_64-yug-solanki)' },
    { type: 'system', text: 'Type "whoami", "achievements", "projects" or "help" for subroutines.' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    sound.playClick(950, 0.04);
    setCmdHistory(prev => [cmdStr, ...prev]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: PORTFOLIO_DATA.terminalHelp
            .map(h => `  • ${h.cmd.padEnd(14, ' ')} : ${h.desc}`)
            .join('\n')
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `NAME    : ${PORTFOLIO_DATA.profile.fullName} (Alias: ${PORTFOLIO_DATA.profile.alias})\nROLE    : ${PORTFOLIO_DATA.profile.tagline}\nGITHUB  : @${PORTFOLIO_DATA.profile.githubUser}\nBIO     : ${PORTFOLIO_DATA.profile.bio}\nSTATUS  : ${PORTFOLIO_DATA.profile.status}`
        });
        break;

      case 'achievements':
        newHistory.push({
          type: 'output',
          text: PORTFOLIO_DATA.profile.achievements
            .map(a => `  [★] ${a.metric.padEnd(10, ' ')} | ${a.title}\n      ${a.desc}`)
            .join('\n\n')
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: PORTFOLIO_DATA.projects
            .map(p => `  [+] ${p.title} (${p.category})\n      ${p.tagline}`)
            .join('\n')
        });
        break;

      case 'showreel':
        newHistory.push({ type: 'success', text: '>> Launching Yug Solanki Keynote Showreel Deck...' });
        sound.playPowerUp();
        setTimeout(() => onOpenShowreel(), 400);
        break;

      case 'zerog':
        newHistory.push({ type: 'success', text: '>> Toggling Gravitational Field to Zero-G...' });
        sound.playWhoosh();
        onToggleZeroG();
        break;

      case 'matrix':
        newHistory.push({ type: 'success', text: '>> Toggling CRT Scanlines Mode...' });
        sound.playLaser();
        onToggleScanlines();
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: PORTFOLIO_DATA.skills
            .map(s => `  [${s.category}]\n  ${s.items.map(i => `  - ${i.name} [${i.level}%]`).join('\n')}`)
            .join('\n\n')
        });
        break;

      case 'roll':
        sound.playKeyBeep();
        const rand = Math.random();
        let item = rand < 0.05 ? '⭐ MYTHIC: Cosmic Singularity (1 in 50k)' : rand < 0.25 ? '✨ LEGENDARY: Quantum Core' : '⚡ COMMON: Standard Shard';
        newHistory.push({ type: 'output', text: `>> ZEDOX RNG OUTPUT: ${item}` });
        break;

      case 'ping':
        sound.playKeyBeep();
        newHistory.push({
          type: 'output',
          text: `Pinging Yug's edge node zedox-ams-01.infra [194.38.20.1]...\n64 bytes from zedox-ams: icmp_seq=1 ttl=58 time=11.2 ms\n64 bytes from zedox-ams: icmp_seq=2 ttl=58 time=10.8 ms\n--- 0.0% packet loss, RTT avg = 11.0ms ---`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `DISCORD : ${PORTFOLIO_DATA.profile.discordTag}\nGITHUB  : ${PORTFOLIO_DATA.profile.githubUrl}\nEMAIL   : ${PORTFOLIO_DATA.profile.email}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        sound.playError();
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmdStr}". Type "help" for a list of available subroutines.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else {
      sound.playKeyBeep();
    }
  };

  return (
    <section className="container section-spacing" id="terminal">
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '2.5rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-cyan)' }} />
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Command Shell & Telemetry
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            PORTFOLIO <span className="text-gradient">TERMINAL</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', marginTop: '0.5rem' }}>
            Direct shell interface to explore Yug's achievements, inspect system specs, launch showreel keynote decks, or test server pings.
          </p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap gap-2">
          {['whoami', 'achievements', 'showreel', 'projects', 'zerog', 'ping'].map(cmd => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="btn btn-sm btn-outline"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', borderColor: 'rgba(0, 240, 255, 0.25)' }}
            >
              $ {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window Box */}
      <div
        className="glass-panel"
        style={{
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 240, 255, 0.1)'
        }}
      >
        {/* Terminal Title Bar */}
        <div
          className="flex justify-between items-center"
          style={{
            padding: '0.75rem 1.25rem',
            background: 'rgba(0, 0, 0, 0.6)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              yug@portfolio-core:~
            </span>
          </div>

          <span className="glass-pill" style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)' }}>
            USER: YUG_SOLANKI [AUTHENTICATED]
          </span>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '1.5rem',
            minHeight: '260px',
            maxHeight: '380px',
            overflowY: 'auto',
            background: '#040711',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6
          }}
        >
          {history.map((h, idx) => (
            <div key={idx} style={{ marginBottom: '0.6rem' }}>
              {h.type === 'user' && (
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{h.text}</span>
              )}
              {h.type === 'system' && (
                <span style={{ color: 'var(--text-dim)' }}>{h.text}</span>
              )}
              {h.type === 'output' && (
                <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{h.text}</pre>
              )}
              {h.type === 'success' && (
                <span style={{ color: '#86efac', fontWeight: 'bold' }}>{h.text}</span>
              )}
              {h.type === 'error' && (
                <span style={{ color: '#f87171' }}>{h.text}</span>
              )}
            </div>
          ))}

          {/* Prompt Line */}
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>yug@node:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'whoami', 'achievements', 'help'..."
              autoFocus={false}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                flexGrow: 1
              }}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
