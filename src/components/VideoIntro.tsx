'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { Play, Pause, Volume2, VolumeX, MapPin } from 'lucide-react';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), {
  ssr: false,
});

const GlitterTrail = dynamic(() => import('./GlitterTrail'), {
  ssr: false,
});

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Animation refs
  const taglineRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const soundHintRef = useRef<HTMLDivElement>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // Auto-hide sound hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out the hint before hiding
      if (soundHintRef.current) {
        gsap.to(soundHintRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.8,
          onComplete: () => setShowSoundHint(false),
        });
      } else {
        setShowSoundHint(false);
      }
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Initial state setup
    gsap.set([taglineRef.current, firstNameRef.current, lastNameRef.current, subtitleRef.current, locationRef.current, scrollRef.current], {
      opacity: 0,
    });
    gsap.set(taglineRef.current, { y: -20 });
    gsap.set([firstNameRef.current, lastNameRef.current], { y: 100 });
    gsap.set(subtitleRef.current, { y: 30 });
    gsap.set(locationRef.current, { y: 20 });
    gsap.set(controlsRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(scrollRef.current, { y: 30 });
    if (soundHintRef.current) {
      gsap.set(soundHintRef.current, { opacity: 0, scale: 0.9, y: 10 });
    }

    // Fade out load mask
    tl.to(fadeOverlayRef.current, {
      opacity: 0,
      duration: 1.6,
      delay: 0.4,
      onComplete: () => {
        if (fadeOverlayRef.current) {
          fadeOverlayRef.current.style.display = 'none';
        }
      },
    });

    // Animate content items
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 1.0 }, '-=1.0');
    tl.to(firstNameRef.current, { opacity: 1, y: 0, duration: 1.4 }, '-=0.7');
    tl.to(lastNameRef.current, { opacity: 1, y: 0, duration: 1.4 }, '-=1.1');
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.2 }, '-=0.9');
    tl.to(locationRef.current, { opacity: 1, y: 0, duration: 1.0 }, '-=0.9');

    // Animate UI controls
    tl.to(controlsRef.current, { opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.5)' }, '-=0.8');
    
    if (soundHintRef.current) {
      tl.to(soundHintRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.5)' }, '-=0.7');
    }

    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: 1.0 }, '-=0.7');
  }, []);

  // Sync Play/Pause State
  const togglePlay = () => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video || !bgVideo) return;

    if (isPlaying) {
      video.pause();
      bgVideo.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(err => console.log('Video play failed:', err));
      bgVideo.play().catch(err => console.log('BgVideo play failed:', err));
      setIsPlaying(true);
    }
  };

  // Sync Mute State
  const toggleMute = () => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video || !bgVideo) return;

    if (isMuted) {
      video.muted = false;
      bgVideo.muted = true; // Background ambient blurred video stays muted
      setIsMuted(false);
      // Immediately hide sound hint on manual unmute
      if (showSoundHint) {
        gsap.to(soundHintRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          onComplete: () => setShowSoundHint(false),
        });
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleScrollClick = () => {
    const nextSection = document.getElementById('showcase');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      {/* Initial load mask */}
      <div ref={fadeOverlayRef} className={styles.fadeOverlay} />

      {/* Video Hero Elements */}
      <div className={styles.videoWrapper}>
        {/* Background ambient blurred duplication */}
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/assets/intro-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Main foreground video */}
        <video
          ref={videoRef}
          className={styles.fgVideo}
          src="/assets/intro-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
      </div>

      {/* Cinematic Dark Gradient Overlays */}
      <div className={styles.overlayGradients}>
        <div className={styles.overlayTop} />
        <div className={styles.overlayVignette} />
        <div className={styles.overlayBottom} />
      </div>

      {/* Three.js floating bokeh particle overlay */}
      <CinematicLayer />

      {/* Glitter trail mouse overlay */}
      <GlitterTrail />

      {/* Landing Content Overlay */}
      <div className={styles.content}>
        <div ref={taglineRef} className={styles.tagline}>
          Creative Developer & Designer
        </div>
        
        <h1 className={styles.titleContainer}>
          <span ref={firstNameRef} className={`${styles.titleLine} ${styles.firstName}`}>
            Jiya
          </span>
          <span ref={lastNameRef} className={`${styles.titleLine} ${styles.lastName}`}>
            Sarkar
          </span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          B.Tech CSE student and Full Stack Developer specializing in MERN Stack and Java SpringBoot development. Passionate about building scalable web applications and integrating AI-powered features and intelligent automation into modern web solutions to create impactful user experiences.
        </p>

        <div ref={locationRef} className={styles.location}>
          <span className={styles.pulseDot} />
          <MapPin size={14} style={{ color: 'var(--accent-orange)' }} />
          Kolkata, India
        </div>
      </div>

      {/* Interactive controls */}
      {showSoundHint && (
        <div
          ref={soundHintRef}
          className={styles.soundHint}
          onClick={toggleMute}
        >
          <span className={styles.hintPulse} />
          Tap for sound
        </div>
      )}

      <div ref={controlsRef} className={styles.controls}>
        <button
          className={styles.glassBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          className={styles.glassBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={handleScrollClick}
      >
        <span>Explore Work</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
