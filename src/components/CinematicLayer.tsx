'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a high-quality soft circular particle texture dynamically
    const createCircleTexture = () => {
      const size = 128;
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = size;
      offscreenCanvas.height = size;
      const ctx = offscreenCanvas.getContext('2d');
      if (!ctx) return null;

      // Draw radial gradient
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 235, 210, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 120, 27, 0.25)');
      gradient.addColorStop(0.8, 'rgba(255, 80, 0, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 80, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(offscreenCanvas);
    };

    const particleTexture = createCircleTexture();

    // Setup Particle Groups
    const particleGroups: {
      points: THREE.Points;
      speedX: number;
      speedY: number;
      speedZ: number;
      amplitude: number;
      phase: number;
    }[] = [];

    // Colors: Warm orange, Soft gold, Cream white
    const colors = [
      new THREE.Color('#ff761b'), // Accent Orange
      new THREE.Color('#ffb944'), // Golden glow
      new THREE.Color('#fff7ed'), // Creamy white
    ];

    const createParticleGroup = (
      count: number,
      size: number,
      spreadX: number,
      spreadY: number,
      spreadZ: number,
      yOffset: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const vertexColors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // Positions
        positions[i * 3] = (Math.random() - 0.5) * spreadX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY + yOffset;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ - 2; // Keep them slightly behind or in front

        // Randomize vertex colors from our curated palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        vertexColors[i * 3] = color.r;
        vertexColors[i * 3 + 1] = color.g;
        vertexColors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3));

      const material = new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.3, // Soft glowing opacity
        map: particleTexture || undefined,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return {
        points,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: Math.random() * 0.05 + 0.03, // Always drift upwards slowly
        speedZ: (Math.random() - 0.5) * 0.02,
        amplitude: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      };
    };

    // Create 3 layers of particles (small/dense, medium/floating, large/bokeh-dreamy)
    particleGroups.push(createParticleGroup(60, 0.15, 20, 20, 10, 0)); // Small, dense background
    particleGroups.push(createParticleGroup(40, 0.4, 18, 18, 8, -2));  // Medium floating midground
    particleGroups.push(createParticleGroup(15, 1.2, 12, 12, 6, -4));  // Large, dreamy foreground bokeh

    // Parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scrollY = { current: 0, target: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.target = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for smooth inertia feel
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Lerp scroll coordinates
      scrollY.current += (scrollY.target - scrollY.current) * 0.08;

      // Update camera position based on mouse parallax and scroll position
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.2 - scrollY.current * 0.003;
      camera.lookAt(0, -scrollY.current * 0.002, 0);

      // Animate each particle group
      particleGroups.forEach((group, groupIndex) => {
        const positions = group.points.geometry.attributes.position.array as Float32Array;
        const count = positions.length / 3;

        // Apply gentle group rotation
        group.points.rotation.y = elapsedTime * (0.015 * (groupIndex + 1));
        group.points.rotation.z = elapsedTime * (0.008 * (groupIndex + 1));

        // Let the particles float up and oscillate
        for (let i = 0; i < count; i++) {
          // Slow upward drift
          positions[i * 3 + 1] += group.speedY * 0.02; // drift Y

          // Oscillate X and Z based on sine wave
          const phaseOffset = i + group.phase;
          positions[i * 3] += Math.sin(elapsedTime * 0.5 + phaseOffset) * 0.002;

          // If a particle rises above the upper boundary, reset it to the bottom
          if (positions[i * 3 + 1] > 12) {
            positions[i * 3 + 1] = -12;
            positions[i * 3] = (Math.random() - 0.5) * 20; // Re-randomize X spread
          }
        }

        // Notify Three.js that vertices have updated
        group.points.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      particleGroups.forEach(group => {
        group.points.geometry.dispose();
        if (Array.isArray(group.points.material)) {
          group.points.material.forEach(mat => mat.dispose());
        } else {
          group.points.material.dispose();
        }
      });

      if (particleTexture) {
        particleTexture.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
