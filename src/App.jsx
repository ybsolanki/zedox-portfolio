import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ShowreelPresentation from './components/ShowreelPresentation';
import ProjectShowcase from './components/ProjectShowcase';
import ZeroGravitySandbox from './components/ZeroGravitySandbox';
import SkillMatrix from './components/SkillMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import InteractiveTerminal from './components/InteractiveTerminal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isZeroG, setIsZeroG] = useState(false);
  const [isScanlines, setIsScanlines] = useState(false);

  const toggleZeroG = () => {
    setIsZeroG(prev => !prev);
  };

  const toggleScanlines = () => {
    setIsScanlines(prev => !prev);
  };

  return (
    <div className={`portfolio-root ${isScanlines ? 'scanlines-active' : ''}`} style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Dynamic 3D WebGL Particle Universe */}
      <ThreeBackground zeroGravity={isZeroG} />

      {/* Floating Glass Navigation Header */}
      <Navbar
        onOpenShowreel={() => setShowreelOpen(true)}
        onToggleZeroG={toggleZeroG}
        isZeroG={isZeroG}
        onToggleScanlines={toggleScanlines}
        isScanlines={isScanlines}
      />

      {/* Hero Section */}
      <HeroSection onOpenShowreel={() => setShowreelOpen(true)} />

      {/* Flagship Video/Keynote Showreel Deck Modal */}
      <ShowreelPresentation
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      {/* Dedicated About Yug Solanki & Personal Achievements Section */}
      <AboutSection onOpenShowreel={() => setShowreelOpen(true)} />

      {/* Projects Showcase with Live In-Card Simulators */}
      <ProjectShowcase onOpenShowreel={() => setShowreelOpen(true)} />

      {/* Interactive Zero-G Physics Sandbox */}
      <ZeroGravitySandbox />

      {/* Engineering Capability & Skill Matrix */}
      <SkillMatrix />

      {/* Mission Logs & Career Trajectory */}
      <ExperienceTimeline />

      {/* Embedded Antigravity CLI Terminal */}
      <InteractiveTerminal
        onOpenShowreel={() => setShowreelOpen(true)}
        onToggleZeroG={toggleZeroG}
        onToggleScanlines={toggleScanlines}
      />

      {/* Direct Transmission Center */}
      <ContactSection />

      {/* Telemetry Diagnostics Footer */}
      <Footer onOpenShowreel={() => setShowreelOpen(true)} />
    </div>
  );
}

export default App;
