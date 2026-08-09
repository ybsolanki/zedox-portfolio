import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ zeroGravity = false }) => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isMoving: false });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Cosmic Grid Plane
    const grid = new THREE.GridHelper(160, 40, 0x00f0ff, 0x1f293d);
    grid.position.y = -14;
    grid.material.opacity = 0.18;
    grid.material.transparent = true;
    scene.add(grid);

    // Glowing Celestial Wireframe Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const innerGeo = new THREE.IcosahedronGeometry(7, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    const outerGeo = new THREE.DodecahedronGeometry(11, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const outerCore = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCore);

    // Orbital Quantum Rings
    const ringGeo = new THREE.RingGeometry(16, 16.3, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Particle Swarm (Antigravity Quantum Field)
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00f0ff);
    const violet = new THREE.Color(0x8b5cf6);
    const emerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 10 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const px = radius * Math.cos(phi) * Math.cos(theta);
      const py = radius * Math.sin(phi) + (Math.random() - 0.5) * 20;
      const pz = radius * Math.cos(phi) * Math.sin(theta);

      positions[idx] = px;
      positions[idx + 1] = py;
      positions[idx + 2] = pz;

      originalPositions[idx] = px;
      originalPositions[idx + 1] = py;
      originalPositions[idx + 2] = pz;

      velocities[idx] = (Math.random() - 0.5) * 0.04;
      velocities[idx + 1] = (Math.random() - 0.5) * 0.04;
      velocities[idx + 2] = (Math.random() - 0.5) * 0.04;

      // Color variation
      const rand = Math.random();
      let col = cyan;
      if (rand > 0.6) col = violet;
      else if (rand > 0.4) col = emerald;

      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, particlesMaterial);
    scene.add(particleSystem);

    camera.position.z = 45;
    camera.position.y = 2;

    // Mouse Gravity Interaction
    let mouseTimeout;
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.isMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate Wireframe Core
      coreGroup.rotation.y = elapsedTime * 0.15;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Interactive Camera Sway
      camera.position.x = mouseRef.current.x * 6;
      camera.position.y = 2 + mouseRef.current.y * 4;
      camera.lookAt(0, 0, 0);

      // Particle physics update
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;
      const speedMult = zeroGravity ? 2.5 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Zero-G drift or standard orbital drift
        posArray[idx] += velocities[idx] * speedMult;
        posArray[idx + 1] += velocities[idx + 1] * speedMult;
        posArray[idx + 2] += velocities[idx + 2] * speedMult;

        // Mouse gravity well pull
        if (mouseRef.current.isMoving) {
          const mx = mouseRef.current.x * 30;
          const my = mouseRef.current.y * 20;
          const dx = mx - posArray[idx];
          const dy = my - posArray[idx + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20 && dist > 1) {
            posArray[idx] += (dx / dist) * 0.12;
            posArray[idx + 1] += (dy / dist) * 0.12;
          }
        }

        // Boundary constraints & soft reset
        const distFromCenter = Math.sqrt(
          posArray[idx] * posArray[idx] +
          posArray[idx + 1] * posArray[idx + 1] +
          posArray[idx + 2] * posArray[idx + 2]
        );

        if (distFromCenter > 75) {
          posArray[idx] = originalPositions[idx] * 0.4;
          posArray[idx + 1] = originalPositions[idx + 1] * 0.4;
          posArray[idx + 2] = originalPositions[idx + 2] * 0.4;
        }
      }

      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [zeroGravity]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeBackground;
