import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, ShieldCheck, Cpu, Flame, CheckCircle2, Play, Github, MessageCircle, BookOpen, Smartphone, Gamepad2, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const iconMap = {
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  Cpu: Cpu,
  Code2: Code2
};

const AboutSection = ({ onOpenShowreel }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="container section-spacing" id="about">
      {/* Section Header */}
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '3rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-cyan)' }} />
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Student Profile & Background
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)' }}>
            ABOUT <span className="text-gradient">YUG SOLANKI</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '560px', marginTop: '0.4rem' }}>
            Information Technology student and developer building software across mobile, games, and web.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playPowerUp();
            onOpenShowreel();
          }}
          className="btn btn-primary btn-sm"
        >
          <Play size={14} />
          WATCH SHOWREEL
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 grid-md-3 gap-6" style={{ marginBottom: '3rem' }}>
        {/* Left Column: Student Profile Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel flex flex-col justify-between"
          style={{
            padding: '1.75rem',
            borderColor: 'rgba(0, 240, 255, 0.25)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(0, 240, 255, 0.08)',
            background: 'rgba(10, 16, 32, 0.85)'
          }}
        >
          <div>
            {/* Avatar Emblem */}
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: '900',
                color: '#030814',
                boxShadow: '0 0 20px var(--accent-cyan-glow)',
                marginBottom: '1.25rem'
              }}
            >
              YS
            </div>

            <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
              <span className="glass-pill" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
                IT STUDENT
              </span>
              <span className="glass-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                ACTIVE
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.2rem' }}>
              Yug Solanki
            </h3>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
              @{profile.githubUser} • Software Developer
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.85rem' }}>
              <div className="flex justify-between" style={{ fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>Education:</span>
                <span style={{ color: '#f1f5f9', fontWeight: 'bold' }}>{profile.education}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>Location:</span>
                <span style={{ color: '#f1f5f9', fontWeight: 'bold' }}>{profile.location}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>Status:</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Open for Freelance</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm flex-1"
              onClick={() => sound.playClick()}
            >
              <Github size={13} />
              GITHUB
            </a>
            <button
              onClick={() => {
                sound.playClick();
                window.open(profile.discordUrl, '_blank');
              }}
              className="btn btn-violet btn-sm flex-1"
            >
              <MessageCircle size={13} />
              DISCORD
            </button>
          </div>
        </motion.div>

        {/* Center & Right Column: Student Story & Focus */}
        <div className="grid-md-span-2 flex flex-col gap-5" style={{ gridColumn: 'span 2' }}>
          {/* Story Card */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              background: 'rgba(12, 18, 36, 0.75)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} style={{ color: 'var(--accent-cyan)' }} />
              About My Studies & Projects
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              {profile.bio}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              I believe in learning by doing. Alongside my Information Technology coursework, I actively develop real applications in Android with Kotlin, script game mechanics for Roblox in Luau, configure dedicated servers on Linux, and build modern web applications.
            </p>
          </div>

          {/* 3 Core Project Focuses */}
          <div className="grid grid-cols-1 grid-md-3 gap-3">
            <div className="sim-screen" style={{ borderColor: 'rgba(16, 185, 129, 0.25)', padding: '1rem' }}>
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                📱 ANDROID & MOBILE
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                Building Kotlin mobile apps like MeshTalk for offline communication.
              </p>
            </div>

            <div className="sim-screen" style={{ borderColor: 'rgba(245, 158, 11, 0.25)', padding: '1rem' }}>
              <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                🎮 ROBLOX & GAME TECH
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                Creating custom game mechanics, Luau scripts, and RNG probability systems.
              </p>
            </div>

            <div className="sim-screen" style={{ borderColor: 'rgba(139, 92, 246, 0.25)', padding: '1rem' }}>
              <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                🌐 SERVERS & WEB
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                Configuring Linux game servers, firewalls, and exploring interactive web apps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <Award size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
            Featured Project Domains
          </h3>
        </div>

        <div className="grid grid-cols-1 grid-md-2 grid-lg-4 gap-4">
          {profile.highlights.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Code2;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderColor: `${item.accent}30`,
                  background: 'rgba(10, 15, 30, 0.8)',
                  boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 15px ${item.accent}10`
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `${item.accent}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.accent,
                    marginBottom: '0.75rem'
                  }}
                >
                  <IconComp size={18} />
                </div>
                <div style={{ fontSize: '0.72rem', color: item.accent, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                  {item.category}
                </div>
                <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: '700' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.45 }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
