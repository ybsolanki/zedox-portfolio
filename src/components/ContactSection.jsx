import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, Copy, Check, MessageCircle, Github, Mail, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const ContactSection = () => {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(profile.discordTag);
    sound.playClick(1000, 0.05);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSending(true);
    sound.playLaser();

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      sound.playPowerUp();
    }, 900);
  };

  return (
    <section className="container section-spacing" id="contact">
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="inline-flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
          <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Direct Secure Transmission
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          COMMENCE <span className="text-gradient">COMMUNICATION</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0.5rem auto 0' }}>
          Available for contract engineering, high-throughput backend systems, Android mesh apps, and Roblox core mechanics.
        </p>
      </div>

      <div className="grid grid-cols-1 grid-md-2 gap-8" style={{ maxWidth: '1050px', margin: '0 auto' }}>
        {/* Left Side: Direct Channels (Discord & GitHub) */}
        <div className="flex flex-col gap-6">
          {/* Discord Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderColor: 'rgba(99, 102, 241, 0.4)',
              background: 'rgba(15, 18, 38, 0.8)'
            }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#818cf8'
                }}
              >
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Discord Priority Channel</h3>
                <span style={{ fontSize: '0.75rem', color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
                  FASTEST RESPONSE // ACTIVE
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Direct message for project briefs, game mechanics consulting, and mesh architecture reviews.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  window.open(profile.discordUrl, '_blank');
                }}
                className="btn btn-violet btn-sm flex-1"
              >
                OPEN DISCORD PROFILE
              </button>

              <button
                onClick={handleCopyDiscord}
                className="btn btn-outline btn-sm"
                title="Copy Handle"
              >
                {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                {copied ? 'COPIED!' : profile.discordTag}
              </button>
            </div>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderColor: 'rgba(255, 255, 255, 0.12)'
            }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Github size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>GitHub Repositories</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  OPEN SOURCE LABS
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Explore source code, issue trackers, and experimental protocols.
            </p>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm"
              style={{ width: '100%' }}
              onClick={() => sound.playClick()}
            >
              VISIT GITHUB PROFILE (@ybsolanki)
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive Transmission Console */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            borderColor: 'rgba(0, 240, 255, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(0, 240, 255, 0.1)'
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span className="telemetry-dot" />
            <h3 style={{ fontSize: '1.15rem', color: '#f8fafc' }}>
              Transmission Transmitter
            </h3>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '3rem 1rem' }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: '#10b981'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                TRANSMISSION DISPATCHED
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your message has been encrypted and routed to Zedox node. You will receive a response shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn btn-outline btn-sm"
              >
                SEND ANOTHER TRANSMISSION
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  TRANSMITTER_ID / YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    outline: 'none'
                  }}
                  onFocus={() => sound.playHover(700, 0.02)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  RETURN_FREQUENCY / EMAIL OR DISCORD
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@quantum.dev or user#1234"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    outline: 'none'
                  }}
                  onFocus={() => sound.playHover(750, 0.02)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  MISSION_OBJECTIVE / MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, systems architecture requirements, or inquiry..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={() => sound.playHover(800, 0.02)}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Send size={15} />
                {isSending ? 'DISPATCHING PACKET...' : 'DISPATCH TRANSMISSION'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
