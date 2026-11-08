'use client';

import React, {useEffect, useRef} from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'rect' | 'circle' | 'leaf';
  tilt: number;
  tiltAngle: number;
  tiltAngleSpeed: number;
  opacity: number;
}

interface StudioCardConfettiProps {
  active: boolean;
  onComplete?: () => void;
  accentTheme?: 'amber' | 'sage' | 'charcoal';
}

// Warm sanctuary palette matching the app's refined design constitution
const SANCTUARY_PALETTES = {
  amber: ['#D97706', '#F59E0B', '#FBBF24', '#B45309', '#E5DEC9', '#FAF7F2'],
  sage: ['#4A5D4E', '#10B981', '#34D399', '#D97706', '#E5DEC9', '#FAF7F2'],
  charcoal: ['#D97706', '#F59E0B', '#FBBF24', '#A8A29E', '#E5DEC9', '#FAF7F2'],
};

export default function StudioCardConfetti({
  active,
  onComplete,
  accentTheme = 'amber',
}: StudioCardConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion for accessibility compliance
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reduced motion: trigger onComplete after brief interval without particle animation
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 800);
      return () => clearTimeout(timeout);
    }

    // Set canvas dimensions based on client bounding rect with DPR
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(120, Math.floor(rect.width));
    const height = Math.max(120, Math.floor(rect.height));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = SANCTUARY_PALETTES[accentTheme] || SANCTUARY_PALETTES.amber;
    const particlesCount = 42;
    const particles: Particle[] = [];

    // Spawn celebratory particles bursting upwards from bottom-center of card
    const originX = width / 2;
    const originY = height * 0.65;

    for (let i = 0; i < particlesCount; i++) {
      const angle = (Math.PI / 180) * (-90 + (Math.random() - 0.5) * 110);
      const speed = 4.5 + Math.random() * 6.5;
      const shapes: ('rect' | 'circle' | 'leaf')[] = ['rect', 'leaf', 'circle'];

      particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        tilt: Math.random() * 10,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltAngleSpeed: 0.05 + Math.random() * 0.08,
        opacity: 1,
      });
    }

    const duration = 2100;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      // Fade out smoothly in the second half of the animation
      const globalAlpha = progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) / 0.35) : 1;

      particles.forEach((p) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // Gentle gravity
        p.vx *= 0.985; // Air resistance
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltAngleSpeed;
        p.tilt = Math.sin(p.tiltAngle) * 8;

        const particleAlpha = globalAlpha * p.opacity;
        if (particleAlpha <= 0.01) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = particleAlpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'leaf') {
          // Botanical leaf flake
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.5 + p.tilt * 0.2, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Parchment ribbon flake
          ctx.fillRect(-p.size / 2, -p.size + p.tilt, p.size, p.size * 1.6);
        }

        ctx.restore();
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        onComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, accentTheme, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded-2xl overflow-hidden motion-reduce:hidden"
    />
  );
}
