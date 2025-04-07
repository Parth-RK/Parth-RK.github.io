import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/ParticlesBg.css';

const ParticlesBg = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesArray = useRef([]);
  const mouse = useRef({ x: undefined, y: undefined });

  const particleConfig = {
    count: 400, // Number of particles
    connectionDistance: 200,
    particleSpeed: 0.3,
    particleSize: 1.5,
    glowColor: 'rgba(0, 246, 255, 0.7)',
    lineColor: 'rgba(0, 162, 255, 0.15)',
    mouseInteractionRadius: 50,
    mouseRepelForce: 0.5,
  };

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * particleConfig.particleSize + 0.5;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 1;
      this.speedX = (Math.random() - 0.5) * particleConfig.particleSpeed;
      this.speedY = (Math.random() - 0.5) * particleConfig.particleSpeed;
      this.color = particleConfig.glowColor;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(canvas, mousePos) {
       // Mouse interaction - repel
      if (mousePos.x !== undefined && mousePos.y !== undefined) {
        let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = particleConfig.mouseInteractionRadius;
        // Calculate force based on distance (stronger closer)
        let force = (maxDistance - distance) / maxDistance;
        // Ensure force is non-negative
         if (force < 0) force = 0;
        let directionX = (forceDirectionX * force * this.density * particleConfig.mouseRepelForce);
        let directionY = (forceDirectionY * force * this.density * particleConfig.mouseRepelForce);

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      // Wall collision
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.speedY = -this.speedY;
        // Prevent sticking to top/bottom
         if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
         if (this.y - this.size < 0) this.y = this.size;
      }

      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top + window.scrollY;
    }
  }, []);

  const initParticles = useCallback((canvas) => {
    particlesArray.current = [];
    for (let i = 0; i < particleConfig.count; i++) {
      particlesArray.current.push(new Particle(canvas));
    }
  }, [particleConfig.count]);

  const connectParticles = useCallback((ctx, particles) => {
    ctx.strokeStyle = particleConfig.lineColor;
    ctx.lineWidth = 0.5;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particleConfig.connectionDistance) {
          const opacity = 1 - distance / particleConfig.connectionDistance;
          ctx.globalAlpha = opacity * 0.5; // Make lines very subtle
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
          ctx.closePath();
          ctx.globalAlpha = 1.0; // Reset global alpha
        }
      }
    }
  }, [particleConfig.connectionDistance, particleConfig.lineColor]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight; // Full document height
      initParticles(canvas); // Re-initialize particles on resize
    }
  }, [initParticles]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Check if canvas size needs update due to scroll height change
    const currentHeight = document.documentElement.scrollHeight;
    if (canvas.height !== currentHeight) {
       canvas.height = currentHeight;
       // Optionally re-initialize if needed, or just let particles adapt
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentParticles = particlesArray.current;
    currentParticles.forEach(particle => {
      particle.update(canvas, mouse.current);
      particle.draw(ctx);
    });

    connectParticles(ctx, currentParticles);

    animationFrameId.current = requestAnimationFrame(animate);
  }, [connectParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas(); // Initial size set

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);

    animate();

    let resizeTimeout;
    const debouncedHeightCheck = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const currentScrollHeight = document.documentElement.scrollHeight;
            if (canvas && canvas.height !== currentScrollHeight) {
                resizeCanvas();
            }
        }, 250);
    }
    window.addEventListener('scroll', debouncedHeightCheck);


    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', debouncedHeightCheck);
      clearTimeout(resizeTimeout);
    };
  }, [resizeCanvas, handleMouseMove, animate]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default ParticlesBg;