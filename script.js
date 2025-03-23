document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cursor = document.querySelector('.custom-cursor');
  const progressBar = document.querySelector('.scroll-progress');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.querySelector('.close-modal');
  const contactForm = document.getElementById('contact-form');
  const skillCards = document.querySelectorAll('.skill-card');
  const interactiveElements = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .gallery-item'
  );
  const fadeElements = document.querySelectorAll('.fade-in');
  const animateTextElements = document.querySelectorAll('.animate-text');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Cursor state
  let cursorVisible = true;
  let cursorEnlarged = false;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Animation options
  const fadeOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  // Skill cards glow effect
  skillCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Cursor movement
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    // Add subtle rotation based on movement
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    cursor.style.transform += ` rotate(${angle}deg)`;
    
    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', onMouseMove);
  animateCursor();

  // Enhanced hover effects
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      element.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      element.style.transform = 'scale(1)';
    });
  });

  // Improved scroll animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add stagger effect to child elements if they exist
        const children = entry.target.children;
        if (children.length > 0) {
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
        
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeOptions);

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Enhanced text animations
  animateTextElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * 30}ms`;
      element.appendChild(span);
    });
  });

  // Gallery image hover effect
  galleryItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const img = item.querySelector('img');
      const overlay = item.querySelector('.gallery-overlay');
      
      img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
      overlay.style.background = `linear-gradient(
        ${y * 180}deg,
        transparent,
        rgba(0,0,0,${0.6 + y * 0.2})
      )`;
    });
    
    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.gallery-overlay');
      
      img.style.transform = '';
      overlay.style.background = '';
    });
  });

  // Scroll Progress
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;

    // Add shadow to navbar when scrolled
    if (scrollTop > 0) {
      navbar.style.boxShadow = 'var(--shadow)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', updateScrollProgress);

  // Smooth Scrolling for Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Active Section Highlight
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Project Modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.getAttribute('data-title');
      modalDesc.textContent = card.getAttribute('data-desc');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModalHandler = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  closeModal.addEventListener('click', closeModalHandler);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModalHandler();
    }
  });

  // Form Handling
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    try {
      // Replace this with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  // Notification System
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Add animation classes when elements come into view
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Elements to animate
  const animatedElements = document.querySelectorAll(
    '.hero-container, .about-content, .skill-card, .project-card, .contact-container'
  );

  animatedElements.forEach(el => animateOnScroll.observe(el));

  // Initialize on load
  updateScrollProgress();

  // Active section highlighting
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Gallery image loading animation
  const galleryImages = document.querySelectorAll('.gallery-item img');

  galleryImages.forEach(img => {
    img.addEventListener('load', () => {
      img.parentElement.classList.add('loaded');
    });
  });

  // Prevent scroll when modal is open
  function toggleBodyScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : '';
  }

  // Initialize on page load
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuToggle.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenuToggle.classList.contains('active') &&
      !e.target.closest('.nav-container') &&
      !e.target.closest('.mobile-menu-toggle')
    ) {
      mobileMenuToggle.classList.remove('active');
      navContainer.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // ==========================================================================
  // Particle System Configuration
  // ==========================================================================
  const particleConfig = {
    particleCount: 150,          // Increased from 100
    particleColor: '#e63946',
    lineColor: 'rgba(230, 57, 70, 0.15)',
    particleRadius: 2.5,         // Increased from 2
    lineWidth: 1,
    maxDistance: 150,           // Increased from 100
    speed: 1.2,                 // Increased from 1
    directionChangeFrequency: 50 // Decreased from 100 for smoother movement
  };

  // ==========================================================================
  // Particle Class Definition
  // ==========================================================================
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * particleConfig.speed;
      this.vy = (Math.random() - 0.5) * particleConfig.speed;
      this.radius = particleConfig.particleRadius * (Math.random() * 0.5 + 0.5); // Random size variation
      this.initialRadius = this.radius;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleConfig.particleColor;
      ctx.fill();
      
      // Add a subtle glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230, 57, 70, 0.1)';
      ctx.fill();
    }

    update() {
      // Change direction randomly with smoother transitions
      if (Math.random() * 100 < particleConfig.directionChangeFrequency) {
        this.vx += (Math.random() - 0.5) * 0.2;
        this.vy += (Math.random() - 0.5) * 0.2;
        
        // Limit maximum speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > particleConfig.speed) {
          this.vx = (this.vx / speed) * particleConfig.speed;
          this.vy = (this.vy / speed) * particleConfig.speed;
        }
      }

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls with damping
      if (this.x < 0 || this.x > this.canvas.width) {
        this.vx *= -0.9;
        this.x = Math.max(0, Math.min(this.x, this.canvas.width));
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.vy *= -0.9;
        this.y = Math.max(0, Math.min(this.y, this.canvas.height));
      }
    }
  }

  // ==========================================================================
  // Particle System Implementation
  // ==========================================================================
  class ParticleSystem {
    constructor() {
      this.canvas = document.getElementById('particle-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: 0, y: 0, radius: 150 }; // Increased interaction radius
      this.isActive = false;

      this.init();
      this.bindEvents();
    }

    init() {
      this.resize();
      this.createParticles();
      this.animate();
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());
      
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.addEventListener('mouseenter', () => this.isActive = true);
      this.canvas.addEventListener('mouseleave', () => this.isActive = false);
    }

    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
      for (let i = 0; i < particleConfig.particleCount; i++) {
        this.particles.push(new Particle(this.canvas));
      }
    }

    drawLines() {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particleConfig.maxDistance) {
            const opacity = (1 - distance / particleConfig.maxDistance) * 0.5;
            const gradient = this.ctx.createLinearGradient(
              this.particles[i].x,
              this.particles[i].y,
              this.particles[j].x,
              this.particles[j].y
            );
            
            gradient.addColorStop(0, `rgba(230, 57, 70, ${opacity})`);
            gradient.addColorStop(1, `rgba(230, 57, 70, ${opacity * 0.5})`);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = particleConfig.lineWidth;
            this.ctx.stroke();
          }
        }
      }
    }

    animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx);

        // Enhanced mouse interaction
        if (this.isActive) {
          const dx = particle.x - this.mouse.x;
          const dy = particle.y - this.mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * 3;
            particle.y += Math.sin(angle) * force * 3;
            
            // Scale particle size based on mouse proximity
            particle.radius = particle.initialRadius * (1 + force);
          } else {
            particle.radius = particle.initialRadius;
          }
        }
      });

      this.drawLines();
      requestAnimationFrame(this.animate);
    }
  }

  // ==========================================================================
  // Custom Cursor Implementation
  // ==========================================================================
  class CustomCursor {
    constructor() {
      this.cursor = document.querySelector('.custom-cursor');
      this.cursorX = 0;
      this.cursorY = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.isHovering = false;
      this.init();
    }

    init() {
      document.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
      });

      // Add hover effect to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .gallery-item');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => this.handleHover(true));
        el.addEventListener('mouseleave', () => this.handleHover(false));
      });

      // Smooth cursor animation
      const animate = () => {
        this.cursorX += (this.targetX - this.cursorX) * 0.2;
        this.cursorY += (this.targetY - this.cursorY) * 0.2;
        
        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        requestAnimationFrame(animate);
      };

      animate();
    }

    handleHover(isHovering) {
      this.isHovering = isHovering;
      this.cursor.classList.toggle('hover', isHovering);
    }
  }

  // ==========================================================================
  // Scroll Animations
  // ==========================================================================
  class ScrollAnimations {
    constructor() {
      this.sections = document.querySelectorAll('.fade-in');
      this.init();
    }

    init() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      this.sections.forEach(section => observer.observe(section));
    }
  }

  // ==========================================================================
  // Initialize Everything When DOM is Loaded
  // ==========================================================================
  // Initialize particle system
  const particleSystem = new ParticleSystem();
  
  // Initialize custom cursor (if not already initialized)
  if (!window.cursor) {
    window.cursor = new CustomCursor();
  }
  
  // Initialize scroll animations
  const scrollAnimations = new ScrollAnimations();

  // Add smooth scrolling to navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
