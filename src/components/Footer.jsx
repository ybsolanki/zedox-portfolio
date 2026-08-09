import React, { useState, useEffect } from 'react';
import { Github, MessageCircle, ArrowUp, Terminal, Shield, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const Footer = ({ onOpenShowreel }) => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    sound.playHover(900, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(4, 7, 15, 0.95)',
        padding: '4rem 1.5rem 2.5rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container flex flex-col gap-8">
        {/* Top Footer Section */}
        <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-6">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#030814',
                  fontSize: '0.75rem'
                }}
              >
                YS
              </div>
              <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                YUG SOLANKI <span className="text-gradient">[ZEDOX]</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', maxWidth: '420px' }}>
              Architecting offline mesh networks, high-precision deterministic RNG engines, and resilient cloud server clusters.
            </p>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-icon btn-sm btn-outline"
              title="GitHub (@ybsolanki)"
              onClick={() => sound.playClick()}
            >
              <Github size={16} />
            </a>
            <button
              onClick={() => {
                sound.playClick();
                window.open(PORTFOLIO_DATA.profile.discordUrl, '_blank');
              }}
              className="btn btn-icon btn-sm btn-outline"
              title="Discord"
            >
              <MessageCircle size={16} />
            </button>
            <button
              onClick={scrollToTop}
              className="btn btn-icon btn-sm btn-outline"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Diagnostics Bar */}
        <div
          className="flex flex-col flex-md-row justify-between items-center gap-4"
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div className="flex items-center gap-3">
            <span className="telemetry-dot" style={{ width: '6px', height: '6px' }} />
            <span>NODE TIME (UTC): {time}</span>
          </div>

          <div>
            <span>SYSTEM PROTOCOL: ANTIGRAVITY_v2.6 // CHACHA20</span>
          </div>

          <div>
            <span>© 2026 YUG SOLANKI. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
