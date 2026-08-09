import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Gamepad2, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';

const iconMap = {
  Cpu: Cpu,
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  ShieldCheck: ShieldCheck
};

const SkillMatrix = () => {
  const { skills } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...skills.map(s => s.category)];

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section className="container section-spacing" id="skills">
      <div className="flex flex-col flex-md-row justify-between items-start items-md-center gap-4" style={{ marginBottom: '3rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <span className="telemetry-dot" style={{ backgroundColor: 'var(--accent-violet)' }} />
            <span style={{ color: 'var(--accent-violet)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              System Capability Index
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            ENGINEERING <span className="text-gradient">CAPABILITIES</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', marginTop: '0.5rem' }}>
            Specialized in low-level networking, resilient mobile P2P topologies, server orchestration, and deterministic game mechanics.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick(800 + idx * 50, 0.04);
                setActiveCategory(cat);
              }}
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
            >
              {cat === 'ALL' ? 'ALL DOMAINS' : cat.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Category Cards */}
      <div className="grid grid-cols-1 grid-md-2 gap-8">
        {filteredSkills.map((category, idx) => {
          const IconComp = iconMap[category.icon] || Layers;

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderColor: `${category.accent}35`,
                boxShadow: `0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px ${category.accent}12`
              }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${category.accent}15`,
                    border: `1px solid ${category.accent}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.accent
                  }}
                >
                  <IconComp size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>
                    {category.category}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: category.accent, fontFamily: 'var(--font-mono)' }}>
                    PROFICIENCY VERIFIED // 2026
                  </span>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="flex flex-col gap-4">
                {category.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{item.name}</span>
                      <span style={{ color: category.accent, fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        {item.level}%
                      </span>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${category.accent}80, ${category.accent})`,
                          borderRadius: '3px',
                          boxShadow: `0 0 10px ${category.accent}`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillMatrix;
