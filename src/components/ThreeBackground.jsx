import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Grid System
        const grid = new THREE.GridHelper(200, 40, 0xb7e4c7, 0x3d1c5c);
        grid.position.y = -10;
        grid.material.opacity = 0.15;
        grid.material.transparent = true;
        scene.add(grid);

        // Core Glowing Node (Abstract Centerpiece)
        const coreGeo = new THREE.IcosahedronGeometry(8, 2);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x3d1c5c,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Particles System
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 1000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0xb7e4c7,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 40;
        camera.position.y = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;
            core.rotation.z += 0.002;
            core.rotation.y -= 0.001;
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
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeBackground;
