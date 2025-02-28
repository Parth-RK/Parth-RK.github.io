import React, { useEffect, useRef } from 'react';
import '../styles/ParticlesBg.css';

const ParticlesBg = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let hue = 0;

    // Set canvas to full document height instead of just viewport
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      // Use the full document height instead of just the viewport height
      canvas.height = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight
      );
    };

    updateCanvasSize();
    
    // Update on resize and content changes
    window.addEventListener('resize', updateCanvasSize);
    
    // Also check size when scrolling in case content expands
    window.addEventListener('scroll', () => {
      const currentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight
      );
      
      if (canvas.height !== currentHeight) {
        updateCanvasSize();
      }
    });

    const mouse = {
      x: undefined,
      y: undefined,
    }

    canvas.addEventListener('mousemove', (event) => {
      // Adjust mouse position to account for scrolling
      mouse.x = event.clientX;
      mouse.y = event.clientY + window.scrollY; // Add scroll position
      
      // Create fewer particles on mouse move for a lighter effect
      for (let i = 0; i < 1; i++) {
        particlesArray.push(new Particle(true));
      }
    });

    class Particle {
      constructor(fromMouse = false) {
        if (fromMouse) {
          this.x = mouse.x;
          this.y = mouse.y;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        
        // Smaller particles
        this.size = Math.random() * 3 + 0.5;
        
        // Slower movement
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // More subtle colors - lighter and less saturated
        const baseHue = (hue + Math.random() * 50) % 360;
        // Use a lighter and less saturated color palette
        this.color = `hsla(${baseHue}, 70%, 70%, 0.6)`;
        
        // Add a lifespan to particles
        this.life = 100 + Math.random() * 100;
        this.opacity = 0.6;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Gradually reduce size
        if (this.size > 0.1) this.size -= 0.05;
        
        // Decrease lifespan
        this.life--;
        
        // Fade out as life decreases
        if (this.life < 50) {
          this.opacity = this.life / 50 * 0.6; // Max opacity is 0.6
        }
      }
      
      draw() {
        // Use opacity for a lighter effect
        ctx.fillStyle = this.color.replace('0.6', this.opacity.toString());
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles with lighter, thinner connections
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Shorter connection distance for better performance
          if (distance < 70) {
            // Calculate opacity based on distance for more subtle connections
            const opacity = 1 - (distance / 70);
            
            ctx.beginPath();
            // Adjust color to be lighter and more subtle
            ctx.strokeStyle = particlesArray[i].color.replace('0.6', (opacity * 0.2).toString());
            ctx.lineWidth = particlesArray[i].size / 15; // Thinner lines
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
        
        // Remove particles that are too small or have expired
        if (particlesArray[i].size <= 0.1 || particlesArray[i].life <= 0) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    }

    function createParticles() {
      // Maintain fewer particles for a lighter effect
      if (particlesArray.length < 50) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      // Use a semi-transparent clear to create trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      handleParticles();
      createParticles();
      hue += 0.3; // Slower color change
      requestAnimationFrame(animate);
    }
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', () => {});
      canvas.removeEventListener('mousemove', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default ParticlesBg;