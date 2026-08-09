import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, ChevronRight, Sparkles, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const ExperienceTimeline = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section className="container section-spacing" id="experience">
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="inline-flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
          <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Mission Logs & Trajectory
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          CAREER & <span className="text-gradient">SYSTEMS MILESTONES</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0.5rem auto 0' }}>
          A chronological log of lead engineering roles, infrastructure management, and open-source protocol research.
        </p>
      </div>

      {/* Timeline Nodes */}
      <div className="flex flex-col gap-6" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderColor: `${exp.accent}30`,
              boxShadow: `0 15px 35px rgba(0,0,0,0.7), 0 0 20px ${exp.accent}10`
            }}
          >
            {/* Header */}
            <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-2" style={{ marginBottom: '1rem' }}>
              <div>
                <span
                  className="glass-pill"
                  style={{
                    color: exp.accent,
                    borderColor: `${exp.accent}40`,
                    background: `${exp.accent}15`,
                    marginBottom: '0.5rem',
                    display: 'inline-block'
                  }}
                >
                  {exp.badge}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                  {exp.role}
                </h3>
                <div style={{ color: exp.accent, fontWeight: '600', fontSize: '0.95rem', marginTop: '0.15rem' }}>
                  {exp.company}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.04)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {exp.period}
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {exp.description}
            </p>

            {/* Achievements List */}
            <div className="flex flex-col gap-2">
              {exp.achievements.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} style={{ color: exp.accent, marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
