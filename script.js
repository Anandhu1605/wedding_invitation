/**
 * ============================================================================
 * ROYAL KERALA HINDU WEDDING INVITATION — JAVASCRIPT
 * Features:
 *   1. Centralized Event Configuration
 *   2. Dynamic Multi-Stage Countdown Timer (Asia/Kolkata IST)
 *   3. Luxury Opening Transition & Scroll Reveal
 *   4. Ambient Particle Canvas (Golden Sparkles & Jasmine Petals)
 *   5. Background Music Player with Graceful Offline/Missing File Fallback
 *   6. Add to Calendar (Google Calendar & iCal / .ics)
 *   7. WhatsApp Invitation Sharing
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CENTRALIZED WEDDING CONFIGURATION OBJECT
     ========================================================================== */
  const WEDDING_CONFIG = {
    hosts: {
      father: 'Ajayakumar K. K.',
      mother: 'Sapna Ajayakumar',
      displayTitle: 'AJAYAKUMAR K. K. & SAPNA AJAYAKUMAR',
      location: 'Kannur & Thrissur, Kerala'
    },
    events: [
      {
        id: 'akshayWedding',
        title: "Akshay & Dhwani's Wedding",
        subtitle: 'Sacred Thirukkalyanam',
        couple: 'Akshay Achuth & Dhwani Choksi',
        venue: 'Guruvayur Sree Krishna Temple',
        address: 'East Nada, Guruvayur, Thrissur District, Kerala 680101',
        // Target: 28 Dec 2026 at 09:00 AM IST (Asia/Kolkata: UTC+05:30)
        targetIso: '2026-12-28T09:00:00+05:30',
        displayDate: '28 December 2026',
        displayTime: 'Auspicious Morning Muhurtham',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Guruvayur+Sree+Krishna+Temple+Guruvayur+Kerala',
        description: 'Wedding ceremony of Akshay Achuth (Son of Ajayakumar K. K. & Sapna Ajayakumar) and Dhwani Choksi (Daughter of Nandhan Choksi & Aanal Choksi).'
      },
      {
        id: 'anandhuWedding',
        title: "Anandhu & Neeraja's Wedding",
        subtitle: 'Sacred Thirukkalyanam',
        couple: 'Anandhu Ajayakumar & Neeraja Nambiar',
        venue: 'Hajmus Convention Centre',
        address: 'Hajmus Convention Centre, Kerala',
        // Target: 30 Dec 2026 at 11:30 AM IST (Asia/Kolkata: UTC+05:30)
        targetIso: '2026-12-30T11:30:00+05:30',
        displayDate: '30 December 2026',
        displayTime: '11:30 AM',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hajmus+Convention+Centre',
        description: 'Wedding ceremony of Anandhu Ajayakumar (Son of Ajayakumar K. K. & Sapna Ajayakumar) and Neeraja Nambiar (Daughter of Ramachandran V. V. & Beena).'
      },
      {
        id: 'reception',
        title: 'The Grand Wedding Reception',
        subtitle: 'Celebration of Both Unions',
        couple: 'Akshay & Dhwani • Anandhu & Neeraja',
        venue: 'Luxotica, Dharmashala',
        address: 'Luxotica International Convention Centre, Dharmashala, Kannur, Kerala',
        // Target: 31 Dec 2026 at 16:00 (4:00 PM) IST
        targetIso: '2026-12-31T16:00:00+05:30',
        displayDate: '31 December 2026',
        displayTime: '4:00 PM Onwards',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Luxotica+Dharmashala+Kannur+Kerala',
        description: 'Grand Wedding Reception celebrating both newlywed couples: Akshay Achuth & Dhwani Choksi, and Anandhu Ajayakumar & Neeraja Nambiar.'
      }
    ],
    audio: {
      src: 'wedding-music.mp3',
      synthFallbackTitle: 'Traditional Serene Drone'
    }
  };

  /* ==========================================================================
     2. DYNAMIC MULTI-STAGE COUNTDOWN TIMER
     ========================================================================== */
  class WeddingCountdown {
    constructor(config) {
      this.events = config.events;
      this.daysEl = document.getElementById('daysVal');
      this.hoursEl = document.getElementById('hoursVal');
      this.minutesEl = document.getElementById('minutesVal');
      this.secondsEl = document.getElementById('secondsVal');
      this.stageLabelEl = document.getElementById('countdownStageLabel');
      this.eventTitleEl = document.getElementById('countdown-title');
      this.eventSubEl = document.getElementById('countdownEventSub');
      this.clockContainer = document.querySelector('.countdown-clock');
      this.completeMessageEl = document.getElementById('countdownCompleteMessage');
      
      this.timerInterval = null;
      this.init();
    }

    init() {
      this.updateCountdown();
      this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
    }

    findCurrentEvent() {
      const now = new Date().getTime();
      for (let i = 0; i < this.events.length; i++) {
        const eventTime = new Date(this.events[i].targetIso).getTime();
        if (eventTime > now) {
          return { event: this.events[i], index: i, isPastAll: false };
        }
      }
      return { event: null, index: -1, isPastAll: true };
    }

    formatLeadingZero(num) {
      return num < 10 ? '0' + num : String(num);
    }

    updateCountdown() {
      const { event, index, isPastAll } = this.findCurrentEvent();

      if (isPastAll) {
        if (this.clockContainer) this.clockContainer.style.display = 'none';
        if (this.stageLabelEl) this.stageLabelEl.textContent = 'CELEBRATIONS COMPLETED';
        if (this.eventTitleEl) this.eventTitleEl.textContent = 'With Heartfelt Blessings';
        if (this.eventSubEl) this.eventSubEl.style.display = 'none';
        if (this.completeMessageEl) this.completeMessageEl.style.display = 'block';
        if (this.timerInterval) clearInterval(this.timerInterval);
        return;
      }

      // Update event titles according to current target
      if (this.stageLabelEl) {
        if (index === 0) {
          this.stageLabelEl.textContent = 'COUNTDOWN TO THE FIRST WEDDING';
        } else if (index === 1) {
          this.stageLabelEl.textContent = 'COUNTDOWN TO THE SECOND WEDDING';
        } else {
          this.stageLabelEl.textContent = 'COUNTDOWN TO THE GRAND RECEPTION';
        }
      }

      if (this.eventTitleEl) this.eventTitleEl.textContent = event.title;
      if (this.eventSubEl) {
        this.eventSubEl.textContent = `${event.displayDate} • ${event.venue}`;
      }

      const now = new Date().getTime();
      const targetTime = new Date(event.targetIso).getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Will refresh to next event on next tick
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (this.daysEl) this.daysEl.textContent = this.formatLeadingZero(days);
      if (this.hoursEl) this.hoursEl.textContent = this.formatLeadingZero(hours);
      if (this.minutesEl) this.minutesEl.textContent = this.formatLeadingZero(minutes);
      if (this.secondsEl) this.secondsEl.textContent = this.formatLeadingZero(seconds);
    }
  }

  /* ==========================================================================
     3. AMBIENT PARTICLE CANVAS (GOLD DUST & JASMINE PETALS)
     ========================================================================== */
  class AmbientParticleCanvas {
    constructor() {
      this.canvas = document.getElementById('ambientCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = window.innerWidth < 768 ? 22 : 45;
      this.animationFrame = null;
      this.isRunning = false;

      // Respect prefers-reduced-motion
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.prefersReducedMotion) return;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });

      // Create initial particles
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle(true));
      }

      this.start();

      // Pause when page is not visible to preserve battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    createParticle(initial = false) {
      const isPetal = Math.random() > 0.65; // 35% jasmine petals, 65% gold sparkles
      return {
        x: Math.random() * this.width,
        y: initial ? Math.random() * this.height : -20,
        size: isPetal ? 4 + Math.random() * 5 : 1.2 + Math.random() * 2.5,
        speedY: isPetal ? 0.35 + Math.random() * 0.6 : 0.2 + Math.random() * 0.45,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.15 + Math.random() * 0.55,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        isPetal: isPetal,
        color: isPetal ? 'rgba(255, 252, 240,' : 'rgba(212, 175, 55,'
      };
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.6 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > this.height + 25 || p.x < -25 || p.x > this.width + 25) {
          this.particles[i] = this.createParticle(false);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.angle);

        if (p.isPetal) {
          // Draw subtle ivory/jasmine petal
          this.ctx.fillStyle = `${p.color} ${p.opacity})`;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          // Draw soft glowing gold dust mote
          this.ctx.fillStyle = `${p.color} ${p.opacity})`;
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      if (this.isRunning) {
        this.animationFrame = requestAnimationFrame(() => this.draw());
      }
    }

    start() {
      if (!this.isRunning && !this.prefersReducedMotion) {
        this.isRunning = true;
        this.draw();
      }
    }

    stop() {
      this.isRunning = false;
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
    }
  }

  /* ==========================================================================
     4. BACKGROUND MUSIC CONTROLLER
     ========================================================================== */
  class WeddingAudioController {
    constructor(config) {
      this.config = config.audio;
      this.audioEl = document.getElementById('weddingAudio');
      this.toggleBtn = document.getElementById('audioToggleBtn');
      this.isPlaying = false;
      this.useSynth = false;        // only used if the MP3 genuinely fails to load
      this.audioContext = null;
      this.synthNodes = null;

      this.init();
    }

    init() {
      if (!this.toggleBtn) return;

      // Music button: click always toggles play / pause
      this.toggleBtn.addEventListener('click', () => {
        this.togglePlayback();
      });

      if (this.audioEl) {
        // If the browser can't load the MP3 at all, fall back to synth
        this.audioEl.addEventListener('error', () => {
          console.warn('wedding-music.mp3 could not be loaded — using synth fallback.');
          this.useSynth = true;
        });

        // Keep the looping flag working even if the browser fires 'ended'
        this.audioEl.addEventListener('ended', () => {
          this.audioEl.currentTime = 0;
          this.audioEl.play().catch(() => {});
        });
      }
    }

    togglePlayback() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    play() {
      if (this.useSynth || !this.audioEl) {
        this.playHarmonicSynth();
        this.setPlayingState(true);
        return;
      }

      // Reset to beginning if the track had ended
      if (this.audioEl.ended) {
        this.audioEl.currentTime = 0;
      }

      const promise = this.audioEl.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            this.setPlayingState(true);
          })
          .catch(() => {
            // MP3 blocked or missing — fall back to ambient synth
            this.useSynth = true;
            this.playHarmonicSynth();
            this.setPlayingState(true);
          });
      }
    }

    pause() {
      if (this.audioEl && !this.useSynth) {
        this.audioEl.pause();
      }
      if (this.synthNodes) {
        this.stopHarmonicSynth();
      }
      this.setPlayingState(false);
    }

    setPlayingState(playing) {
      this.isPlaying = playing;
      if (!this.toggleBtn) return;
      if (playing) {
        this.toggleBtn.classList.add('is-playing');
        this.toggleBtn.setAttribute('title', 'Pause Background Music');
        this.toggleBtn.setAttribute('aria-label', 'Pause Background Music');
      } else {
        this.toggleBtn.classList.remove('is-playing');
        this.toggleBtn.setAttribute('title', 'Play Background Music');
        this.toggleBtn.setAttribute('aria-label', 'Play Background Music');
      }
    }

    /* Meditative Indian classical drone — only used if MP3 fails */
    playHarmonicSynth() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.audioContext) {
          this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }

        const fundamental = 138.59;  // C#3  (Sa)
        const fifth       = 207.65;  // G#3  (Pa)
        const octave      = 277.18;  // C#4  (Sa upper)

        const masterGain = this.audioContext.createGain();
        masterGain.gain.setValueAtTime(0.001, this.audioContext.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, this.audioContext.currentTime + 3);
        masterGain.connect(this.audioContext.destination);

        const osc1 = this.audioContext.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(fundamental, this.audioContext.currentTime);

        const osc2 = this.audioContext.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(fifth, this.audioContext.currentTime);

        const osc3 = this.audioContext.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(octave, this.audioContext.currentTime);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc3.connect(masterGain);
        osc1.start();
        osc2.start();
        osc3.start();

        this.synthNodes = { osc1, osc2, osc3, masterGain };
      } catch (e) {
        // Silently ignore — Web Audio not available
      }
    }

    stopHarmonicSynth() {
      if (this.synthNodes && this.audioContext) {
        try {
          this.synthNodes.masterGain.gain.exponentialRampToValueAtTime(
            0.0001, this.audioContext.currentTime + 1
          );
          setTimeout(() => {
            if (this.synthNodes) {
              this.synthNodes.osc1.stop();
              this.synthNodes.osc2.stop();
              this.synthNodes.osc3.stop();
              this.synthNodes = null;
            }
          }, 1000);
        } catch (e) {}
      }
    }
  }

  /* ==========================================================================
     5. OPENING INVITATION TRANSITION & SCROLL REVEAL
     ========================================================================== */
  function setupInvitationExperience(audioController) {
    const openBtn = document.getElementById('openInvitationBtn');
    const openingCover = document.getElementById('openingCover');
    const mainContent = document.getElementById('mainInvitationContent');
    const quickNav = document.getElementById('quickNav');

    function initSectionObserver() {
      const revealSections = document.querySelectorAll('.invitation-section');
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          root: null,
          rootMargin: '0px 0px -80px 0px',
          threshold: 0.12
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        revealSections.forEach(section => {
          sectionObserver.observe(section);
        });
      } else {
        revealSections.forEach(section => section.classList.add('is-revealed'));
      }
    }

    // STRICT GATE: Only clicking "OPEN INVITATION" reveals the rest of the pages
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        // 1. Unlock the body and reveal main invitation content
        document.body.classList.remove('invitation-locked');
        document.body.classList.add('invitation-unlocked');
        openBtn.setAttribute('aria-expanded', 'true');

        if (openingCover) {
          openingCover.classList.add('cover-opened');
        }

        // 2. Auto-start the music immediately (browser allows this inside a click handler)
        if (audioController) {
          audioController.play();
        }

        // 3. Initialize scroll animations for revealed cards
        initSectionObserver();

        // 4. Smoothly glide viewport to the Family section
        setTimeout(() => {
          const targetSection = document.getElementById('family') || mainContent;
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      });
    }

    // Show / Hide Floating Quick Nav only after opening and scrolling past cover
    window.addEventListener('scroll', () => {
      if (document.body.classList.contains('invitation-locked')) return;
      if (!quickNav || !openingCover) return;
      
      const coverRect = openingCover.getBoundingClientRect();
      if (coverRect.bottom < 150) {
        quickNav.classList.add('nav-visible');
      } else {
        quickNav.classList.remove('nav-visible');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     6. ADD TO CALENDAR FUNCTIONALITY (GOOGLE CALENDAR & ICAL / .ICS)
     ========================================================================== */
  function setupCalendarActions() {
    const calendarButtons = document.querySelectorAll('[data-calendar-event]');

    calendarButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const eventKey = this.getAttribute('data-calendar-event');
        const eventData = WEDDING_CONFIG.events.find(e => e.id === eventKey);
        if (!eventData) return;

        // Construct dates in UTC format YYYYMMDDTHHmmssZ
        const startDate = new Date(eventData.targetIso);
        // Default 4-hour duration for the ceremony
        const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

        function formatCalDate(date) {
          return date.toISOString().replace(/-|:|\.\d+/g, '');
        }

        const startUtc = formatCalDate(startDate);
        const endUtc = formatCalDate(endDate);

        // Offer Google Calendar Direct Web Link
        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${startUtc}/${endUtc}&details=${encodeURIComponent(eventData.description + '\n\nVenue: ' + eventData.venue)}&location=${encodeURIComponent(eventData.address)}`;

        // Open Google Calendar in new tab
        const win = window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          // If popup blocked, download .ics file directly
          generateIcsDownload(eventData, startUtc, endUtc);
        }
      });
    });

    function generateIcsDownload(eventData, startUtc, endUtc) {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Kerala Wedding Invitation//Akshay Dhwani Anandhu Neeraja//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@weddinginvitation.kerala`,
        `DTSTAMP:${formatCalDate(new Date())}`,
        `DTSTART:${startUtc}`,
        `DTEND:${endUtc}`,
        `SUMMARY:${eventData.title}`,
        `DESCRIPTION:${eventData.description}`,
        `LOCATION:${eventData.address}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${eventData.id}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function formatCalDate(date) {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    }
  }

  /* ==========================================================================
     7. WHATSAPP SHARE INVITATION
     ========================================================================== */
  function setupWhatsAppShare() {
    const shareBtn = document.getElementById('shareWhatsAppBtn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', () => {
      const pageUrl = window.location.href;
      const shareMessage = 
        `॥ शुभमस्तु ॥\n\n` +
        `With hearts filled with joy and gratitude, we cordially invite you and your family to the auspicious weddings of our sons:\n\n` +
        `🕊️ AKSHAY ACHUTH & DHWANI CHOKSI\n` +
        `📅 28 December 2026\n` +
        `📍 Guruvayur Sree Krishna Temple\n\n` +
        `🕊️ ANANDHU AJAYAKUMAR & NEERAJA NAMBIAR\n` +
        `📅 30 December 2026 • 11:30 AM\n` +
        `📍 Hajmus Convention Centre\n\n` +
        `✨ THE GRAND WEDDING RECEPTION\n` +
        `📅 31 December 2026 • 4:00 PM Onwards\n` +
        `📍 Luxotica, Dharmashala\n\n` +
        `Warm regards,\n` +
        `Ajayakumar K. K. & Sapna Ajayakumar\n\n` +
        `View our digital wedding invitation:\n${pageUrl}`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ==========================================================================
     8. INITIALIZATION RUNNER
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Audio Controller
    const audioCtrl = new WeddingAudioController(WEDDING_CONFIG);

    // 2. Initialize Ambient Particle Canvas
    new AmbientParticleCanvas();

    // 3. Initialize Dynamic Countdown Timer
    new WeddingCountdown(WEDDING_CONFIG);

    // 4. Setup Opening Invitation & Scroll Reveal
    setupInvitationExperience(audioCtrl);

    // 5. Setup Calendar Action Listeners
    setupCalendarActions();

    // 6. Setup WhatsApp Share
    setupWhatsAppShare();
  });

})();

